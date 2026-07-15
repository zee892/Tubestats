import { useState } from "react";

export default function TopNavBar() {
  const [activeTab, setActiveTab] = useState("Tools");

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        <div className="font-display text-[28px] tracking-tighter text-primary font-bold">
          TubeStats
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {["Tools", "Blog", "API", "Pricing", "Contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans font-medium text-sm transition-colors duration-200 pb-1 cursor-pointer ${
                activeTab === tab
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 text-sm px-4 py-2 cursor-pointer">
            Login
          </button>
          <button className="bg-primary text-white font-bold rounded-xl px-6 py-2.5 shadow-md hover:bg-primary/90 active:scale-95 transition-all cursor-pointer">
            Try Free
          </button>
        </div>
      </div>
    </nav>
  );
}
