import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client
let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add your Gemini API Key in AI Studio Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Extract Video ID from various YouTube URL formats
function extractVideoId(url: string): string {
  const trimmed = url.trim();
  // Standard Watch URL
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^"&?/ ]{11})/i);
  if (watchMatch) {
    return watchMatch[1];
  }
  // If it's already an 11-character video ID
  if (trimmed.length === 11 && !trimmed.includes("/") && !trimmed.includes(".")) {
    return trimmed;
  }
  return "dQw4w9WgXcQ"; // Default fallback (Rick Astley)
}

// JSON Schema for YouTube Video Analysis response
const youtubeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The exact title of the YouTube video." },
    channelName: { type: Type.STRING, description: "The name of the channel that uploaded the video." },
    channelSubscribers: { type: Type.STRING, description: "The subscriber count of the channel, e.g. 1.2M or 450K." },
    views: { type: Type.INTEGER, description: "The exact or latest view count of the video." },
    likes: { type: Type.INTEGER, description: "The exact or latest like count of the video." },
    comments: { type: Type.INTEGER, description: "The exact or latest comment count of the video." },
    engagementRate: { type: Type.NUMBER, description: "The engagement rate calculated as ((likes + comments) / views) * 100, formatted as a percentage e.g. 7.82." },
    publishedDate: { type: Type.STRING, description: "The published date, e.g. Oct 12, 2023." },
    category: { type: Type.STRING, description: "The category of the video, e.g. Science & Technology, Gaming, Education." },
    duration: { type: Type.STRING, description: "The duration of the video in MM:SS or HH:MM:SS format." },
    descriptionSummary: { type: Type.STRING, description: "A concise 1-2 sentence summary of the video's description." },
    sentiment: {
      type: Type.OBJECT,
      properties: {
        positive: { type: Type.INTEGER, description: "Estimated positive comment sentiment percentage (0-100)" },
        neutral: { type: Type.INTEGER, description: "Estimated neutral comment sentiment percentage (0-100)" },
        negative: { type: Type.INTEGER, description: "Estimated negative comment sentiment percentage (0-100)" },
      },
      required: ["positive", "neutral", "negative"]
    },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Extracted or inferred tags/keywords associated with the video."
    },
    seoScore: { type: Type.INTEGER, description: "SEO optimization score from 0 to 100 based on title, description, and tags." },
    seoRecommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 highly actionable SEO recommendations to improve this video's ranking (e.g. better title, better tags, description structure)."
    },
    retentionData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.STRING, description: "Video percentage marker, e.g., '0%', '10%', '20%' up to '100%'." },
          retention: { type: Type.INTEGER, description: "Retention percentage, typically starting near 100% and sloping down dynamically (simulate realistic bumps/drops)." }
        },
        required: ["timestamp", "retention"]
      },
      description: "Simulated retention data points for charting retention analysis over 10 points (0% to 100%)."
    }
  },
  required: [
    "title", "channelName", "channelSubscribers", "views", "likes", "comments",
    "engagementRate", "publishedDate", "category", "duration", "descriptionSummary",
    "sentiment", "tags", "seoScore", "seoRecommendations", "retentionData"
  ]
};

// API Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Video Analysis endpoint
app.post("/api/analyze", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "YouTube URL or Video ID is required." });
    }

    const videoId = extractVideoId(url);
    
    // Check if API key is defined
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ 
        error: "GEMINI_API_KEY is not defined. Please configure your API key in AI Studio Secrets." 
      });
    }

    const ai = getAI();

    // Use Gemini 3.5-flash with Search Grounding to analyze the YouTube Video
    const prompt = `Search for the YouTube video with ID "${videoId}" or URL "${url}". If found, use its real statistics (or very close estimates). 
If it is a general topic, a custom query, or a non-existent/test video, generate highly realistic and detailed statistics for a YouTube video on that topic.
Always structure the final response into the requested JSON schema. Include realistic retentionData that curves downward with a couple of peaks, totaling 11 data points from 0% to 100% (0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: youtubeSchema,
        systemInstruction: "You are an expert YouTube Analytics and Video SEO consultant. Your goal is to analyze the requested YouTube video or generate highly realistic, detailed, and professional statistics. Always return valid JSON conforming to the schema.",
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response received from the AI model.");
    }

    const data = JSON.parse(resultText);
    
    // Enrich with video ID and standard thumbnail URL
    data.videoId = videoId;
    data.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return res.json(data);
  } catch (error: any) {
    console.error("Error analyzing video:", error);
    return res.status(500).json({ 
      error: error.message || "An error occurred while analyzing the YouTube video." 
    });
  }
});

async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
