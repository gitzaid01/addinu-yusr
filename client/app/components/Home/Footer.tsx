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
              Sacred Learning & Support
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3 font-sans">
              Seeking authentic sacred knowledge with sincerity, accuracy, and dedicated mentorship for students of all ages.
            </p>
            <div className="space-y-2 pt-1 font-sans text-xs">
              <div>
                <a
                  href="tel:+966504781226"
                  className="inline-flex items-center space-x-1.5 text-[#166236] hover:underline font-bold"
                >
                  <svg className="w-3.5 h-3.5 text-[#166236]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
                  </svg>
                  <span>Direct Call: +966 50 478 1226</span>
                </a>
              </div>
              <div>
                <a
                  href="https://wa.me/918171432372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[#166236] hover:underline font-semibold"
                >
                  <span>WhatsApp: +91 8171432372</span>
                  <span>↗</span>
                </a>
              </div>
              <div>
                <a
                  href="https://whatsapp.com/channel/0029VbAuHQYGZND0ODsmGm1O"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[#128C7E] hover:underline font-semibold"
                >
                  <span>Official WhatsApp Channel</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
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
