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
    <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans antialiased flex flex-col selection:bg-[#166236] selection:text-white">
      <TopBanner />
      <Header activeTab="COURSES" />

      {/* Page Breadcrumb & Header */}
      <div className="bg-[#faf8f5] border-b border-[#e6e0d4] px-4 md:px-8 py-3 flex flex-wrap justify-between items-center font-sans text-xs text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#166236]">AY-CAT-008</span>
          <span className="text-gray-300">//</span>
          <span className="text-gray-600">Official Curriculum Directory</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-gray-500">
          <span>✓ Qualified Instructors</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#166236]">Live Group Classrooms</span>
        </div>
      </div>

      {/* Main Title Section */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
          <div>
            <div className="bg-[#166236] text-white font-sans text-[10px] font-bold px-3 py-1 inline-block uppercase mb-3 rounded-full shadow-xs">
              Academic Curriculum
            </div>
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#14241c] tracking-tight leading-none mb-4">
              Course Catalog & Pathways
            </h1>
            <p className="font-sans text-sm md:text-base text-gray-600 max-w-3xl leading-relaxed">
              Explore structured Islamic sciences curricula taught live with dedicated personalized mentorship.
            </p>
          </div>

          {/* Institutional stamp */}
          <div className="rounded-3xl border border-[#e6e0d4] bg-white p-5 text-left shadow-xs min-w-[220px]">
            <p className="font-arabic text-2xl font-bold text-[#166236] text-left">
              رِوَايَةً وَدِرَايَةً
            </p>
            <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">
              Transmission & Understanding
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 font-sans">
          <div className="flex-1 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by course title, code, or topic (e.g. Tajweed, Nazrah, Arabic)..."
              className="w-full bg-white border border-[#e6e0d4] rounded-2xl px-5 py-3.5 text-xs text-[#14241c] placeholder-gray-400 font-medium focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all shadow-xs"
            />
          </div>
          <button className="bg-[#166236] text-white rounded-2xl px-7 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-[#114e2a] transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer">
            <span>Filter Courses</span>
            <span>☲</span>
          </button>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] flex-1 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="rounded-3xl border border-[#e6e0d4] bg-white p-12 text-center font-sans font-medium text-sm text-gray-600 shadow-xs">
            Loading accredited courses from database...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center font-sans font-semibold text-xs text-red-700">
            {error}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="rounded-3xl border border-[#e6e0d4] bg-white p-12 text-center font-sans text-xs text-gray-500 shadow-xs">
            No courses found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <div
                key={c.id || c._id}
                className="rounded-3xl border border-[#e6e0d4] bg-white flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <div>
                  {/* Header Strip */}
                  <div className="bg-[#faf8f5] border-b border-gray-100 p-4 flex items-center justify-between font-sans text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                      <span className="truncate max-w-[200px] text-gray-700">{c.dept || c.category || "Islamic Studies"}</span>
                    </div>
                    <span className="bg-[#14241c] text-white text-[10px] px-2.5 py-0.5 rounded-full font-mono">
                      {c.code}
                    </span>
                  </div>

                  {/* Arabic Matn Title Box */}
                  <div className="bg-[#faf8f5]/50 border-b border-gray-100 p-5 relative">
                    <div className="text-[10px] font-sans text-gray-500 uppercase font-bold mb-1">
                      Primary Subject
                    </div>
                    {c.primaryText && (
                      <div className="font-arabic text-xl md:text-2xl font-bold text-[#166236] my-1 text-left">
                        {c.primaryText}
                      </div>
                    )}
                    <div className="inline-block text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase mt-2 bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {c.status}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-6 font-sans">
                    <h3 className="font-serif font-bold text-xl text-[#14241c] leading-tight mb-3">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {c.description}
                    </p>

                    {/* Lessons & Duration Grid */}
                    <div className="grid grid-cols-2 divide-x divide-gray-100 border border-gray-100 rounded-2xl bg-[#faf8f5] text-center text-xs py-3 mb-4">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase font-semibold">Lessons</div>
                        <div className="font-bold text-sm text-[#14241c]">{c.totalLessons || 20}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase font-semibold">Duration</div>
                        <div className="font-bold text-sm text-[#14241c]">{c.duration || "30 Hours"}</div>
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-gray-500 flex justify-between border-t border-gray-100 pt-3">
                      <span>Level:</span>
                      <span className="text-[#166236] font-bold">{c.level}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="border-t border-gray-100 bg-[#faf8f5]/60 p-4">
                  <Link
                    href={`/courses/${c.code?.toLowerCase() || c.id || c._id}`}
                    className="w-full bg-[#166236] text-white rounded-xl py-3 text-center font-sans font-semibold text-xs tracking-wide hover:bg-[#114e2a] block shadow-xs transition-all"
                  >
                    View Syllabus & Enroll →
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
