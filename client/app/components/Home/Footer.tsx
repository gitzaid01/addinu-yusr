import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#faf8f5] border-t border-[#e6e0d4] font-sans mt-auto">
      {/* Top Footer Column Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e6e0d4]">
        {/* Col 1 */}
        <div className="p-6 md:p-8">
          <div className="font-serif font-bold text-sm text-[#14241c] uppercase tracking-wider mb-2">
            ADDINU YUSR INSTITUTE
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-4 font-sans">
            An institutional learning platform dedicated to structured sacred knowledge: Qur&apos;anic recitation, Tajweed, Arabic language, Seerah, Taharah, and live interactive group classrooms.
          </p>
          <div className="text-[10px] font-bold uppercase text-gray-500 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
            <span>ACADEMIC PORTAL V.2.0</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="p-6 md:p-8">
          <div className="text-[11px] font-bold text-gray-500 uppercase mb-4 tracking-wider">
            Offered Curricula
          </div>
          <ul className="space-y-2 text-xs font-medium text-gray-700">
            <li>
              <Link href="/courses" className="hover:text-[#166236] transition-colors">1. Nazrah Qur&apos;an Classes</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[#166236] transition-colors">2. Tajweed Classes</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[#166236] transition-colors">3. Arabic Language Course</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[#166236] transition-colors">4. Seerah Course</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[#166236] transition-colors">5. Taharah Course</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[#166236] transition-colors">6. Hifz Course</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[#166236] transition-colors">7. Group Classes (Qaida & Quran)</Link>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="p-6 md:p-8">
          <div className="text-[11px] font-bold text-gray-500 uppercase mb-4 tracking-wider">
            Academic Standards
          </div>
          <div className="border border-[#e6e0d4] rounded-2xl bg-white p-4 mb-3 text-xs shadow-xs">
            <div className="font-bold text-[#14241c]">Qualified Faculty</div>
            <div className="text-[11px] text-gray-500 font-sans mt-0.5">
              Verified male and female instructors with classical sanad and teaching experience.
            </div>
          </div>
          <div className="rounded-2xl bg-[#166236] p-4 text-xs text-white shadow-xs">
            <div className="font-bold uppercase tracking-wide">Live Interactive Learning</div>
            <div className="text-[11px] text-emerald-100 font-sans mt-0.5">
              Real-time pronunciation feedback, digital whiteboards, and milestone tracking.
            </div>
          </div>
        </div>

        {/* Col 4 */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-gray-500 uppercase mb-4 tracking-wider">
              Sacred Learning
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4 font-sans">
              Seeking authentic sacred knowledge with sincerity, accuracy, and dedicated mentorship for students of all ages.
            </p>
          </div>

          <div className="text-left pt-4">
            <p className="font-arabic text-2xl sm:text-3xl font-bold text-[#166236] text-left">
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </p>
            <p className="text-[10px] text-gray-500 font-medium mt-1">
              &quot;And say: My Lord, increase me in knowledge.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div className="bg-[#14241c] text-emerald-100/70 text-[11px] p-4 px-6 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <div>
          © 1446-1447 Addinu Yusr Institute. All rights reserved.
        </div>
        <div className="flex space-x-6 text-emerald-100/70 text-xs">
          <Link href="/login" className="hover:text-white transition-colors">Student Portal</Link>
          <Link href="/admin" className="hover:text-white transition-colors">Admin Console</Link>
          <Link href="/courses" className="hover:text-white transition-colors">All Courses</Link>
        </div>
      </div>
    </footer>
  );
}
