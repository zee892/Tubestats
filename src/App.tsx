import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import TopNavBar from "./components/TopNavBar";
import FeaturesGrid from "./components/FeaturesGrid";
import DashboardView from "./components/DashboardView";
import ComparisonTable from "./components/ComparisonTable";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/FAQSection";
import { VideoAnalysisResult } from "./types";

const EXAMPLES = [
  { label: "Rickroll (Classic)", url: "dQw4w9WgXcQ" },
  { label: "Me at the zoo (1st Video)", url: "jNQXAC9IVRw" },
  { label: "Gangnam Style (Milestone)", url: "9bZkp7q19f0" },
];

export default function App() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoAnalysisResult | null>(null);

  const handleAnalyze = async (searchUrl: string) => {
    if (!searchUrl.trim()) return;
    
    setIsLoading(true);
    setError(null);

    // Scroll to dashboard area early to show loading skeleton/focus
    setTimeout(() => {
      document.getElementById("dashboard-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: searchUrl }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze YouTube video.");
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      // Roll back view to top if it failed so they can adjust input
      document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAnalyze(url);
  };

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
    handleAnalyze(exampleUrl);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans antialiased text-[#2b1613]">
      <TopNavBar />

      <main className="flex-grow pt-24">
        {/* Hero & Search Section */}
        <section id="hero-section" className="relative hero-gradient overflow-hidden py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-on-surface">
                  Analyze Any YouTube Video in <span className="italic text-primary">Seconds</span>
                </h1>
                <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Get instant access to YouTube video statistics including views, likes, comments, upload date, channel information, and deep actionable SEO metadata.
                </p>
              </motion.div>

              {/* Input Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-white p-6 rounded-[28px] border border-outline-variant/30 shadow-xl max-w-2xl mx-auto lg:mx-0"
              >
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70">
                      link
                    </span>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste YouTube video URL or ID here..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface border border-outline-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface font-sans text-sm md:text-base transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/95 text-white font-bold rounded-2xl px-8 py-4 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">sync</span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">analytics</span>
                        Analyze
                      </>
                    )}
                  </button>
                </form>

                {/* Example pills */}
                <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-on-surface-variant font-medium">
                  <span>Try examples:</span>
                  {EXAMPLES.map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleExampleClick(ex.url)}
                      className="px-3 py-1.5 rounded-xl bg-surface-low border border-outline-variant/20 hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm shrink-0">warning</span>
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Visual Floating Cards Column */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end h-[320px] md:h-[400px]">
              {/* Background Accent glow */}
              <div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl right-10 top-10"></div>
              
              {/* Central Illustration Frame */}
              <div className="relative w-full max-w-[340px] aspect-square rounded-[36px] bg-gradient-to-tr from-primary/10 to-transparent p-4 border border-outline-variant/20 flex items-center justify-center">
                <img
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa4wcuOmAA1ky65Zp1cQ5a38oNE6SYx5XqjzamVTizegUmYVHH9sBpfdubbGLnA0muT_RLapWHED3s9kS748xUC2ucqmEQ54STh2dfuNrrBDKaU4yaQUHXz60poRSissyMCcMq0ol0RMf5BA5d7Lmpbm9yovraH8c1Q8-Vlgr30TuWgnmIGroECMa9iX1ML81ujnZneWkn7-DKFATLnqG-RyyCboAYdee-cs2957BMjMXRreFcSOm8"
                  alt="YouTube analytics benefit"
                  className="w-full h-full object-cover rounded-[28px] shadow-lg opacity-90"
                />

                {/* Floating Stats Badge 1 */}
                <div className="floating absolute -top-4 -left-6 bg-white border border-outline-variant/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 w-40">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] uppercase text-on-surface-variant font-bold">Views</span>
                    <span className="font-display font-black text-on-surface text-base">1.2M+</span>
                  </div>
                </div>

                {/* Floating Stats Badge 2 */}
                <div className="floating absolute bottom-6 -right-8 bg-white border border-outline-variant/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 w-36" style={{ animationDelay: "1.5s" }}>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] uppercase text-on-surface-variant font-bold">Likes</span>
                    <span className="font-display font-black text-on-surface text-base">84k</span>
                  </div>
                </div>

                {/* Floating Stats Badge 3 */}
                <div className="floating absolute -bottom-8 -left-4 bg-white border border-outline-variant/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 w-44" style={{ animationDelay: "0.7s" }}>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] uppercase text-on-surface-variant font-bold">Watch Time</span>
                    <span className="font-display font-black text-on-surface text-base">45k hrs</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Trusted By Brand Row */}
        <section className="py-10 bg-white border-t border-b border-outline-variant/20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <p className="text-center text-xs uppercase tracking-widest font-bold text-on-surface-variant/60 mb-6">
              TRUSTED BY CONTENT CREATORS & DIGITAL AGENCIES
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-40">
              {["CREATOR.LY", "Vidsync", "AGENCY+", "STREAMHUB", "YT ANALYTICS"].map((brand, i) => (
                <span key={i} className="font-display font-extrabold text-sm md:text-base tracking-widest">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* The Dashboard View Container (Loads real analysis results dynamically) */}
        <DashboardView data={result} isLoading={isLoading} />

        {/* Master the YouTube Algorithm Layout */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-video rounded-3xl overflow-hidden border border-outline-variant/30 shadow-md bg-stone-100">
                <img
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa4wcuOmAA1ky65Zp1cQ5a38oNE6SYx5XqjzamVTizegUmYVHH9sBpfdubbGLnA0muT_RLapWHED3s9kS748xUC2ucqmEQ54STh2dfuNrrBDKaU4yaQUHXz60poRSissyMCcMq0ol0RMf5BA5d7Lmpbm9yovraH8c1Q8-Vlgr30TuWgnmIGroECMa9iX1ML81ujnZneWkn7-DKFATLnqG-RyyCboAYdee-cs2957BMjMXRreFcSOm8"
                  alt="Optimize YouTube"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase bg-red-100 text-primary font-bold px-3 py-1.5 rounded-full border border-primary/10 inline-block">
                ALGORITHM EXPERTISE
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Master the YouTube Algorithm and Grow Your Channel
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                Publishing high-quality videos is only half the battle. To rank high and get pushed by the algorithm, your videos require proper SEO structuring, accurate tag categorizations, and engagement-optimization loops.
              </p>
              
              <div className="space-y-4">
                {[
                  "Find hidden keyword tags that competitive videos hide inside meta parameters.",
                  "Understand comment sentiment analysis to evaluate community approval.",
                  "Examine engagement rates directly rather than relying solely on high view counts."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-600 font-bold shrink-0">check_circle</span>
                    <span className="font-sans text-sm md:text-base text-on-surface-variant font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <FeaturesGrid />

        {/* Comparison Showcase Section */}
        <ComparisonTable />

        {/* Statistics highlights */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <span className="font-display font-black text-3xl md:text-5xl block mb-2">100M+</span>
                <span className="font-sans text-xs md:text-sm text-red-100 font-medium uppercase tracking-wider">Videos Analyzed</span>
              </div>
              <div>
                <span className="font-display font-black text-3xl md:text-5xl block mb-2">2M+</span>
                <span className="font-sans text-xs md:text-sm text-red-100 font-medium uppercase tracking-wider">Active Creators</span>
              </div>
              <div>
                <span className="font-display font-black text-3xl md:text-5xl block mb-2">500K+</span>
                <span className="font-sans text-xs md:text-sm text-red-100 font-medium uppercase tracking-wider">Daily Searches</span>
              </div>
              <div>
                <span className="font-display font-black text-3xl md:text-5xl block mb-2">99.9%</span>
                <span className="font-sans text-xs md:text-sm text-red-100 font-medium uppercase tracking-wider">API Uptime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* FAQs */}
        <FAQSection />

        {/* Final CTA Banner */}
        <section className="py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="bg-primary rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 80%)"></div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h3 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Ready to Optimize Your YouTube Strategy?
                </h3>
                <p className="font-sans text-sm md:text-base text-red-100 leading-relaxed">
                  Start checking stats, extracting hidden meta-tags, and mastering video optimization now. Completely free, no registration required.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-white text-primary font-bold rounded-2xl px-8 py-4 shadow-xl hover:bg-red-50 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined">rocket_launch</span>
                    Get Started Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#2b1613] text-stone-300 py-12 border-t border-stone-800">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-display text-xl font-bold text-white mb-4">
              TubeStats
            </div>
            <p className="font-sans text-xs leading-relaxed text-stone-400">
              Advanced YouTube video statistics and SEO tags analyzer. Grow your channel with smart metrics.
            </p>
          </div>
          <div>
            <div className="font-label text-xs uppercase tracking-wider font-bold text-white mb-4">Product</div>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li><a href="#" className="hover:text-primary transition-colors">Video Checker</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tags Extractor</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SEO Optimizer</a></li>
            </ul>
          </div>
          <div>
            <div className="font-label text-xs uppercase tracking-wider font-bold text-white mb-4">Resources</div>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li><a href="#" className="hover:text-primary transition-colors">Creator Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog News</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Developer API</a></li>
            </ul>
          </div>
          <div>
            <div className="font-label text-xs uppercase tracking-wider font-bold text-white mb-4">Company</div>
            <ul className="space-y-2 text-xs text-stone-400 font-sans">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} TubeStats. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
