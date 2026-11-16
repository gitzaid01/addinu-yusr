import Link from "next/link";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans antialiased flex flex-col selection:bg-[#166236] selection:text-white">
      <TopBanner />
      <Header activeTab="COURSES" />

      {/* Breadcrumb Bar */}
      <div className="bg-[#faf8f5] border-b border-[#e6e0d4] px-4 md:px-8 py-3 flex flex-wrap justify-between items-center font-sans text-xs text-gray-700">
        <div className="flex items-center space-x-2">
          <Link href="/courses" className="hover:underline font-bold text-[#166236]">
            Addinu Yusr
          </Link>
          <span className="text-gray-300">/</span>
          <span>Faculty of Hadith</span>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-[#14241c]">HD-202</span>
          <span className="text-gray-300">/</span>
          <span>Curriculum Syllabus</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="bg-[#14241c] text-white px-3 py-1 rounded-full">
            Level 3: Advanced
          </span>
          <span className="bg-white border border-[#e6e0d4] text-gray-700 px-3 py-1 rounded-full">
            32 Lessons
          </span>
          <span className="bg-white border border-[#e6e0d4] text-gray-700 px-3 py-1 rounded-full">
            45 Credit Hours
          </span>
          <span className="bg-[#166236] text-white px-3 py-1 font-bold rounded-full shadow-xs">
            Certified Isnad Track
          </span>
        </div>
      </div>

      {/* Main Course Header Hero */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Title details */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-sans text-gray-500 font-bold uppercase mb-2">
                Canonical Reference: AY-HD-884
              </div>

              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#14241c] tracking-tight leading-tight mb-3">
                HD-202: Sciences of Hadith & Isnad Criticism
              </h1>

              <div className="font-arabic text-2xl md:text-3xl font-bold text-[#166236] mb-4 text-left">
                مُقَدِّمَةُ ابْنِ الصَّلاَحِ فِي عُلُومِ الْحَدِيثِ
              </div>

              <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mb-6">
                An intensive analytical examination of transmission criticism, narrator reliability evaluations
                (Al-Jarh wa at-Ta&apos;dil), hidden flaws in Hadith (Al-&apos;Ilal), and criteria of authenticity established by classical tradition.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 font-mono text-xs font-bold text-gray-800">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                <span>ENROLLED: 840 SCHOLARS</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-1.5">
                <span>💬 LANGUAGE: ENGLISH W/ CLASSICAL ARABIC TEXTS</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-1.5">
                <span className="text-gray-500">🔑 PREREQUISITES:</span>
                <span className="text-[#166236] underline">HD-101 OR EQUIVALENT SANAD</span>
              </div>
            </div>
          </div>

          {/* Right Isnad Topology Wireframe Card */}
          <div className="lg:col-span-4 rounded-3xl bg-[#14241c] text-white p-6 flex flex-col justify-between shadow-xs border border-[#14241c]">
            <div>
              <div className="flex justify-between items-center font-sans text-xs border-b border-emerald-900 pb-2 mb-3">
                <span className="text-emerald-300 font-bold">ISNAD TOPOLOGY MATRIX</span>
                <span className="text-gray-400">CANON V.2</span>
              </div>

              {/* Transmission Graph */}
              <div className="bg-[#1e3328] border border-emerald-900/60 rounded-2xl p-4 aspect-[16/9] flex items-center justify-center relative mb-4">
                <svg viewBox="0 0 200 100" className="w-full h-full text-emerald-400">
                  {/* Lines connecting nodes */}
                  <line x1="30" y1="50" x2="70" y2="25" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="30" y1="50" x2="70" y2="75" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="70" y1="25" x2="130" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="70" y1="75" x2="130" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="130" y1="50" x2="170" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Nodes */}
                  <circle cx="30" cy="50" r="6" fill="#14241c" stroke="currentColor" strokeWidth="2" />
                  <circle cx="70" cy="25" r="6" fill="#14241c" stroke="currentColor" strokeWidth="2" />
                  <circle cx="70" cy="75" r="6" fill="#14241c" stroke="currentColor" strokeWidth="2" />
                  <circle cx="130" cy="50" r="8" fill="#166236" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="170" cy="50" r="6" fill="#14241c" stroke="currentColor" strokeWidth="2" />

                  {/* Labels */}
                  <text x="30" y="70" textAnchor="middle" fill="#9baa90" fontSize="8" fontFamily="monospace">NARR</text>
                  <text x="130" y="35" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">MADAR</text>
                  <text x="170" y="70" textAnchor="middle" fill="#9baa90" fontSize="8" fontFamily="monospace">TEXT</text>
                </svg>
              </div>
            </div>

            <div className="font-sans text-xs flex justify-between items-center text-emerald-200/80 border-t border-emerald-900 pt-2">
              <span>Rigidity: Class A-1</span>
              <span className="text-white font-bold">Muttasil (Authentic)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Syllabus + Enrollment Sidebar */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Syllabus Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 01: Course Overview */}
            <div className="rounded-3xl border border-[#e6e0d4] bg-white p-6 md:p-8 shadow-xs font-sans">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                <h2 className="font-serif font-bold text-xl text-[#14241c] tracking-tight">
                  Course Disciplinary Overview
                </h2>
                <span className="text-xs font-bold text-gray-500 uppercase">ACCREDITATION DISPATCH</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                This course serves as an exhaustive breakdown of canonical hadith terminology and textual transmission criticism according to the methodology formalized by Imam Ibn al-Salah (d. 643 AH) in his landmark work, &quot;Ma&apos;rifat Anwa&apos; &apos;Ilm al-Hadith&quot;.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border border-gray-100 rounded-2xl bg-gray-50/70 p-4 text-xs">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">PRIMARY CANONICAL TEXT</div>
                  <div className="font-bold text-[#14241c]">Al-Muqaddimah (Ibn al-Salah)</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">ISNAD PEDIGREE</div>
                  <div className="font-bold text-[#14241c]">Continuous Through Dar al-Hadith</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">METHODOLOGY</div>
                  <div className="font-bold text-[#14241c]">Comparative Isnad Matrix</div>
                </div>
              </div>
            </div>

            {/* Section 02: Structured Module Syllabus */}
            <div>
              <div className="flex justify-between items-center font-mono mb-4 border-b border-gray-100 pb-2">
                <h2 className="font-extrabold text-2xl text-[#14241c] uppercase tracking-tight">
                  02 // STRUCTURED MODULE SYLLABUS (32 LESSONS)
                </h2>
                <span className="text-xs font-bold text-[#166236] uppercase">
                  PROGRESS: 14/32 COMPLETED
                </span>
              </div>

              {/* Module 01 Block */}
              <div className="rounded-3xl border border-gray-200 bg-white mb-6 shadow-sm overflow-hidden">
                <div className="bg-gray-950 text-white p-4 font-mono flex flex-wrap justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#166236] text-white px-2.5 py-0.5 font-extrabold rounded-full shadow-xs">MOD-01</span>
                    <span className="font-extrabold uppercase">PROLEGOMENA & TEXTUAL CRITERIA</span>
                  </div>
                  <span className="text-gray-400 text-[11px]">LESSONS 01-04 • 6H 40M TOTAL</span>
                </div>

                <div className="divide-y divide-gray-100 font-mono">
                  {/* Lesson 01 */}
                  <div className="p-4 bg-gray-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-[#14241c]">01</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#14241c] uppercase">Historical Emergence of Hadith Verification</h4>
                        <div className="text-[10px] text-gray-500 font-bold">DURATION: 1H 15M • READING: MUQADDIMAH PP. 1-24</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-50 text-[#166236] border border-emerald-200 text-[9px] font-bold px-2.5 py-1 uppercase rounded-full">STATUS: COMPLETED ✓</span>
                      <button className="border border-gray-200 bg-white p-1.5 rounded-lg hover:bg-gray-50 transition-colors">📹</button>
                    </div>
                  </div>

                  {/* Lesson 02 */}
                  <div className="p-4 bg-gray-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-[#14241c]">02</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#14241c] uppercase">The Five Conditions of Hadith Authenticity (Sahih)</h4>
                        <div className="text-[10px] text-gray-500 font-bold">DURATION: 1H 45M • READING: MAN&apos; 01 (PP. 25-47)</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-50 text-[#166236] border border-emerald-200 text-[9px] font-bold px-2.5 py-1 uppercase rounded-full">STATUS: COMPLETED ✓</span>
                      <button className="border border-gray-200 bg-white p-1.5 rounded-lg hover:bg-gray-50 transition-colors">📹</button>
                    </div>
                  </div>

                  {/* Lesson 03 - Active */}
                  <div className="p-4 bg-emerald-50/60 border-l-4 border-l-[#166236] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-[#166236]">03</span>
                      <div>
                        <h4 className="font-extrabold text-base text-[#14241c] uppercase">Hasan Hadith: Definitions & Disputed Subclasses</h4>
                        <div className="text-[10px] text-gray-500 font-bold">DURATION: 2H 10M • READING: MAN&apos; 02 (PP. 48-72) • NEXT SESSION</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-[#166236] text-white text-[10px] font-extrabold px-3 py-1 uppercase rounded-full shadow-xs">IN PROGRESS</span>
                      <button className="bg-gray-900 text-white rounded-xl px-4 py-2 text-xs font-extrabold uppercase hover:bg-[#166236] transition-colors shadow-xs cursor-pointer">
                        ENTER LECTURE HALL -&gt;
                      </button>
                    </div>
                  </div>

                  {/* Lesson 04 */}
                  <div className="p-4 bg-white opacity-75 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-gray-400">04</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#14241c] uppercase">Practical Workshop: Examining Sanad Manuscripts</h4>
                        <div className="text-[10px] text-gray-500 font-bold">DURATION: 1H 30M • MANUSCRIPT CODEX: MS-MEDINA-75</div>
                      </div>
                    </div>
                    <div>
                      <span className="border border-gray-200 bg-gray-100 text-gray-500 text-[9px] font-bold px-2.5 py-1 uppercase rounded-full">🔒 LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 02 Block */}
              <div className="rounded-3xl border border-gray-200 bg-white mb-6 shadow-sm overflow-hidden">
                <div className="bg-gray-950 text-white p-4 font-mono flex flex-wrap justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/20 text-white px-2.5 py-0.5 font-extrabold rounded-full">MOD-02</span>
                    <span className="font-extrabold uppercase">CATEGORIES OF TRANSMISSION INCOMPLETENESS</span>
                  </div>
                  <span className="text-gray-400 text-[11px]">LESSONS 05-08 • 9H 00M TOTAL</span>
                </div>

                <div className="divide-y divide-gray-100 font-mono opacity-80">
                  <div className="p-3.5 bg-gray-50/50 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">05. Al-Mu&apos;allaq, Al-Mursal, and Al-Mu&apos;dal</span>
                    <span className="border border-gray-200 bg-white text-[9px] font-bold px-2.5 py-0.5 rounded-full text-gray-500">🔒 LOCKED</span>
                  </div>
                  <div className="p-3.5 bg-gray-50/50 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">06. Tadlis (Concealment in Narration): Types & Rigorous Rules</span>
                    <span className="border border-gray-200 bg-white text-[9px] font-bold px-2.5 py-0.5 rounded-full text-gray-500">🔒 LOCKED</span>
                  </div>
                  <div className="p-3.5 bg-gray-50/50 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">07. Defective Narrations (Al-&apos;Ilal al-Khafiyyah)</span>
                    <span className="border border-gray-200 bg-white text-[9px] font-bold px-2.5 py-0.5 rounded-full text-gray-500">🔒 LOCKED</span>
                  </div>
                  <div className="p-3.5 bg-gray-50/50 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">08. Mid-Semester Isnad Case Evaluation</span>
                    <span className="border border-gray-200 bg-white text-[9px] font-bold px-2.5 py-0.5 rounded-full text-gray-500">🔒 LOCKED</span>
                  </div>
                </div>
              </div>

              {/* Module 03 Block */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 font-mono flex justify-between items-center shadow-xs">
                <div>
                  <span className="bg-gray-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full mr-2">MOD-03</span>
                  <span className="font-extrabold text-sm uppercase text-[#14241c]">THE DISCIPLINE OF NARRATOR DISCREDITATION & VALIDATION (LESSONS 09-14)</span>
                  <div className="text-[10px] text-gray-500 font-bold mt-0.5">UNLOCKS UPON PASSING LESSON 08 MID-SEMESTER EXAMINATION</div>
                </div>
                <span className="border border-gray-200 bg-white text-[9px] font-bold px-2.5 py-1 uppercase rounded-full text-gray-500">🔒 LOCKED TRACK</span>
              </div>
            </div>

            {/* Section 03: Required Texts & Scholarly Manuscripts */}
            <div>
              <div className="flex justify-between items-center font-mono mb-4 border-b border-gray-100 pb-2">
                <h2 className="font-extrabold text-2xl text-[#14241c] uppercase tracking-tight">
                  03 // REQUIRED TEXTS & SCHOLARLY MANUSCRIPTS
                </h2>
                <span className="text-xs font-bold text-gray-500 uppercase">
                  CODEX ARCHIVE
                </span>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden overflow-x-auto font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-950 text-white text-[10px] uppercase">
                      <th className="p-3.5 border-r border-gray-800">CORPUS ID</th>
                      <th className="p-3.5 border-r border-gray-800">PRIMARY TEXT & AUTHOR</th>
                      <th className="p-3.5 border-r border-gray-800">EDITION / TAHQIQ</th>
                      <th className="p-3.5">DISPATCH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white">
                      <td className="p-3.5 border-r border-gray-100 font-bold">TXT-SAL-01</td>
                      <td className="p-3.5 border-r border-gray-100">
                        <div className="font-bold uppercase">Ma&apos;rifat Anwa&apos; &apos;Ilm al-Hadith (Al-Muqaddimah)</div>
                        <div className="font-arabic text-base font-bold text-[#166236] text-left">أبو عمرو عثمان بن عبد الرحمن الشهرزوري (ابن الصلاح)</div>
                      </td>
                      <td className="p-3.5 border-r border-gray-100 text-[11px] text-gray-600">
                        Dr. Nur al-Din &apos;Itr Verification (Dar al-Fikr, Damascus 1406 AH)
                      </td>
                      <td className="p-3.5">
                        <button className="bg-white text-gray-800 border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-[10px] uppercase hover:bg-[#166236] hover:text-white transition-colors cursor-pointer shadow-xs">
                          📥 PDF [42MB]
                        </button>
                      </td>
                    </tr>

                    <tr className="bg-gray-50/50">
                      <td className="p-3.5 border-r border-gray-100 font-bold">TXT-HAJ-08</td>
                      <td className="p-3.5 border-r border-gray-100">
                        <div className="font-bold uppercase">Nukhbat al-Fikr fi Mustalah Ahl al-Ather</div>
                        <div className="font-arabic text-base font-bold text-[#166236] text-left">شهاب الدين ابن حجر العسقلاني</div>
                      </td>
                      <td className="p-3.5 border-r border-gray-100 text-[11px] text-gray-600">
                        Critical Comparison Recension (Addinu Yusr Academic Press 1444 AH)
                      </td>
                      <td className="p-3.5">
                        <button className="bg-white text-gray-800 border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-[10px] uppercase hover:bg-[#166236] hover:text-white transition-colors cursor-pointer shadow-xs">
                          📥 PDF [18MB]
                        </button>
                      </td>
                    </tr>

                    <tr className="bg-white">
                      <td className="p-3.5 border-r border-gray-100 font-bold">MS-VAT-558</td>
                      <td className="p-3.5 border-r border-gray-100">
                        <div className="font-bold uppercase">Facsimile Manuscript: Al-Muqaddimah Folio 22b-34a</div>
                        <div className="font-arabic text-base font-bold text-[#166236] text-left">مخطوطة الخزانة التيمورية (دار الكتب المصرية)</div>
                      </td>
                      <td className="p-3.5 border-r border-gray-100 text-[11px] text-gray-600">
                        High-Res Paleographic Scan (Certified 8-Point Sanad Stamp)
                      </td>
                      <td className="p-3.5">
                        <button className="bg-[#166236] text-white rounded-xl px-3 py-1.5 font-extrabold text-[10px] uppercase hover:bg-[#124f2b] transition-colors cursor-pointer shadow-xs">
                          🔍 ARCHIVE VIEW
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6 font-mono">
            {/* Enrollment Status Box */}
            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-[#166236] text-white p-4 flex justify-between items-center font-bold text-xs">
                <span>■ ENROLLMENT STATUS // ACTIVE</span>
                <span>⚙</span>
              </div>

              <div className="p-6">
                <div className="flex justify-between text-[11px] font-bold uppercase mb-1">
                  <span>CURRENT PROGRESS</span>
                  <span className="text-[#166236] font-bold">42% [14 OF 32 LESSONS]</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-[#166236] h-full rounded-full w-[42%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-6">
                  <span>STAGE: MODULE 01 IN PROGRESS</span>
                  <span>EST: 18 HOURS REMAINING</span>
                </div>

                <button className="w-full bg-[#166236] text-white rounded-xl py-3.5 px-4 font-extrabold text-sm uppercase tracking-wider hover:bg-[#124f2b] shadow-xs mb-3 flex items-center justify-between transition-all cursor-pointer">
                  <span>CONTINUE TO LESSON 03</span>
                  <span>-&gt;</span>
                </button>

                <button className="w-full bg-white text-gray-800 border border-gray-200 rounded-xl py-2.5 px-4 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 mb-2 flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                  <span>📥 DOWNLOAD ACADEMIC SYLLABUS (PDF)</span>
                </button>

                <button className="w-full bg-white text-gray-800 border border-gray-200 rounded-xl py-2.5 px-4 font-bold text-xs uppercase tracking-wider hover:bg-gray-50 flex items-center justify-between transition-colors cursor-pointer">
                  <span>💬 STUDENT DISCUSSION FORUM</span>
                  <span className="bg-[#166236] text-white text-[9px] px-2 py-0.5 rounded-full">42 THREADS</span>
                </button>
              </div>
            </div>

            {/* Faculty Info Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-3 mb-4">
                <div className="w-10 h-10 bg-emerald-50 text-[#166236] rounded-2xl flex items-center justify-center font-bold text-lg">
                  🛡
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase">AUTHORITATIVE FACULTY</div>
                  <div className="font-extrabold text-sm text-[#14241c] uppercase leading-tight">
                    DEPARTMENT OF HADITH METHODOLOGY & ISNAD VERIFICATION
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 mb-4 text-xs">
                <div className="font-bold text-[#166236] uppercase mb-1">📜 ACCREDITATION GUARANTEE</div>
                <p className="text-[11px] text-gray-600 leading-relaxed font-sans">
                  Upon completion of written assessment and oral sanad examination, an accredited certificate (Ijazah fi Fahm al-Muqaddimah) is granted with verified lineage to the author.
                </p>
              </div>

              <div className="text-[10px] text-gray-500 font-bold flex justify-between pt-2 border-t border-gray-100">
                <span>REGISTRY: AY-CAT-9902</span>
                <span>CYCLE: 1446 AH</span>
              </div>
            </div>

            {/* Supervising Chair Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                CHAIR OF CRITICAL SECTIONS // SUPERVISING SETTING
              </div>
              <h3 className="font-extrabold text-lg text-[#14241c] uppercase mb-2">
                PROFESSOR DR. AHMAD AL-ANSARI
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 font-sans">
                Specialist in 6th-7th Century Levant manuscripts. Former Fellow of Classical Textual Rigor, Cairo. Holder of 14 continuous isnad chains.
              </p>
              <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-[11px]">
                <span className="text-gray-500">OFFICE HOURS: THU 14:00 GMT</span>
                <button className="font-bold underline text-[#166236] hover:text-[#124f2b] cursor-pointer">
                  SUMMON SCHOLAR -&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Requirement Banner */}
      <section className="bg-gray-950 text-white p-4 font-mono text-xs border-b border-gray-900">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="bg-[#166236] text-white font-extrabold px-2.5 py-0.5 text-[10px] rounded-full">!</span>
            <span>
              <strong>SANAD CONTINUITY REQUIREMENT:</strong> Scholars auditing this course must maintain an attendance record ≥ 90% to receive oral audition certification (Sama&apos;).
            </span>
          </div>
          <span className="text-gray-400 text-[10px] uppercase font-bold">NEXT SETTING: FAJR + 45M</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
