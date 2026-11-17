import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#e6e0d4] bg-[#faf8f5]">
      {/* Background Image: Grand Arch overlooking Mosque at Dawn */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-mosque.jpg"
          alt="Addinu Yusr Islamic Sanctuary"
          className="w-full h-full object-cover object-center lg:object-right"
        />
        {/* Warm ivory gradient overlays for premium contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/95 via-[#faf8f5]/85 to-[#faf8f5]/40 md:from-[#faf8f5]/95 md:via-[#faf8f5]/75 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-[#faf8f5]/50" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Institutional Pill Badge */}
          {/* <div className="inline-flex items-center space-x-2.5 border border-[#c29d59]/30 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-sans font-semibold text-[#166236] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
            <span className="tracking-wide uppercase text-[11px] font-bold">Addinu Yusr Institute</span>
            <span className="text-[#c29d59]">•</span>
            <span className="font-arabic text-sm text-[#14241c]">معهد الدين يسر</span>
          </div> */}

          {/* Academic Headline */}
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#14241c] leading-[1.12] tracking-tight mb-5">
            Authentic Islamic Learning,
            <br />
            <span className="text-[#166236] font-serif">Rooted in Tradition</span>,
            <br />
            Accessible for Everyone.
          </h1>

          {/* Subtitle / Descriptive Text */}
          <p className="text-[#3c4e43] font-sans text-sm sm:text-base leading-relaxed mb-8  backdrop-blur-xs   shadow-xs">
            A structured online academy offering verified instruction in Qur&apos;anic recitation, Tajweed, classical Arabic grammar, and sacred Islamic knowledge taught live by qualified instructors in interactive group classrooms.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            <Link
              href="/courses"
              className="bg-[#166236] text-white rounded-2xl px-8 py-4 font-sans font-bold text-sm tracking-wide hover:bg-[#114e2a] transition-all flex items-center justify-between sm:justify-center space-x-3 shadow-xs hover:shadow-md hover:-translate-y-0.5 duration-200"
            >
              <span>Explore All Courses</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/login"
              className="bg-white/90 text-[#14241c] border border-[#e6e0d4] rounded-2xl px-7 py-4 font-sans font-semibold text-sm hover:bg-white hover:border-[#166236]/40 transition-all flex items-center justify-center space-x-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 duration-200"
            >
              <span>Student Portal Login</span>
            </Link>
          </div>

          {/* Factual Highlights / Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/80 backdrop-blur-xs border border-[#e6e0d4] rounded-xl p-2.5 text-center">
              <div className="text-[11px] font-bold text-[#14241c]">Live Group Meets</div>
              <div className="text-[10px] text-gray-500">Interactive peer classes</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs border border-[#e6e0d4] rounded-xl p-2.5 text-center">
              <div className="text-[11px] font-bold text-[#14241c]">Certified Faculty</div>
              <div className="text-[10px] text-gray-500">Male & female instructors</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs border border-[#e6e0d4] rounded-xl p-2.5 text-center">
              <div className="text-[11px] font-bold text-[#14241c]">Flexible Hours</div>
              <div className="text-[10px] text-gray-500">Global timezone slots</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs border border-[#e6e0d4] rounded-xl p-2.5 text-center">
              <div className="text-[11px] font-bold text-[#14241c]">Direct Ijazah</div>
              <div className="text-[10px] text-gray-500">Structured certificates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}