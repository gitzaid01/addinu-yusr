const STATS = [
  {
    index: "01",
    value: "08",
    label: "CORE CURRICULUM PATHS",
    tags: ["AQEEDAH", "FIQH", "SEERAH"],
  },
  {
    index: "02",
    value: "142",
    label: "STRUCTURED MODULES",
    tags: ["RECORDED & LIVE SEMINARS"],
  },
  {
    index: "03",
    value: "4,850+",
    label: "AUTHENTICATED HADITH",
    tags: ["CROSS-CHECKED ISNAD"],
  },
  {
    index: "04",
    value: "98.4%",
    label: "COMPLETION RATE",
    tags: ["SCHOLAR VERIFIED"],
    highlight: true,
  },
];

export default function StatsStrip() {
  return (
    <section className="bg-[#d8ddc6] border-b-2 border-[#090c0a]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#090c0a]">
        {STATS.map((stat) => (
          <div
            key={stat.index}
            className="p-6 md:p-8 flex flex-col justify-between relative bg-[#d8ddc6] hover:bg-[#cfd5bc] transition-colors"
          >
            {/* Header info */}
            <div className="flex justify-between items-center text-[11px] font-mono text-[#090c0a] mb-6">
              <span>INDEX // {stat.index}</span>
              <span className="w-2 h-2 border border-[#090c0a] bg-transparent"></span>
            </div>

            {/* Value */}
            <div>
              <div className="font-mono font-extrabold text-5xl md:text-6xl text-[#090c0a] tracking-tight leading-none mb-3">
                {stat.value}
              </div>
              <div className="font-mono font-bold text-xs uppercase tracking-wider text-[#090c0a] mb-4">
                {stat.label}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {stat.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 border border-[#090c0a] ${
                    stat.highlight
                      ? "bg-[#c5ea31] text-[#090c0a]"
                      : "bg-[#090c0a] text-white"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}