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
    <section className="bg-[#d8ddc6] p-4 md:p-8 border-b-2 border-[#090c0a]">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#090c0a]">
        <div>
          <div className="flex items-center space-x-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#5a655b] mb-1">
            <span className="bg-[#090c0a] text-white px-1 py-0.5 text-[9px]">ADDINU YUSR INSTITUTE</span>
            <span>AVAILABLE COURSES</span>
          </div>
          <h2 className="font-mono font-extrabold text-3xl md:text-4xl text-[#090c0a] uppercase tracking-tight">
            INSTITUTIONAL COURSES & CURRICULUM
          </h2>
        </div>

        <Link
          href="/courses"
          className="mt-4 md:mt-0 bg-[#090c0a] text-[#c5ea31] border border-[#090c0a] px-4 py-2 font-mono font-bold text-xs uppercase hover:bg-[#161b17]"
        >
          VIEW ALL COURSES IN CATALOGUE -&gt;
        </Link>
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div className="border-2 border-[#090c0a] bg-white p-8 text-center font-mono font-bold text-xs">
          ⏳ LOADING PUBLISHED COURSES...
        </div>
      ) : courses.length === 0 ? (
        <div className="border-2 border-[#090c0a] bg-white p-8 text-center font-mono text-xs font-bold text-[#5a655b]">
          NO COURSES PUBLISHED BY ADMIN YET.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {courses.map((course) => (
            <div
              key={course._id || course.id || course.code}
              className="border-2 border-[#090c0a] bg-[#d8ddc6] flex flex-col justify-between shadow-[6px_6px_0px_0px_#090c0a]"
            >
              <div>
                {/* Card top bar */}
                <div className="border-b-2 border-[#090c0a] bg-[#cdd4b9] p-3 flex justify-between items-center text-xs font-bold">
                  <span className="text-[#090c0a]">{course.code}</span>
                  <span className="text-[10px] px-2 py-0.5 border border-[#090c0a] font-bold bg-[#c5ea31] text-[#090c0a]">
                    {course.level || "ACCREDITED"}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {course.primaryText && (
                    <div dir="rtl" className="font-arabic text-xl font-bold text-[#090c0a] mb-1">
                      {course.primaryText}
                    </div>
                  )}
                  <div className="text-[10px] text-[#5a655b] font-bold uppercase mb-1">
                    {course.dept || "DEPARTMENT OF ISLAMIC SCIENCES"}
                  </div>
                  <h3 className="font-extrabold text-lg text-[#090c0a] uppercase leading-tight mb-3">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#242c26] leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t-2 border-[#090c0a] bg-[#cdd4b9] p-4 text-xs">
                <div className="flex justify-between items-center text-[10px] text-[#5a655b] font-bold uppercase mb-3">
                  <span>LESSONS: {course.totalLessons || 20}</span>
                  <span>DURATION: {course.duration || "N/A"}</span>
                </div>

                <Link
                  href="/courses"
                  className="w-full bg-[#090c0a] text-white py-2 px-3 text-center block font-bold text-xs uppercase hover:bg-[#c5ea31] hover:text-[#090c0a] transition-colors border border-[#090c0a]"
                >
                  VIEW IN CATALOGUE
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}