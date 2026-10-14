import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#d8ddc6] border-t-2 border-[#090c0a] font-mono">
      {/* Top Footer Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#090c0a] border-b-2 border-[#090c0a]">
        {/* Col 1 */}
        <div className="p-6 md:p-8">
          <div className="font-bold text-sm text-[#090c0a] uppercase tracking-wider mb-2">
            ADDINU YUSR INSTITUTE
          </div>
          <p className="text-xs text-[#242c26] leading-relaxed mb-4">
            An institutional learning platform dedicated to structured sacred knowledge, Qur'anic recitation, Tajweed, Arabic language, Seerah, Taharah, and 1-on-1 personal Quran mentorship.
          </p>
          <div className="text-[10px] font-bold uppercase text-[#5a655b] flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#090c0a]"></span>
            <span>ACADEMIC PORTAL V.2.0</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="p-6 md:p-8">
          <div className="text-[11px] font-bold text-[#5a655b] uppercase mb-4">
            OFFERED COURSES
          </div>
          <ul className="space-y-1.5 text-xs font-bold text-[#090c0a] uppercase">
            <li className="hover:underline">
              <Link href="/courses">01. NAZRAH QUR'AN CLASSES</Link>
            </li>
            <li className="hover:underline">
              <Link href="/courses">02. TAJWEED CLASSES</Link>
            </li>
            <li className="hover:underline">
              <Link href="/courses">03. ARABIC LANGUAGE COURSE</Link>
            </li>
            <li className="hover:underline">
              <Link href="/courses">04. SEERAH COURSE</Link>
            </li>
            <li className="hover:underline">
              <Link href="/courses">05. TAHARAH COURSE</Link>
            </li>
            <li className="hover:underline">
              <Link href="/courses">06. HIFZ COURSE</Link>
            </li>
            <li className="hover:underline">
              <Link href="/courses">07. PERSONAL CLASSES (QAIDA & QURAN)</Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="p-6 md:p-8">
          <div className="text-[11px] font-bold text-[#5a655b] uppercase mb-4">
            INSTITUTIONAL REGISTRY
          </div>
          <div className="border border-[#090c0a] bg-white p-3 mb-3 text-xs">
            <div className="font-bold text-[#090c0a]">ACCREDITED FACULTY</div>
            <div className="text-[10px] text-[#5a655b]">
              Qualified Instructors & Personalized Learning Council
            </div>
          </div>
          <div className="border border-[#090c0a] bg-[#c5ea31] p-3 text-xs text-[#090c0a]">
            <div className="font-bold uppercase">AUTHENTIC TEACHING STANDARDS</div>
            <div className="text-[10px]">
              Structured tajweed rules, oral recitation, and interactive progress tracking
            </div>
          </div>
        </div>

        {/* Col 4 */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#5a655b] uppercase mb-4">
              KNOWLEDGE OBLIGATION
            </div>
            <p className="text-xs text-[#242c26] leading-relaxed mb-4">
              Seeking authentic sacred knowledge with sincerity, accuracy, and dedicated mentorship for students of all ages.
            </p>
          </div>

          <div className="text-right">
            <p dir="rtl" className="font-arabic text-3xl font-bold text-[#090c0a]">
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </p>
            <p className="text-[9px] text-[#5a655b] uppercase font-bold mt-1">
              &quot;And say: My Lord, increase me in knowledge.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div className="bg-[#090c0a] text-[#d8ddc6] text-[10px] p-3 px-6 flex flex-wrap justify-between items-center gap-2 uppercase tracking-tight">
        <div>
          © 1446-1447 ADDINU YUSR INSTITUTE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex space-x-6 text-[#9baa90]">
          <span>STUDENT PORTAL</span>
          <span>ADMIN CONSOLE</span>
          <span>ACCREDITED CURRICULUM</span>
        </div>
      </div>
    </footer>
  );
}
