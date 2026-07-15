import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is TubeStats free to use?",
    answer: "Yes, TubeStats is completely free to use. We offer a generous free tier that allows you to analyze public YouTube videos instantly, view detailed analytics, and extract tags without any sign-up or hidden costs.",
  },
  {
    question: "How accurate is the data?",
    answer: "We query live data sources and utilize Gemini AI with real-time Google Search Grounding to find up-to-the-minute metrics (views, likes, comments, and tags) directly from the official web indices, ensuring industry-standard accuracy.",
  },
  {
    question: "Do I need to install any software?",
    answer: "No installation is required. TubeStats is a fully responsive web application that runs flawlessly in any modern web browser across desktop, tablet, and mobile devices.",
  },
  {
    question: "Can I extract tags from any video?",
    answer: "Absolutely! You can paste any valid public YouTube URL (Standard, Mobile, Shorts, or Embed link) or video ID, and our engine will extract all meta keywords and hidden SEO tags associated with it.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white/50 border-t border-b border-outline-variant/20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-on-surface-variant font-sans text-sm">
            Everything you need to know about using TubeStats.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-outline-variant/30 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-low transition-all font-display text-base md:text-lg font-semibold text-on-surface cursor-pointer select-none"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined transition-transform duration-300 text-primary ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 font-sans text-sm md:text-base text-on-surface-variant leading-relaxed border-t border-outline-variant/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
