import Link from "next/link";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans antialiased flex flex-col">
      <TopBanner />
      <Header activeTab="COURSES" />

      {/* Breadcrumb Bar */}
      <div className="bg-[#d8ddc6] border-b-2 border-[#090c0a] px-4 md:px-8 py-2 flex flex-wrap justify-between items-center font-mono text-[11px] text-[#090c0a]">
        <div className="flex items-center space-x-2">
          <Link href="/courses" className="hover:underline font-bold">
            TAWTHEEQ
          </Link>
          <span>/</span>
          <span>FACULTY OF HADITH</span>
          <span>/</span>
          <span className="font-bold border-b border-[#090c0a]">HD-202</span>
          <span>/</span>
          <span>CURRICULUM SYLLABUS</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold">
          <span className="bg-[#090c0a] text-white px-2 py-0.5">
            [ LEVEL 3: ADVANCED ]
          </span>
          <span className="bg-white border border-[#090c0a] px-2 py-0.5">
            [ 32 LESSONS ]
          </span>
          <span className="bg-white border border-[#090c0a] px-2 py-0.5">
            [ 45 CREDIT HOURS ]
          </span>
          <span className="bg-[#c5ea31] border border-[#090c0a] px-2 py-0.5 text-[#090c0a]">
            [ CERTIFIED ISNAD TRACK ]
          </span>
        </div>
      </div>

      {/* Main Course Header Hero */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Title details */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#5a655b] font-bold uppercase mb-2">
                ■ CANONICAL CORPUS REFERENCE: TWT-HD-884
              </div>

              <h1 className="font-mono font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#090c0a] uppercase tracking-tight leading-none mb-3">
                HD-202: SCIENCES OF HADITH & ISNAD CRITICISM
              </h1>

              <div dir="rtl" className="font-arabic text-3xl md:text-4xl font-bold text-[#090c0a] mb-4">
                مُقَدِّمَةُ ابْنِ الصَّلاَحِ فِي عُلُومِ الْحَدِيثِ
              </div>

              <p className="font-mono text-sm md:text-base text-[#1a231b] leading-relaxed max-w-3xl mb-6">
                An intensive analytical examination of transmission criticism, narrator reliability evaluations
                (Al-Jarh wa at-Ta&apos;dil), hidden flaws in Hadith (Al-&apos;Ilal), and criteria of authenticity established by classical tradition.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#090c0a]/20 font-mono text-xs font-bold text-[#090c0a]">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-[#090c0a]"></span>
                <span>ENROLLED: 840 SCHOLARS</span>
              </div>
              <span>|</span>
              <div className="flex items-center space-x-1.5">
                <span>💬 LANGUAGE: ENGLISH W/ CLASSICAL ARABIC TEXTS</span>
              </div>
              <span>|</span>
              <div className="flex items-center space-x-1.5">
                <span className="text-[#5a655b]">🔑 PREREQUISITES:</span>
                <span className="underline">HD-101 OR EQUIVALENT SANAD</span>
              </div>
            </div>
          </div>

          {/* Right Isnad Topology Wireframe Card */}
          <div className="lg:col-span-4 border-2 border-[#090c0a] bg-[#090c0a] text-white p-5 flex flex-col justify-between shadow-[6px_6px_0px_0px_#090c0a]">
            <div>
              <div className="flex justify-between items-center font-mono text-[10px] border-b border-[#242c26] pb-2 mb-3">
                <span className="text-[#c5ea31] font-bold">ISNAD TOPOLOGY MATRIX</span>
                <span className="text-[#9baa90]">CANON V.2</span>
              </div>

              {/* Transmission Graph */}
              <div className="bg-[#161b17] border border-[#242c26] p-4 aspect-[16/9] flex items-center justify-center relative mb-4">
                <svg viewBox="0 0 200 100" className="w-full h-full text-[#c5ea31]">
                  {/* Lines connecting nodes */}
                  <line x1="30" y1="50" x2="70" y2="25" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="30" y1="50" x2="70" y2="75" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="70" y1="25" x2="130" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="70" y1="75" x2="130" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="130" y1="50" x2="170" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Nodes */}
                  <circle cx="30" cy="50" r="6" fill="#090c0a" stroke="currentColor" strokeWidth="2" />
                  <circle cx="70" cy="25" r="6" fill="#090c0a" stroke="currentColor" strokeWidth="2" />
                  <circle cx="70" cy="75" r="6" fill="#090c0a" stroke="currentColor" strokeWidth="2" />
                  <circle cx="130" cy="50" r="8" fill="#c5ea31" stroke="#090c0a" strokeWidth="2" />
                  <circle cx="170" cy="50" r="6" fill="#090c0a" stroke="currentColor" strokeWidth="2" />

                  {/* Labels */}
                  <text x="30" y="70" textAnchor="middle" fill="#9baa90" fontSize="8" fontFamily="monospace">NARR</text>
                  <text x="130" y="35" textAnchor="middle" fill="#c5ea31" fontSize="8" fontFamily="monospace" fontWeight="bold">MADAR</text>
                  <text x="170" y="70" textAnchor="middle" fill="#9baa90" fontSize="8" fontFamily="monospace">TEXT</text>
                </svg>
              </div>
            </div>

            <div className="font-mono text-[10px] flex justify-between items-center text-[#9baa90] border-t border-[#242c26] pt-2">
              <span>RIGIDITY: CLASS A-1</span>
              <span className="text-white font-bold">MUTTASIL (AUTHENTIC)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Syllabus + Enrollment Sidebar */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 01: Course Overview & Learning Objectives */}
            <div>
              <div className="flex justify-between items-center font-mono mb-4 border-b-2 border-[#090c0a] pb-2">
                <h2 className="font-extrabold text-2xl text-[#090c0a] uppercase tracking-tight">
                  01 // COURSE OVERVIEW & LEARNING OBJECTIVES
                </h2>
                <span className="bg-[#090c0a] text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                  CRITERIA
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 font-mono">
                <div className="border-2 border-[#090c0a] bg-[#e4e9d3] p-4 flex flex-col justify-between shadow-[3px_3px_0px_0px_#090c0a]">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#5a655b] font-bold uppercase mb-2">
                      <span>OBJECTIVE // I</span>
                      <span>[TAXONOMY]</span>
                    </div>
                    <p className="text-xs text-[#090c0a] font-bold leading-relaxed mb-4">
                      Master the 65 discrete categories of Hadith defined by Imam Ibn al-Salah in his foundational treatise.
                    </p>
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#090c0a] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#090c0a]"></span>
                    <span>COMPREHENSIVE CODIFICATION</span>
                  </div>
                </div>

                <div className="border-2 border-[#090c0a] bg-[#e4e9d3] p-4 flex flex-col justify-between shadow-[3px_3px_0px_0px_#090c0a]">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#5a655b] font-bold uppercase mb-2">
                      <span>OBJECTIVE // II</span>
                      <span>[ISNAD TOPOLOGY]</span>
                    </div>
                    <p className="text-xs text-[#090c0a] font-bold leading-relaxed mb-4">
                      Analyze chain topologies: Mutawatir, Ahad, Mashhur, and Gharib transmission structures under formal verification.
                    </p>
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#090c0a] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#090c0a]"></span>
                    <span>GRAPH & LINEAGE VALIDATION</span>
                  </div>
                </div>

                <div className="border-2 border-[#090c0a] bg-[#e4e9d3] p-4 flex flex-col justify-between shadow-[3px_3px_0px_0px_#090c0a]">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#5a655b] font-bold uppercase mb-2">
                      <span>OBJECTIVE // III</span>
                      <span>[BIOGRAPHY CRITIQUE]</span>
                    </div>
                    <p className="text-xs text-[#090c0a] font-bold leading-relaxed mb-4">
                      Identify narrator biography entries in Al-Dhahabi's Mizan al-I'tidal and Ibn Hajar's Tahdhib al-Tahdhib.
                    </p>
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#090c0a] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#090c0a]"></span>
                    <span>PRIMARY ARCHIVE RETRIEVAL</span>
                  </div>
                </div>

                <div className="border-2 border-[#090c0a] bg-[#e4e9d3] p-4 flex flex-col justify-between shadow-[3px_3px_0px_0px_#090c0a]">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#5a655b] font-bold uppercase mb-2">
                      <span>OBJECTIVE // IV</span>
                      <span>[DEFECT RECOGNITION]</span>
                    </div>
                    <p className="text-xs text-[#090c0a] font-bold leading-relaxed mb-4">
                      Distinguish authentic sound texts (Sahih) from anomalous (Shadhdh) and defective (Mu'allal) narrations.
                    </p>
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#090c0a] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#090c0a]"></span>
                    <span>SUBTLE HIDDEN DEFECT ANALYSIS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 02: Syllabus & Curriculum Breakdown */}
            <div>
              <div className="flex justify-between items-center font-mono mb-4 border-b-2 border-[#090c0a] pb-2">
                <h2 className="font-extrabold text-2xl text-[#090c0a] uppercase tracking-tight">
                  02 // SYLLABUS & CURRICULUM BREAKDOWN
                </h2>
                <span className="text-xs font-bold text-[#5a655b] uppercase">
                  3 MODULES DEPLOYED
                </span>
              </div>

              {/* Module 01 Block */}
              <div className="border-2 border-[#090c0a] bg-[#d8ddc6] mb-6 shadow-[4px_4px_0px_0px_#090c0a]">
                <div className="bg-[#090c0a] text-white p-3 font-mono flex flex-wrap justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#c5ea31] text-[#090c0a] px-1.5 py-0.5 font-extrabold">MOD-01</span>
                    <span className="font-extrabold uppercase">PROLEGOMENA & TEXTUAL CRITERIA</span>
                  </div>
                  <span className="text-[#9baa90] text-[11px]">LESSONS 01-04 • 6H 40M TOTAL</span>
                </div>

                <div className="divide-y-2 divide-[#090c0a] font-mono">
                  {/* Lesson 01 */}
                  <div className="p-4 bg-[#e4e9d3] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-[#090c0a]">01</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#090c0a] uppercase">Historical Emergence of Hadith Verification</h4>
                        <div className="text-[10px] text-[#5a655b] font-bold">DURATION: 1H 15M • READING: MUQADDIMAH PP. 1-24</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-[#090c0a] text-[#c5ea31] text-[9px] font-bold px-2 py-1 uppercase">STATUS: COMPLETED ✓</span>
                      <button className="border border-[#090c0a] bg-white p-1 hover:bg-[#c5ea31]">📹</button>
                    </div>
                  </div>

                  {/* Lesson 02 */}
                  <div className="p-4 bg-[#e4e9d3] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-[#090c0a]">02</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#090c0a] uppercase">The Five Conditions of Hadith Authenticity (Sahih)</h4>
                        <div className="text-[10px] text-[#5a655b] font-bold">DURATION: 1H 45M • READING: MAN&apos; 01 (PP. 25-47)</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-[#090c0a] text-[#c5ea31] text-[9px] font-bold px-2 py-1 uppercase">STATUS: COMPLETED ✓</span>
                      <button className="border border-[#090c0a] bg-white p-1 hover:bg-[#c5ea31]">📹</button>
                    </div>
                  </div>

                  {/* Lesson 03 - Active */}
                  <div className="p-4 bg-[#c5ea31]/40 border-l-4 border-l-[#090c0a] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-[#090c0a]">03</span>
                      <div>
                        <h4 className="font-extrabold text-base text-[#090c0a] uppercase">Hasan Hadith: Definitions & Disputed Subclasses</h4>
                        <div className="text-[10px] text-[#090c0a] font-bold">DURATION: 2H 10M • READING: MAN&apos; 02 (PP. 48-72) • NEXT SESSION</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-[#c5ea31] text-[#090c0a] border border-[#090c0a] text-[10px] font-extrabold px-2 py-1 uppercase">IN PROGRESS</span>
                      <button className="bg-[#090c0a] text-[#c5ea31] border border-[#090c0a] px-4 py-2 text-xs font-extrabold uppercase hover:bg-[#161b17]">
                        ENTER LECTURE HALL -&gt;
                      </button>
                    </div>
                  </div>

                  {/* Lesson 04 */}
                  <div className="p-4 bg-[#d8ddc6] opacity-75 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <span className="font-extrabold text-lg text-[#5a655b]">04</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#090c0a] uppercase">Practical Workshop: Examining Sanad Manuscripts</h4>
                        <div className="text-[10px] text-[#5a655b] font-bold">DURATION: 1H 30M • MANUSCRIPT CODEX: MS-MEDINA-75</div>
                      </div>
                    </div>
                    <div>
                      <span className="border border-[#090c0a] bg-white text-[#5a655b] text-[9px] font-bold px-2 py-1 uppercase">🔒 LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 02 Block */}
              <div className="border-2 border-[#090c0a] bg-[#d8ddc6] mb-6 shadow-[4px_4px_0px_0px_#090c0a]">
                <div className="bg-[#090c0a] text-white p-3 font-mono flex flex-wrap justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="bg-white text-[#090c0a] px-1.5 py-0.5 font-extrabold">MOD-02</span>
                    <span className="font-extrabold uppercase">CATEGORIES OF TRANSMISSION INCOMPLETENESS</span>
                  </div>
                  <span className="text-[#9baa90] text-[11px]">LESSONS 05-08 • 9H 00M TOTAL</span>
                </div>

                <div className="divide-y-2 divide-[#090c0a] font-mono opacity-80">
                  <div className="p-3.5 bg-[#d8ddc6] flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">05. Al-Mu&apos;allaq, Al-Mursal, and Al-Mu&apos;dal</span>
                    <span className="border border-[#090c0a] bg-white text-[9px] font-bold px-2 py-0.5">🔒 LOCKED</span>
                  </div>
                  <div className="p-3.5 bg-[#d8ddc6] flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">06. Tadlis (Concealment in Narration): Types & Rigorous Rules</span>
                    <span className="border border-[#090c0a] bg-white text-[9px] font-bold px-2 py-0.5">🔒 LOCKED</span>
                  </div>
                  <div className="p-3.5 bg-[#d8ddc6] flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">07. Defective Narrations (Al-&apos;Ilal al-Khafiyyah)</span>
                    <span className="border border-[#090c0a] bg-white text-[9px] font-bold px-2 py-0.5">🔒 LOCKED</span>
                  </div>
                  <div className="p-3.5 bg-[#d8ddc6] flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">08. Mid-Semester Isnad Case Evaluation</span>
                    <span className="border border-[#090c0a] bg-white text-[9px] font-bold px-2 py-0.5">🔒 LOCKED</span>
                  </div>
                </div>
              </div>

              {/* Module 03 Block */}
              <div className="border-2 border-[#090c0a] bg-[#cdd4b9] p-4 font-mono flex justify-between items-center shadow-[3px_3px_0px_0px_#090c0a]">
                <div>
                  <span className="bg-[#090c0a] text-white text-[9px] font-bold px-1.5 py-0.5 mr-2">MOD-03</span>
                  <span className="font-extrabold text-sm uppercase text-[#090c0a]">THE DISCIPLINE OF NARRATOR DISCREDITATION & VALIDATION (LESSONS 09-14)</span>
                  <div className="text-[10px] text-[#5a655b] font-bold mt-0.5">UNLOCKS UPON PASSING LESSON 08 MID-SEMESTER EXAMINATION</div>
                </div>
                <span className="border border-[#090c0a] bg-white text-[9px] font-bold px-2 py-1 uppercase">🔒 LOCKED TRACK</span>
              </div>
            </div>

            {/* Section 03: Required Texts & Scholarly Manuscripts */}
            <div>
              <div className="flex justify-between items-center font-mono mb-4 border-b-2 border-[#090c0a] pb-2">
                <h2 className="font-extrabold text-2xl text-[#090c0a] uppercase tracking-tight">
                  03 // REQUIRED TEXTS & SCHOLARLY MANUSCRIPTS
                </h2>
                <span className="text-xs font-bold text-[#5a655b] uppercase">
                  CODEX ARCHIVE
                </span>
              </div>

              <div className="border-2 border-[#090c0a] bg-white shadow-[4px_4px_0px_0px_#090c0a] overflow-x-auto font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#090c0a] text-white text-[10px] uppercase">
                      <th className="p-3 border-r border-[#242c26]">CORPUS ID</th>
                      <th className="p-3 border-r border-[#242c26]">PRIMARY TEXT & AUTHOR</th>
                      <th className="p-3 border-r border-[#242c26]">EDITION / TAHQIQ</th>
                      <th className="p-3">DISPATCH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#090c0a]">
                    <tr className="bg-[#d8ddc6]">
                      <td className="p-3 border-r-2 border-[#090c0a] font-bold">TXT-SAL-01</td>
                      <td className="p-3 border-r-2 border-[#090c0a]">
                        <div className="font-bold uppercase">Ma&apos;rifat Anwa&apos; &apos;Ilm al-Hadith (Al-Muqaddimah)</div>
                        <div dir="rtl" className="font-arabic text-base font-bold text-[#090c0a]">أبو عمرو عثمان بن عبد الرحمن الشهرزوري (ابن الصلاح)</div>
                      </td>
                      <td className="p-3 border-r-2 border-[#090c0a] text-[11px]">
                        Dr. Nur al-Din &apos;Itr Verification (Dar al-Fikr, Damascus 1406 AH)
                      </td>
                      <td className="p-3">
                        <button className="bg-white text-[#090c0a] border border-[#090c0a] px-3 py-1.5 font-bold text-[10px] uppercase hover:bg-[#c5ea31]">
                          📥 PDF [42MB]
                        </button>
                      </td>
                    </tr>

                    <tr className="bg-[#e4e9d3]">
                      <td className="p-3 border-r-2 border-[#090c0a] font-bold">TXT-HAJ-08</td>
                      <td className="p-3 border-r-2 border-[#090c0a]">
                        <div className="font-bold uppercase">Nukhbat al-Fikr fi Mustalah Ahl al-Ather</div>
                        <div dir="rtl" className="font-arabic text-base font-bold text-[#090c0a]">شهاب الدين ابن حجر العسقلاني</div>
                      </td>
                      <td className="p-3 border-r-2 border-[#090c0a] text-[11px]">
                        Critical Comparison Recension (Tawtheeq Academic Press 1444 AH)
                      </td>
                      <td className="p-3">
                        <button className="bg-white text-[#090c0a] border border-[#090c0a] px-3 py-1.5 font-bold text-[10px] uppercase hover:bg-[#c5ea31]">
                          📥 PDF [18MB]
                        </button>
                      </td>
                    </tr>

                    <tr className="bg-[#d8ddc6]">
                      <td className="p-3 border-r-2 border-[#090c0a] font-bold">MS-VAT-558</td>
                      <td className="p-3 border-r-2 border-[#090c0a]">
                        <div className="font-bold uppercase">Facsimile Manuscript: Al-Muqaddimah Folio 22b-34a</div>
                        <div dir="rtl" className="font-arabic text-base font-bold text-[#090c0a]">مخطوطة الخزانة التيمورية (دار الكتب المصرية)</div>
                      </td>
                      <td className="p-3 border-r-2 border-[#090c0a] text-[11px]">
                        High-Res Paleographic Scan (Certified 8-Point Sanad Stamp)
                      </td>
                      <td className="p-3">
                        <button className="bg-[#c5ea31] text-[#090c0a] border border-[#090c0a] px-3 py-1.5 font-extrabold text-[10px] uppercase hover:bg-[#b0d624]">
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
            <div className="border-2 border-[#090c0a] bg-[#d8ddc6] shadow-[6px_6px_0px_0px_#090c0a]">
              <div className="bg-[#c5ea31] border-b-2 border-[#090c0a] p-3 flex justify-between items-center font-bold text-xs">
                <span>■ ENROLLMENT STATUS // ACTIVE</span>
                <span>⚙</span>
              </div>

              <div className="p-5">
                <div className="flex justify-between text-[11px] font-bold uppercase mb-1">
                  <span>CURRENT PROGRESS</span>
                  <span className="text-[#090c0a]">42% [14 OF 32 LESSONS]</span>
                </div>
                <div className="w-full bg-[#090c0a] h-3 p-0.5 mb-2">
                  <div className="bg-[#c5ea31] h-full w-[42%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-[#5a655b] uppercase mb-6">
                  <span>STAGE: MODULE 01 IN PROGRESS</span>
                  <span>EST: 18 HOURS REMAINING</span>
                </div>

                <button className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3.5 px-4 font-extrabold text-sm uppercase tracking-wider hover:bg-[#b0d624] shadow-[3px_3px_0px_0px_#090c0a] mb-3 flex items-center justify-between">
                  <span>CONTINUE TO LESSON 03</span>
                  <span>-&gt;</span>
                </button>

                <button className="w-full bg-white text-[#090c0a] border-2 border-[#090c0a] py-2.5 px-4 font-bold text-xs uppercase tracking-wider hover:bg-[#e4e9d3] mb-2 flex items-center justify-center space-x-2">
                  <span>📥 DOWNLOAD ACADEMIC SYLLABUS (PDF)</span>
                </button>

                <button className="w-full bg-white text-[#090c0a] border-2 border-[#090c0a] py-2.5 px-4 font-bold text-xs uppercase tracking-wider hover:bg-[#e4e9d3] flex items-center justify-between">
                  <span>💬 STUDENT DISCUSSION FORUM</span>
                  <span className="bg-[#090c0a] text-white text-[9px] px-1.5">42 THREADS</span>
                </button>
              </div>
            </div>

            {/* Faculty Info Card */}
            <div className="border-2 border-[#090c0a] bg-white p-5 shadow-[6px_6px_0px_0px_#090c0a]">
              <div className="flex items-center space-x-3 border-b-2 border-[#090c0a] pb-3 mb-4">
                <div className="w-10 h-10 bg-[#090c0a] text-[#c5ea31] flex items-center justify-center font-bold text-lg border border-[#090c0a]">
                  🛡
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[#5a655b] uppercase">AUTHORITATIVE FACULTY</div>
                  <div className="font-extrabold text-sm text-[#090c0a] uppercase leading-tight">
                    DEPARTMENT OF HADITH METHODOLOGY & ISNAD VERIFICATION
                  </div>
                </div>
              </div>

              <div className="bg-[#e4e9d3] border border-[#090c0a] p-3 mb-4 text-xs">
                <div className="font-bold text-[#090c0a] uppercase mb-1">📜 ACCREDITATION GUARANTEE</div>
                <p className="text-[11px] text-[#242c26] leading-relaxed">
                  Upon completion of written assessment and oral sanad examination, an accredited certificate (Ijazah fi Fahm al-Muqaddimah) is granted with verified lineage to the author.
                </p>
              </div>

              <div className="text-[10px] text-[#5a655b] font-bold flex justify-between pt-2 border-t border-[#090c0a]/20">
                <span>REGISTRY: TWT-CAT-9902</span>
                <span>CYCLE: 1446 AH</span>
              </div>
            </div>

            {/* Supervising Chair Card */}
            <div className="border-2 border-[#090c0a] bg-[#d8ddc6] p-5 shadow-[6px_6px_0px_0px_#090c0a]">
              <div className="text-[10px] text-[#5a655b] font-bold uppercase mb-1">
                CHAIR OF CRITICAL SECTIONS // SUPERVISING SETTING
              </div>
              <h3 className="font-extrabold text-lg text-[#090c0a] uppercase mb-2">
                PROFESSOR DR. AHMAD AL-ANSARI
              </h3>
              <p className="text-xs text-[#242c26] leading-relaxed mb-4">
                Specialist in 6th-7th Century Levant manuscripts. Former Fellow of Classical Textual Rigor, Cairo. Holder of 14 continuous isnad chains.
              </p>
              <div className="flex justify-between items-center border-t border-[#090c0a] pt-3 text-[11px]">
                <span className="text-[#5a655b]">OFFICE HOURS: THU 14:00 GMT</span>
                <button className="font-bold underline text-[#090c0a] hover:text-emerald-800">
                  SUMMON SCHOLAR -&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Requirement Banner */}
      <section className="bg-[#090c0a] text-white p-4 font-mono text-xs border-b-2 border-[#090c0a]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="bg-[#c5ea31] text-[#090c0a] font-extrabold px-2 py-0.5 text-[10px]">!</span>
            <span>
              <strong>SANAD CONTINUITY REQUIREMENT:</strong> Scholars auditing this course must maintain an attendance record ≥ 90% to receive oral audition certification (Sama&apos;).
            </span>
          </div>
          <span className="text-[#9baa90] text-[10px] uppercase font-bold">NEXT SETTING: FAJR + 45M</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
