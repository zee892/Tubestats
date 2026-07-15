interface ComparisonRow {
  feature: string;
  tubeStats: boolean | "check";
  generic: "check" | "cross" | "warning";
}

const comparisons: ComparisonRow[] = [
  { feature: "No Login Required", tubeStats: true, generic: "cross" },
  { feature: "Fast Analysis (<1s)", tubeStats: true, generic: "warning" },
  { feature: "Mobile Friendly", tubeStats: true, generic: "check" },
  { feature: "Free Forever Plan", tubeStats: true, generic: "cross" },
  { feature: "Detailed SEO Metrics", tubeStats: true, generic: "cross" },
  { feature: "Modern UI / No Ads", tubeStats: true, generic: "cross" },
  { feature: "100% Data Accuracy", tubeStats: true, generic: "warning" },
];

export default function ComparisonTable() {
  return (
    <section className="py-16 bg-surface-low/30">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Our Tool vs Other Video Checker Websites
          </h2>
          <p className="text-on-surface-variant font-sans text-base">
            Why TubeStats is the #1 choice for content creators and marketers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-outline-variant/30 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface">
                  <th className="py-6 px-6 font-display font-bold text-base md:text-lg text-on-surface">
                    Features
                  </th>
                  <th className="py-6 px-6 font-display font-bold text-base md:text-lg text-primary text-center bg-primary/5 border-l border-r border-outline-variant/10 w-48">
                    TubeStats
                  </th>
                  <th className="py-6 px-6 font-display font-semibold text-base md:text-lg text-on-surface-variant text-center w-48">
                    Generic Tools
                  </th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm md:text-base">
                {comparisons.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-outline-variant/10 hover:bg-surface-low/10 transition-colors"
                  >
                    <td className="py-5 px-6 font-medium text-on-surface">
                      {row.feature}
                    </td>
                    <td className="py-5 px-6 text-center bg-primary/5 border-l border-r border-outline-variant/10">
                      <span className="material-symbols-outlined text-green-600 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      {row.generic === "check" && (
                        <span className="material-symbols-outlined text-green-600 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      )}
                      {row.generic === "cross" && (
                        <span className="material-symbols-outlined text-red-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          cancel
                        </span>
                      )}
                      {row.generic === "warning" && (
                        <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          error
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
