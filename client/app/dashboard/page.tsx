"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";
import { dashboardService, getStoredUser } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const user = getStoredUser();
        if (!user) {
          router.push("/login");
          return;
        }
        if (user.role === "ADMIN") {
          router.push("/admin");
          return;
        }
        const res = await dashboardService.getStudentDashboard();
        setData(res);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [router]);

  const stats = data?.stats || {
    enrolledCourses: 0,
    completedCourses: 0,
    activeCourses: 0,
    averageAttendance: 100,
  };

  const studentInfo = data?.student || {
    name: "STUDENT",
    email: "",
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans antialiased flex flex-col selection:bg-[#166236] selection:text-white">
      <TopBanner />
      <Header activeTab="STUDENT DASHBOARD" />

      {/* Top Console Sub-header */}
      <div className="bg-[#faf8f5] border-b border-[#e6e0d4] px-4 md:px-8 py-3 flex flex-wrap justify-between items-center font-sans text-xs text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
          <span className="font-bold">Student Portal // Academic Profile</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-gray-500 font-medium">
          <span>Addinu Yusr Institute</span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
          <div>
            <div className="font-arabic text-xl sm:text-2xl font-bold text-[#166236] mb-1 text-left">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#14241c] tracking-tight leading-none mb-3">
              My Learning Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs font-semibold">
              <span className="bg-[#166236] text-white px-3 py-1 text-[10px] rounded-full shadow-xs">
                Student: {studentInfo.name}
              </span>
              <span className="text-gray-300">/</span>
              <span className="border border-[#e6e0d4] bg-white px-3 py-1 text-[10px] rounded-full text-gray-700">
                {studentInfo.email}
              </span>
            </div>
          </div>
        </div>

        {/* Metric Tally 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-sans">
          {/* Box 1 */}
          <div className="p-6 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-4">
              <span>01 // ENROLLMENTS</span>
              <span>📖</span>
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Enrolled Courses</div>
            <div className="text-4xl font-serif font-extrabold text-[#14241c] leading-none mb-3">
              {String(stats.enrolledCourses).padStart(2, "0")}
            </div>
            <div className="text-[10px] font-bold text-[#166236] uppercase">
              {stats.activeCourses} Active
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-6 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-4">
              <span>02 // CERTIFICATIONS</span>
              <span>📜</span>
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Completed Courses</div>
            <div className="text-4xl font-serif font-extrabold text-[#14241c] leading-none mb-3">
              {String(stats.completedCourses).padStart(2, "0")}
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase">Passed</div>
          </div>

          {/* Box 3 */}
          <div className="p-6 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-4">
              <span>03 // ATTENDANCE RATE</span>
              <span>☑</span>
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Attendance Average</div>
            <div className="text-4xl font-serif font-extrabold text-[#14241c] leading-none mb-3">
              {stats.averageAttendance}%
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase">Verified Attendance</div>
          </div>

          {/* Box 4 */}
          <div className="p-6 rounded-3xl bg-[#166236] text-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between text-[11px] font-extrabold mb-4">
              <span>04 // STATUS</span>
              <span>⚡</span>
            </div>
            <div className="text-[10px] uppercase font-bold mb-1 text-emerald-100">Enrollment Status</div>
            <div className="text-2xl font-serif font-extrabold leading-none my-3">
              {stats.enrolledCourses > 0 ? "Active Student" : "Not Enrolled"}
            </div>
            <div className="text-[10px] font-bold uppercase text-emerald-100">Addinu Yusr Institute</div>
          </div>
        </div>
      </section>

      {/* Curricular Velocity // Continue Learning Section */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center font-sans mb-6 border-b border-[#e6e0d4] pb-3">
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Active Studies</div>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#14241c] tracking-tight">
              Continue Learning // Active Tracks
            </h2>
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase hidden sm:block">
            Current: {stats.activeCourses} Courses
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          {data?.currentCourses?.length > 0 ? (
            data.currentCourses.map((c: any, idx: number) => (
              <div key={c.courseId || c.id || c._id || `course-${idx}`} className="rounded-3xl border border-[#e6e0d4] bg-white shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="bg-[#faf8f5] border-b border-gray-100 p-4 flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#14241c] font-mono">Code: {c.code}</span>
                    <span className="bg-[#166236] text-white text-[9px] px-2.5 py-0.5 rounded-full uppercase shadow-xs">In Progress</span>
                  </div>

                  <div className="p-6">
                    {c.primaryText && (
                      <div className="font-arabic text-lg font-bold text-[#166236] mb-1 text-left">
                        {c.primaryText}
                      </div>
                    )}
                    <h3 className="font-serif font-bold text-xl text-[#14241c] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {c.description}
                    </p>

                    {c.meetingLink && (
                      <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 mb-4 text-xs font-semibold text-[#166236]">
                        🔗 Live Classroom: <a href={c.meetingLink} target="_blank" rel="noreferrer" className="underline hover:text-[#114e2a]">{c.meetingLink}</a>
                      </div>
                    )}

                    <div className="space-y-1.5 mb-2">
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-gray-600">
                        <span>Progress</span>
                        <span className="text-[#166236]">{c.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#166236] h-full rounded-full transition-all duration-500" style={{ width: `${c.progress || 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 bg-[#faf8f5]/60 p-4 flex gap-3">
                  <Link
                    href={`/courses`}
                    className="flex-1 bg-[#166236] text-white rounded-xl py-3 text-center font-bold text-xs uppercase tracking-wider hover:bg-[#114e2a] shadow-xs transition-all"
                  >
                    View Syllabus →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 rounded-3xl border border-[#e6e0d4] bg-white p-10 text-center font-sans shadow-xs">
              <div className="text-sm font-bold text-[#14241c] mb-2">
                You are not currently enrolled in any courses
              </div>
              <p className="text-xs text-gray-500 mb-5">
                Explore our courses catalog to enroll in live group classes.
              </p>
              <Link
                href="/courses"
                className="inline-block bg-[#166236] text-white px-7 py-3 rounded-xl font-bold text-xs uppercase hover:bg-[#114e2a] transition-all shadow-xs"
              >
                Browse Courses Catalog
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Activity Log Section */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="space-y-4 font-sans">
          <div className="flex justify-between items-center border-b border-[#e6e0d4] pb-3">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Attendance Log</div>
              <h2 className="font-serif font-bold text-xl text-[#14241c]">
                Recent Attendance Record
              </h2>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e6e0d4] bg-white divide-y divide-gray-100 shadow-xs overflow-hidden text-xs">
            {data?.recentActivity?.length > 0 ? (
              data.recentActivity.map((act: any, idx: number) => (
                <div key={act.id || act._id || `activity-${idx}`} className="p-4 flex items-start space-x-3 hover:bg-[#faf8f5] transition-colors">
                  <div className="w-7 h-7 bg-emerald-50 text-[#166236] rounded-full flex items-center justify-center font-bold text-xs mt-0.5">
                    ★
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-bold uppercase mb-1">
                      <span>{new Date(act.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="text-[#166236] font-extrabold">{act.type}</span>
                    </div>
                    <div className="font-semibold text-[#14241c]">
                      {act.title}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs font-medium text-gray-500">
                No attendance records logged yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
