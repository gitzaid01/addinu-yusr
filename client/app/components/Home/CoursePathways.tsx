"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { courseService } from "@/lib/api";

export default function CoursePathways() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getPublicCourses();
      setCourses(data);
    } catch (err) {
      console.error("Failed to load home page courses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#faf8f5] p-6 md:p-12 border-b border-[#e6e0d4]">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#e6e0d4]">
          <div>
            <div className="flex items-center space-x-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#166236] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
              <span>Available Curriculum</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">Live Group Sessions</span>
            </div>
            <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-[#14241c] tracking-tight">
              Institutional Courses & Pathways
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-600 mt-2 max-w-xl">
              Systematic learning from basic Arabic recitation to advanced Tajweed, Seerah, and comprehensive Islamic sciences.
            </p>
          </div>

          <Link
            href="/courses"
            className="mt-4 md:mt-0 bg-[#166236] text-white rounded-xl px-5 py-3 font-sans font-semibold text-xs tracking-wide hover:bg-[#114e2a] transition-all shadow-xs flex items-center space-x-2 self-start md:self-auto"
          >
            <span>View Full Course Directory</span>
            <span>→</span>
          </Link>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="rounded-3xl border border-[#e6e0d4] bg-white p-12 text-center font-sans font-medium text-xs text-gray-500 shadow-xs">
            Loading published courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-3xl border border-[#e6e0d4] bg-white p-12 text-center font-sans text-xs text-gray-500 shadow-xs">
            No courses published yet. Please check back shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {courses.map((course) => (
              <div
                key={course._id || course.id || course.code}
                className="rounded-3xl border border-[#e6e0d4] bg-white flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#166236]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Card top bar */}
                  <div className="border-b border-gray-100 bg-[#faf8f5] p-4 flex justify-between items-center text-xs">
                    <span className="text-[#14241c] font-semibold text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-gray-200">{course.code}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {course.level || "ACCREDITED"}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {course.primaryText && (
                      <div className="font-arabic text-xl font-bold text-[#166236] mb-2 text-left">
                        {course.primaryText}
                      </div>
                    )}
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">
                      {course.dept || "Islamic Studies"}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#14241c] leading-snug mb-3">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="border-t border-gray-100 bg-[#faf8f5]/60 p-5 text-xs">
                  <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium mb-3">
                    <span>Lessons: <strong className="text-[#14241c]">{course.totalLessons || 20}</strong></span>
                    <span>Duration: <strong className="text-[#14241c]">{course.duration || "N/A"}</strong></span>
                  </div>

                  <Link
                    href={`/courses/${course.code?.toLowerCase() || course.slug || course._id || course.id}`}
                    className="w-full bg-[#14241c] text-white py-2.5 px-4 font-sans font-semibold text-xs tracking-wider hover:bg-[#166236] transition-colors block text-center rounded-xl shadow-xs"
                  >
                    View Curriculum & Enroll →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}