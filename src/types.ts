export interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

export interface RetentionDataPoint {
  timestamp: string;
  retention: number;
}

export interface VideoAnalysisResult {
  title: string;
  channelName: string;
  channelSubscribers: string;
  views: number;
  likes: number;
  comments: number;
  engagementRate: number;
  publishedDate: string;
  category: string;
  duration: string;
  descriptionSummary: string;
  sentiment: Sentiment;
  tags: string[];
  seoScore: number;
  seoRecommendations: string[];
  retentionData: RetentionDataPoint[];
  videoId: string;
  thumbnailUrl: string;
}
