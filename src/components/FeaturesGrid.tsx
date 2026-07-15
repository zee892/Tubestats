export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
  iconBg: string;
  iconColor: string;
}

const features: FeatureItem[] = [
  {
    icon: "speed",
    title: "Instant Stats",
    desc: "Real-time retrieval of video performance data directly from API.",
    iconBg: "bg-red-50",
    iconColor: "text-primary",
  },
  {
    icon: "person",
    title: "Channel Info",
    desc: "Deep dive into the uploader's channel history and subscriber metrics.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: "trending_up",
    title: "Engagement Rate",
    desc: "Calculated engagement percentages based on views and interactions.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: "thumb_up",
    title: "Like-to-View Ratio",
    desc: "Understanding viewer sentiment with precise ratio calculations.",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: "comment",
    title: "Comment Analysis",
    desc: "Overview of comment velocity and sentiment trends on the video.",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: "calendar_today",
    title: "Publish Date",
    desc: "Exact timestamp and duration since the video went public.",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: "category",
    title: "Category",
    desc: "Official YouTube categorization for niche analysis and tracking.",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: "timer",
    title: "Duration",
    desc: "Precise video length to the second, helpful for format comparison.",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    icon: "image",
    title: "Thumbnail Preview",
    desc: "View and download high-resolution thumbnails for any video.",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: "label",
    title: "Tags Extraction",
    desc: "Extract all hidden video tags for competitive SEO research.",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: "search",
    title: "SEO Metadata",
    desc: "Analyze titles and descriptions for optimization opportunities.",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: "api",
    title: "Fast API",
    desc: "High-performance API endpoints for developers and agencies.",
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Everything You Need to Analyze a YouTube Video
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-outline-variant/30 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 ${feat.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <span className={`material-symbols-outlined ${feat.iconColor} text-2xl`}>
                    {feat.icon}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-on-surface mb-2">
                  {feat.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
