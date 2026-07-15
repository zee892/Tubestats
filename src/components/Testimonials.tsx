interface TestimonialItem {
  name: string;
  role: string;
  review: string;
  avatar: string;
  stars: number;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Marcus Chen",
    role: "YouTube Tech Creator",
    review: `"The fastest YouTube analyzer I've used. It's a game-changer for my weekly competitive research reports."`,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ5QEGtH3KzLl35SAYNJ1VrgD6rJnkWBOevMSaGM4-BSyEb8iqjyrrIz73NYYxk1PeIS2GAVRSaaKxt3M0L83tV-XWNjOOv0LiF83QtOKUdXbGxCn3B-cODRInzyXYKh9VcJm0eSEhZI3U_92Bh1Kb2HgFKvW-qt5hGz_6w4eOIqB38pHf-i0phGhbgyFFdh-WX-xQZRA8Iw4vTQ3x_Y2oZFmDjnyj45khtnRlQwn7hM_Q_b8Az9AT",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Marketing Director",
    review: `"TubeStats helps our agency find the best tags for our clients' videos. The interface is clean and super intuitive."`,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHcsBYd-bxRZblDZxkfUj_tj_Xba_16voogXnW9oPsWCX4ws6Rx3x7u24G07pz466bLMX2wiE7DQ2wI-FTUAjLJma3-y6X18cEuULtasaehJQcPgKPmwLV4jRZfSEnH_VaTC98QW2Xq5ccTIv5VGtoAbfViFH3Arqe66FmE6qmbdA4nhquHLYJXOkGCx7AbsRJCf1gIWZQ6iNPUneP2BCoyZJsaC68Z3jVJ8Bs86I9M2t3768o7hgd",
    stars: 5,
  },
  {
    name: "David Miller",
    role: "SEO Consultant",
    review: `"I love that I don't have to log in. I can just paste a URL and get everything I need. Perfect for quick checks."`,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8XDAZsklQH_1P0aiwv_jyui0fVEpNi5MT4vWN5AvZZ0pTzFp0VkAcsTa2PpaJoMzHeFLYy8DHJcLiEaYFQpdHo3CiG6mjeEPEosrIczmcr2yYfxpuasra2wMNf0CMs2jcIw0QCsPPKsV5J5EHDSkZhOZcm9yMsysRsZfngUYQ2phWsvydjT9ZgKYBuodXcdgy2fFGTO696RWTtfQGS7BfIOXHe2qBV0gc-QZqWrRYmz6xhkSdmwoJ",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-surface-low">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface">
            What Our Users Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-500 mb-4">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-sans text-on-surface mb-6 italic leading-relaxed text-sm md:text-base">
                  {test.review}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-outline-variant/10 pt-4 mt-2">
                <img
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant/20"
                  src={test.avatar}
                  alt={test.name}
                />
                <div>
                  <div className="font-display font-bold text-sm text-on-surface">
                    {test.name}
                  </div>
                  <div className="font-sans text-xs text-on-surface-variant">
                    {test.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
