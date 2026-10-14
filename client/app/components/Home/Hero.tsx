import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b-2 border-[#090c0a] bg-[#d8ddc6]">
      <div className="p-4 md:p-8 grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Heading, Subtitle & Action buttons */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 border border-[#090c0a] bg-[#d8ddc6] px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-[#090c0a]"></span>
              <span>ADDINU YUSR INSTITUTE // ACADEMIC PORTAL</span>
            </div>

            <h1 className="font-mono font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] uppercase tracking-tighter text-[#090c0a] mb-6">
              LEARN YOUR DEEN.
              <br />
              BUILD YOUR
              <br />
              KNOWLEDGE.
            </h1>

            <p className="text-[#1a231b] font-mono text-sm sm:text-base leading-relaxed max-w-2xl mb-8 border-l-2 border-[#090c0a] pl-4">
              A disciplined institutional portal delivering structured classical and
              contemporary Islamic curricula: Qur'anic recitation, Tajweed, Arabic linguistic immersion, Seerah, Taharah, and 1-on-1 personal mentorship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              href="/courses"
              className="bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:bg-[#b0d624] transition-all flex items-center justify-between shadow-[4px_4px_0px_0px_#090c0a]"
            >
              <span>EXPLORE COURSES</span>
              <svg className="w-5 h-5 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/login"
              className="bg-[#ffffff] text-[#090c0a] border-2 border-[#090c0a] px-8 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:bg-[#f0f0f0] transition-all flex items-center justify-between shadow-[4px_4px_0px_0px_#090c0a]"
            >
              <div className="flex items-center space-x-2">
                <span className="font-sans text-xs">🔒</span>
                <span>STUDENT PORTAL LOGIN</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Image Panel */}
        <div className="lg:col-span-5 bg-[#090c0a] text-[#d8ddc6] border-2 border-[#090c0a] p-2 flex flex-col justify-between shadow-[6px_6px_0px_0px_#090c0a] relative overflow-hidden min-h-[360px]">
          <div className="relative w-full h-full min-h-[350px] border border-[#242c26] overflow-hidden group">
            <img 
              src="/hero-bg.jpg" 
              alt="Addinu Yusr Sanctuary" 
              className="w-full h-full object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090c0a]/90 via-transparent to-transparent p-4 flex flex-col justify-end">
              <div className="font-mono text-xs text-[#c5ea31] font-bold uppercase tracking-wider">
                ADDINU YUSR INSTITUTE
              </div>
              <div className="font-arabic text-[#d8ddc6] text-sm mt-0.5">
                معهد الدين يسر للعلوم الشرعية
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}