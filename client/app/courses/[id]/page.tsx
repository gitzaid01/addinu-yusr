"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";
import { courseService } from "@/lib/api";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [resolvedParams.id]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getCourseById(resolvedParams.id);
      setCourse(data);
    } catch (err: any) {
      setError(err.message || "Failed to load course details from MongoDB");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans flex flex-col">
        <TopBanner />
        <Header activeTab="COURSES" />
        <div className="p-12 text-center font-mono font-bold text-sm">
          ⏳ RETRIEVING ACCREDITED SYLLABUS FROM MONGODB...
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans flex flex-col">
        <TopBanner />
        <Header activeTab="COURSES" />
        <div className="p-12 border-2 border-red-800 bg-red-100 m-8 text-center font-mono font-bold text-xs text-red-900">
          ⚠️ {error || "Course record not found in MongoDB."}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans antialiased flex flex-col">
      <TopBanner />
      <Header activeTab="COURSES" />

      {/* Breadcrumb Bar */}
      <div className="bg-[#d8ddc6] border-b-2 border-[#090c0a] px-4 md:px-8 py-2 flex flex-wrap justify-between items-center font-mono text-[11px] text-[#090c0a]">
        <div className="flex items-center space-x-2">
          <Link href="/courses" className="hover:underline font-bold">
            ADDINU YUSR
          </Link>
          <span>/</span>
          <span>FACULTY OF ISLAMIC SCIENCES</span>
          <span>/</span>
          <span className="font-bold border-b border-[#090c0a]">{course.code}</span>
          <span>/</span>
          <span>CURRICULUM SYLLABUS</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold">
          <span className="bg-[#090c0a] text-white px-2 py-0.5">
            [ LEVEL: {course.level} ]
          </span>
          <span className="bg-white border border-[#090c0a] px-2 py-0.5">
            [ {course.totalLessons || 20} LESSONS ]
          </span>
          <span className="bg-white border border-[#090c0a] px-2 py-0.5">
            [ {course.duration || "30 Hours"} ]
          </span>
        </div>
      </div>

      {/* Main Course Header Hero */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#5a655b] font-bold uppercase mb-2">
                ■ CANONICAL CORPUS REFERENCE: {course.code}
              </div>

              <h1 className="font-mono font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#090c0a] uppercase tracking-tight leading-none mb-3">
                {course.code}: {course.title}
              </h1>

              {course.primaryText && (
                <div dir="rtl" className="font-arabic text-3xl md:text-4xl font-bold text-[#090c0a] mb-4">
                  {course.primaryText}
                </div>
              )}

              <p className="font-mono text-sm md:text-base text-[#1a231b] leading-relaxed max-w-3xl mb-6">
                {course.description}
              </p>
            </div>

            {course.meetingLink && (
              <div className="bg-[#c5ea31] border-2 border-[#090c0a] p-4 font-mono font-bold text-xs shadow-[3px_3px_0px_0px_#090c0a]">
                🔒 ENROLLED LIVE CLASSROOM: <a href={course.meetingLink} target="_blank" rel="noreferrer" className="underline text-emerald-950">{course.meetingLink}</a>
              </div>
            )}
          </div>

          {/* Right Topology Wireframe Card */}
          <div className="lg:col-span-4 border-2 border-[#090c0a] bg-[#090c0a] text-white p-5 flex flex-col justify-between shadow-[6px_6px_0px_0px_#090c0a]">
            <div>
              <div className="flex justify-between items-center font-mono text-[10px] border-b border-[#242c26] pb-2 mb-3">
                <span className="text-[#c5ea31] font-bold">MONGODB RECORD MATRICES</span>
                <span className="text-[#9baa90]">STATUS: {course.status}</span>
              </div>
              <div className="font-mono text-xs text-[#d8ddc6] space-y-2 my-4">
                <div><strong>DEPARTMENT:</strong> {course.dept || "Islamic Studies"}</div>
                <div><strong>CATEGORY:</strong> {course.category || "General"}</div>
                <div><strong>CREATED AT:</strong> {new Date(course.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
