"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";
import { courseService } from "@/lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getPublicCourses();
      setCourses(data);
    } catch (err: any) {
      setError(err.message || "Failed to load courses from API");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.title?.toLowerCase().includes(q) ||
      c.code?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.primaryText?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans antialiased flex flex-col">
      <TopBanner />
      <Header activeTab="COURSES" />

      {/* Page Breadcrumb & Header */}
      <div className="bg-[#d8ddc6] border-b-2 border-[#090c0a] px-4 md:px-8 py-2 flex flex-wrap justify-between items-center font-mono text-[11px] text-[#090c0a]">
        <div className="flex items-center space-x-2">
          <span>INDEX ID: 1446-CAT-008</span>
          <span>//</span>
          <span>OFFICIAL ACCREDITATION LEDGER</span>
        </div>
        <div className="flex items-center space-x-4 text-[10px] text-[#5a655b]">
          <span>☑ PEER-VERIFIED CURRICULA</span>
          <span>|</span>
          <span>ISNAD CRITERIA RATING: A+</span>
        </div>
      </div>

      {/* Main Title Section */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
          <div>
            <div className="bg-[#090c0a] text-[#c5ea31] font-mono text-[10px] font-bold px-2 py-0.5 inline-block uppercase mb-3">
              TWT-REG-01 CENTRAL SCHOLASTIC REGISTRY
            </div>
            <h1 className="font-mono font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#090c0a] uppercase tracking-tight leading-none mb-4">
              ACADEMIC CATALOGUE // ALL COURSES
            </h1>
            <p className="font-mono text-sm md:text-base text-[#1a231b] max-w-3xl leading-relaxed">
              Comprehensive, structured Islamic sciences curricula fetched directly from the institutional database.
            </p>
          </div>

          {/* Right Calligraphy stamp */}
          <div className="border-2 border-[#090c0a] bg-white p-4 font-mono text-center shadow-[4px_4px_0px_0px_#090c0a] min-w-[220px]">
            <p dir="rtl" className="font-arabic text-3xl font-bold text-[#090c0a]">
              رِوَايَةً وَدِرَايَةً
            </p>
            <p className="text-[9px] font-bold text-[#5a655b] uppercase mt-1">
              CRITICAL TRANSMISSION & INSIGHT
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 font-mono">
          <div className="flex-1 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="[ SEARCH BY COURSE CODE, TEXT, OR TOPIC (E.G. USUL, RIJAL, AQ-101)... ]"
              className="w-full bg-white border-2 border-[#090c0a] px-4 py-3.5 text-xs text-[#090c0a] placeholder-[#5a655b] uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#c5ea31]"
            />
          </div>
          <button className="bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] px-8 py-3.5 font-extrabold text-xs uppercase tracking-wider hover:bg-[#b0d624] transition-colors shadow-[3px_3px_0px_0px_#090c0a] flex items-center justify-center space-x-2">
            <span>[FILTER ARCHIVE]</span>
            <span>☲</span>
          </button>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6] flex-1">
        {loading ? (
          <div className="border-2 border-[#090c0a] bg-white p-12 text-center font-mono font-bold text-sm">
            ⏳ LOADING ACCREDITED COURSES FROM MONGODB...
          </div>
        ) : error ? (
          <div className="border-2 border-red-800 bg-red-100 p-8 text-center font-mono font-bold text-xs text-red-900">
            ⚠️ {error}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="border-2 border-[#090c0a] bg-white p-12 text-center font-mono text-xs font-bold text-[#5a655b]">
            NO COURSES FOUND IN DATABASE LEDGER.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <div
                key={c.id || c._id}
                className="border-2 border-[#090c0a] bg-[#d8ddc6] flex flex-col justify-between shadow-[6px_6px_0px_0px_#090c0a]"
              >
                <div>
                  {/* Header Strip */}
                  <div className="bg-[#cdd4b9] border-b-2 border-[#090c0a] p-3 flex items-center justify-between font-mono text-xs font-bold">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#090c0a]"></span>
                      <span>{c.dept || c.category || "DEPARTMENT OF ISLAMIC SCIENCES"}</span>
                    </div>
                    <span className="bg-[#090c0a] text-white text-[10px] px-1.5 py-0.5 font-mono">
                      {c.code}
                    </span>
                  </div>

                  {/* Arabic Matn Title Box */}
                  <div className="bg-[#e4e9d3] border-b-2 border-[#090c0a] p-4 relative">
                    <div className="text-[10px] font-mono text-[#5a655b] uppercase font-bold mb-1">
                      PRIMARY TEXT
                    </div>
                    {c.primaryText && (
                      <div dir="rtl" className="font-arabic text-2xl md:text-3xl font-bold text-[#090c0a] my-1">
                        {c.primaryText}
                      </div>
                    )}
                    <div className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 border border-[#090c0a] uppercase mt-2 bg-[#c5ea31] text-[#090c0a]">
                      STATUS: {c.status}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-5 font-mono">
                    <h3 className="font-extrabold text-xl text-[#090c0a] uppercase leading-tight mb-3">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#242c26] leading-relaxed mb-4">
                      {c.description}
                    </p>

                    {/* Lessons & Duration Grid */}
                    <div className="grid grid-cols-2 divide-x border border-[#090c0a] bg-white text-center text-xs py-2 mb-4">
                      <div>
                        <div className="text-[9px] text-[#5a655b] uppercase font-bold">LESSONS</div>
                        <div className="font-extrabold text-sm text-[#090c0a]">{c.totalLessons || 20}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-[#5a655b] uppercase font-bold">DURATION</div>
                        <div className="font-extrabold text-sm text-[#090c0a]">{c.duration || "30 Hours"}</div>
                      </div>
                    </div>

                    <div className="text-[10px] font-bold text-[#5a655b] flex justify-between border-t border-[#090c0a]/20 pt-2">
                      <span>LEVEL:</span>
                      <span className="text-[#090c0a]">{c.level}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="border-t-2 border-[#090c0a] bg-[#cdd4b9] p-3">
                  <Link
                    href={`/courses/${c.code?.toLowerCase() || c.id || c._id}`}
                    className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 text-center font-mono font-extrabold text-xs uppercase tracking-wider hover:bg-[#b0d624] block shadow-[2px_2px_0px_0px_#090c0a]"
                  >
                    VIEW SYLLABUS & DETAILS ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
