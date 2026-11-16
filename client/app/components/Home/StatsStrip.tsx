const STATS = [
  {
    index: "01",
    value: "07",
    label: "Core Academic Pathways",
    description: "From beginner Qaida to advanced Tajweed and Arabic grammar.",
    tags: ["QUR'AN", "TAJWEED", "ARABIC", "SEERAH"],
  },
  {
    index: "02",
    value: "Cohorts",
    label: "Live Group Meets",
    description: "Interactive classroom meets where multiple students learn and recite together.",
    tags: ["SHARED LEARNING", "ACTIVE MEETS"],
  },
  {
    index: "03",
    value: "100%",
    label: "Live Virtual Instruction",
    description: "Direct real-time pronunciation correction with certified instructors.",
    tags: ["LIVE FEEDBACK", "SCREEN SHARING"],
  },
  {
    index: "04",
    value: "Global",
    label: "Worldwide Availability",
    description: "Flexible morning and evening slots accommodating any timezone.",
    tags: ["MALE & FEMALE INSTRUCTORS", "ALL AGES"],
    highlight: true,
  },
];

export default function StatsStrip() {
  return (
    <section className="bg-[#faf8f5] border-b border-[#e6e0d4] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.index}
              className="p-6 rounded-3xl border border-[#e6e0d4] bg-white hover:border-[#166236]/30 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              {/* Header info */}
              <div className="flex justify-between items-center text-[11px] font-sans font-medium text-gray-500 mb-4">
                <span>FACULTY PILLAR // {stat.index}</span>
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
              </div>

              {/* Value */}
              <div>
                <div className="font-serif font-extrabold text-3xl sm:text-4xl text-[#14241c] tracking-tight leading-none mb-2">
                  {stat.value}
                </div>
                <div className="font-sans font-bold text-xs uppercase tracking-wider text-[#166236] mb-2">
                  {stat.label}
                </div>
                <p className="font-sans text-xs text-gray-600 leading-relaxed mb-4">
                  {stat.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                {stat.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[9px] font-sans font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      stat.highlight
                        ? "bg-[#166236] text-white"
                        : "bg-[#faf8f5] text-[#14241c] border border-[#e6e0d4]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}