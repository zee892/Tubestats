import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { VideoAnalysisResult } from "../types";
import { useState } from "react";

interface DashboardViewProps {
  data: VideoAnalysisResult | null;
  isLoading: boolean;
}

// Mock/Default data matching the mockup screenshot
const mockData: VideoAnalysisResult = {
  title: "A Masterclass on YouTube Algorithm and Optimization Secrets",
  channelName: "CreatorAcademy",
  channelSubscribers: "1.2M",
  views: 24591022,
  likes: 892104,
  comments: 42503,
  engagementRate: 7.82,
  publishedDate: "Oct 12, 2023",
  category: "Science & Tech",
  duration: "14:25",
  descriptionSummary: "In this comprehensive guide, we unpack the hidden signals of the YouTube algorithm, search engine optimization strategies, and retention-maximizing techniques.",
  sentiment: {
    positive: 82,
    neutral: 14,
    negative: 4,
  },
  tags: ["TechReviews", "YouTubeAlgorithm", "VideoSEO", "CreatorAcademy", "ChannelGrowth", "VidAnalytics"],
  seoScore: 88,
  seoRecommendations: [
    "Include high-CTR keywords in the first 100 characters of the description.",
    "Add timestamp chapters to encourage key-moment user engagement.",
    "Restructure tags to prioritize long-tail search queries instead of single words."
  ],
  retentionData: [
    { timestamp: "0%", retention: 100 },
    { timestamp: "10%", retention: 85 },
    { timestamp: "20%", retention: 78 },
    { timestamp: "30%", retention: 74 },
    { timestamp: "40%", retention: 72 },
    { timestamp: "50%", retention: 68 },
    { timestamp: "60%", retention: 69 },
    { timestamp: "70%", retention: 65 },
    { timestamp: "80%", retention: 58 },
    { timestamp: "90%", retention: 54 },
    { timestamp: "100%", retention: 48 },
  ],
  videoId: "dQw4w9WgXcQ",
  thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
};

export default function DashboardView({ data, isLoading }: DashboardViewProps) {
  const activeData = data || mockData;
  const isMock = !data;
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTag(text);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  return (
    <section id="dashboard-section" className="py-12 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="glass-card p-1 rounded-[32px] shadow-2xl overflow-hidden border border-outline-variant/50 bg-white">
          <div className="bg-surface/30 p-6 md:p-10 rounded-[31px]">
            
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3.5xl">
                    {isLoading ? "sync" : "analytics"}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-xl md:text-2xl text-on-surface leading-tight">
                      {isMock ? "Video Analysis Demo" : "Live Video Analysis"}
                    </h4>
                    {isMock ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        Demo Mockup
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 animate-pulse">
                        Live Data
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-sm text-on-surface-variant mt-1">
                    {isMock ? "Explore dashboard capabilities with our pre-loaded video" : "Real-time metrics compiled successfully"}
                  </p>
                </div>
              </div>

              {!isMock && (
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeData.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-red-50 border border-primary/20 rounded-xl px-4 py-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Watch on YouTube
                  </a>
                </div>
              )}
            </div>

            {/* Video Meta Info (Only shown for non-mock or custom loaded data) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              {/* Thumbnail and Title info */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative group rounded-2xl overflow-hidden aspect-video shadow-md border border-outline-variant/20 bg-black">
                  <img
                    referrerPolicy="no-referrer"
                    src={activeData.thumbnailUrl}
                    alt={activeData.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      // Fallback if maxresdefault doesn't exist
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${activeData.videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <a
                      href={`https://www.youtube.com/watch?v=${activeData.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-3xl">play_arrow</span>
                    </a>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono font-medium px-2 py-1 rounded">
                    {activeData.duration}
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-outline-variant/30">
                  <h3 className="font-display font-bold text-lg text-on-surface line-clamp-2 leading-snug mb-2">
                    {activeData.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                        {activeData.channelName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-on-surface">{activeData.channelName}</span>
                        <span className="block text-xs text-on-surface-variant">{activeData.channelSubscribers} subscribers</span>
                      </div>
                    </div>
                    <span className="text-xs bg-surface-low text-primary px-3 py-1 rounded-full font-semibold border border-outline-variant/20">
                      {activeData.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description Summary & Comment Sentiment */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div className="p-5 bg-white rounded-2xl border border-outline-variant/30 flex-grow">
                  <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold block mb-2">
                    Video Brief / Description
                  </span>
                  <p className="font-sans text-sm md:text-base text-on-surface leading-relaxed italic">
                    "{activeData.descriptionSummary}"
                  </p>
                </div>

                {/* Sentiment Analysis Split Meter */}
                <div className="p-5 bg-white rounded-2xl border border-outline-variant/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                      Viewer Sentiment Analysis
                    </span>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                      {activeData.sentiment.positive}% Positive
                    </span>
                  </div>
                  <div className="h-4 w-full rounded-full overflow-hidden flex mb-3">
                    <div
                      style={{ width: `${activeData.sentiment.positive}%` }}
                      className="bg-green-500 h-full transition-all duration-1000"
                      title={`Positive: ${activeData.sentiment.positive}%`}
                    ></div>
                    <div
                      style={{ width: `${activeData.sentiment.neutral}%` }}
                      className="bg-gray-300 h-full transition-all duration-1000"
                      title={`Neutral: ${activeData.sentiment.neutral}%`}
                    ></div>
                    <div
                      style={{ width: `${activeData.sentiment.negative}%` }}
                      className="bg-red-500 h-full transition-all duration-1000"
                      title={`Negative: ${activeData.sentiment.negative}%`}
                    ></div>
                  </div>
                  <div className="flex items-center gap-6 text-xs text-on-surface-variant font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      <span>Positive ({activeData.sentiment.positive}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                      <span>Neutral ({activeData.sentiment.neutral}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span>Negative ({activeData.sentiment.negative}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Numerical Analytics Card Grid & Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Grid: Key Statistics */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-outline-variant/30 flex justify-between items-center hover:border-primary/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">visibility</span>
                    <span className="font-sans font-medium text-sm md:text-base">Views</span>
                  </div>
                  <span className="font-display font-bold text-primary text-lg md:text-xl">
                    {formatNumber(activeData.views)}
                  </span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-outline-variant/30 flex justify-between items-center hover:border-primary/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">favorite</span>
                    <span className="font-sans font-medium text-sm md:text-base">Likes</span>
                  </div>
                  <span className="font-display font-bold text-primary text-lg md:text-xl">
                    {formatNumber(activeData.likes)}
                  </span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-outline-variant/30 flex justify-between items-center hover:border-primary/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">chat</span>
                    <span className="font-sans font-medium text-sm md:text-base">Comments</span>
                  </div>
                  <span className="font-display font-bold text-primary text-lg md:text-xl">
                    {formatNumber(activeData.comments)}
                  </span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-outline-variant/30 flex justify-between items-center hover:border-primary/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600 text-2xl">trending_up</span>
                    <span className="font-sans font-medium text-sm md:text-base">Engagement Rate</span>
                  </div>
                  <span className="font-display font-bold text-green-600 text-lg md:text-xl">
                    {activeData.engagementRate}%
                  </span>
                </div>
              </div>

              {/* Right Chart Card: Audience Retention Analysis */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h5 className="font-display font-bold text-lg text-on-surface">
                        Audience Retention Analysis
                      </h5>
                      <p className="text-xs text-on-surface-variant font-sans mt-0.5">
                        Simulated retention performance curve (viewers active over runtime)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-2 w-8 bg-primary rounded-full"></div>
                      <div className="h-2 w-8 bg-primary/30 rounded-full"></div>
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={activeData.retentionData}
                        margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          dataKey="timestamp"
                          tick={{ fill: "#603e39", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "#603e39", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid #ebbbb4",
                            borderRadius: "12px",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                          }}
                          formatter={(value: any) => [`${value}%`, "Retention"]}
                          labelFormatter={(label) => `Timestamp: ${label}`}
                        />
                        <Bar
                          dataKey="retention"
                          radius={[6, 6, 0, 0]}
                          maxBarSize={45}
                        >
                          {activeData.retentionData.map((entry, index) => {
                            // Give a subtle high-energy color shift to high retention marks
                            return (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.retention > 75 ? "#bc0100" : "rgba(188, 1, 0, 0.7)"}
                              />
                            );
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4 text-center md:text-left">
                    <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/20">
                      <span className="font-label text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                        Top Tag
                      </span>
                      <span className="font-display font-bold text-primary text-sm md:text-base truncate block">
                        #{activeData.tags[0] || "SEO"}
                      </span>
                    </div>
                    <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/20">
                      <span className="font-label text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                        Upload Date
                      </span>
                      <span className="font-display font-bold text-primary text-sm md:text-base truncate block">
                        {activeData.publishedDate}
                      </span>
                    </div>
                    <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/20">
                      <span className="font-label text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                        Category
                      </span>
                      <span className="font-display font-bold text-primary text-sm md:text-base truncate block">
                        {activeData.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Extra Analytics: Tags extraction & SEO Actionable Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 pt-8 border-t border-outline-variant/20">
              
              {/* Tags extraction block */}
              <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">label</span>
                      <h5 className="font-display font-bold text-base md:text-lg text-on-surface">
                        Extracted Hidden Video Tags ({activeData.tags.length})
                      </h5>
                    </div>
                    <button
                      onClick={() => copyToClipboard(activeData.tags.join(", "))}
                      className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">content_copy</span>
                      Copy All
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeData.tags.map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => copyToClipboard(tag)}
                        className="bg-red-50 hover:bg-red-100 text-primary font-label text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/10 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Click to copy tag"
                      >
                        <span>#{tag}</span>
                        <span className="material-symbols-outlined text-[10px] opacity-40">content_copy</span>
                      </button>
                    ))}
                  </div>
                </div>

                {copiedTag && (
                  <p className="text-xs text-green-600 bg-green-50 border border-green-200 p-2.5 rounded-lg text-center font-semibold animate-fade-in">
                    Copied "{copiedTag}" to clipboard!
                  </p>
                )}
              </div>

              {/* SEO Score & Recommendations block */}
              <div className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-green-600">search</span>
                    <h5 className="font-display font-bold text-base md:text-lg text-on-surface">
                      Video SEO Optimization Audit
                    </h5>
                  </div>

                  <div className="flex items-center gap-4 mb-5 pb-4 border-b border-outline-variant/10">
                    <div className="relative w-16 h-16 shrink-0 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-50">
                      <span className="font-display font-bold text-green-700 text-base md:text-lg">
                        {activeData.seoScore}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">
                        SEO Score: {activeData.seoScore}/100
                      </div>
                      <p className="text-xs text-on-surface-variant font-sans">
                        {activeData.seoScore >= 80 
                          ? "Excellent metadata configuration. Minor optimizations recommended."
                          : "Moderate configuration. Actionable items can double the impressions score."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold block mb-2">
                      Actionable Optimization Recommendations:
                    </span>
                    {activeData.seoRecommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs md:text-sm font-sans text-on-surface-variant leading-snug">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center shrink-0 text-xs">
                          {idx + 1}
                        </span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
