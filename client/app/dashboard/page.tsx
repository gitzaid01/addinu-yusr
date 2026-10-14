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
    <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans antialiased flex flex-col">
      <TopBanner />
      <Header activeTab="STUDENT DASHBOARD" />

      {/* Top Console Sub-header */}
      <div className="bg-[#d8ddc6] border-b-2 border-[#090c0a] px-4 md:px-8 py-2 flex flex-wrap justify-between items-center font-mono text-[11px] text-[#090c0a]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#090c0a]"></span>
          <span className="font-bold">STUDENT CONSOLE // ACADEMIC PROFILE TERMINAL</span>
        </div>
        <div className="flex items-center space-x-4 text-[10px] text-[#5a655b] font-bold">
          <span>INSTITUTE: ADDINU YUSR</span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
          <div>
            <div dir="rtl" className="font-arabic text-2xl font-bold text-[#090c0a] mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-mono font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#090c0a] uppercase tracking-tight leading-none mb-3">
              MY LEARNING // STUDENT CONSOLE
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
              <span className="bg-[#090c0a] text-white px-2 py-0.5 text-[10px]">
                STUDENT: {studentInfo.name.toUpperCase()}
              </span>
              <span>/</span>
              <span className="border border-[#090c0a] bg-white px-2 py-0.5 text-[10px]">
                {studentInfo.email}
              </span>
            </div>
          </div>
        </div>

        {/* Metric Tally 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#090c0a] border-2 border-[#090c0a] bg-[#d8ddc6] shadow-[6px_6px_0px_0px_#090c0a] font-mono">
          {/* Box 1 */}
          <div className="p-6 bg-[#d8ddc6]">
            <div className="flex justify-between text-[11px] font-bold text-[#5a655b] mb-4">
              <span>01 // REGISTRY</span>
              <span>📖</span>
            </div>
            <div className="text-[10px] text-[#5a655b] uppercase font-bold mb-1">ENROLLED COURSES</div>
            <div className="text-5xl font-extrabold text-[#090c0a] leading-none mb-3">
              {String(stats.enrolledCourses).padStart(2, "0")}
            </div>
            <div className="text-[10px] font-bold text-[#5a655b] uppercase">
              {stats.activeCourses} ACTIVE
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-6 bg-[#d8ddc6]">
            <div className="flex justify-between text-[11px] font-bold text-[#5a655b] mb-4">
              <span>02 // CERTIFICATIONS</span>
              <span>📜</span>
            </div>
            <div className="text-[10px] text-[#5a655b] uppercase font-bold mb-1">COMPLETED COURSES</div>
            <div className="text-5xl font-extrabold text-[#090c0a] leading-none mb-3">
              {String(stats.completedCourses).padStart(2, "0")}
            </div>
            <div className="text-[10px] font-bold text-[#5a655b] uppercase">PASSED</div>
          </div>

          {/* Box 3 */}
          <div className="p-6 bg-[#d8ddc6]">
            <div className="flex justify-between text-[11px] font-bold text-[#5a655b] mb-4">
              <span>03 // ATTENDANCE RATE</span>
              <span>☑</span>
            </div>
            <div className="text-[10px] text-[#5a655b] uppercase font-bold mb-1">ATTENDANCE AVERAGE</div>
            <div className="text-5xl font-extrabold text-[#090c0a] leading-none mb-3">
              {stats.averageAttendance}%
            </div>
            <div className="text-[10px] font-bold text-[#5a655b] uppercase">VERIFIED ATTENDANCE</div>
          </div>

          {/* Box 4 */}
          <div className="p-6 bg-[#c5ea31] text-[#090c0a]">
            <div className="flex justify-between text-[11px] font-extrabold mb-4">
              <span>04 // DISCIPLINE</span>
              <span>⚡</span>
            </div>
            <div className="text-[10px] uppercase font-extrabold mb-1">ENROLLMENT STATUS</div>
            <div className="text-2xl font-extrabold leading-none my-3">
              {stats.enrolledCourses > 0 ? "ACTIVE STUDENT" : "NOT ENROLLED"}
            </div>
            <div className="text-[10px] font-extrabold uppercase">ADDINU YUSR INSTITUTE</div>
          </div>
        </div>
      </section>

      {/* Curricular Velocity // Continue Learning Section */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="flex justify-between items-center font-mono mb-6 border-b-2 border-[#090c0a] pb-2">
          <div>
            <div className="text-[10px] text-[#5a655b] font-bold uppercase">MY ENROLLED COURSES</div>
            <h2 className="font-extrabold text-2xl md:text-3xl text-[#090c0a] uppercase tracking-tight">
              CONTINUE LEARNING // ACTIVE TRACKS
            </h2>
          </div>
          <div className="text-xs font-bold text-[#5a655b] uppercase hidden sm:block">
            [CURRENT ENROLLMENT: {stats.activeCourses} COURSES]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
          {data?.currentCourses?.length > 0 ? (
            data.currentCourses.map((c: any) => (
              <div key={c.courseId} className="border-2 border-[#090c0a] bg-[#d8ddc6] shadow-[6px_6px_0px_0px_#090c0a] flex flex-col justify-between">
                <div>
                  <div className="bg-[#090c0a] text-white p-3 flex justify-between items-center text-xs font-bold">
                    <span>CODE: {c.code}</span>
                    <span className="bg-[#c5ea31] text-[#090c0a] text-[9px] px-1.5 py-0.5 uppercase">IN PROGRESS</span>
                  </div>

                  <div className="p-6">
                    {c.primaryText && (
                      <div dir="rtl" className="font-arabic text-xl font-bold text-[#090c0a] mb-1">
                        {c.primaryText}
                      </div>
                    )}
                    <h3 className="font-extrabold text-xl text-[#090c0a] uppercase mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#242c26] leading-relaxed mb-4">
                      {c.description}
                    </p>

                    {c.meetingLink && (
                      <div className="bg-[#c5ea31]/30 border border-[#090c0a] p-3 mb-4 text-xs font-bold">
                        🔗 LIVE CLASSROOM: <a href={c.meetingLink} target="_blank" rel="noreferrer" className="underline text-emerald-900">{c.meetingLink}</a>
                      </div>
                    )}

                    <div className="space-y-1.5 mb-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span>PROGRESS METRIC</span>
                        <span>{c.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-[#090c0a] h-3 p-0.5">
                        <div className="bg-[#c5ea31] h-full" style={{ width: `${c.progress || 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-[#090c0a] bg-[#cdd4b9] p-4 flex gap-3">
                  <Link
                    href={`/courses`}
                    className="flex-1 bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 text-center font-extrabold text-xs uppercase tracking-wider hover:bg-[#b0d624] shadow-[2px_2px_0px_0px_#090c0a]"
                  >
                    VIEW COURSE SYLLABUS -&gt;
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 border-2 border-[#090c0a] bg-white p-8 text-center font-mono">
              <div className="text-sm font-bold text-[#090c0a] mb-2 uppercase">
                YOU ARE NOT CURRENTLY ENROLLED IN ANY COURSES
              </div>
              <p className="text-xs text-[#5a655b] mb-4">
                Please contact institute administration or explore the courses catalogue to get enrolled.
              </p>
              <Link
                href="/courses"
                className="inline-block bg-[#090c0a] text-[#c5ea31] px-6 py-3 font-bold text-xs uppercase hover:bg-[#161b17]"
              >
                BROWSE COURSES CATALOGUE
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Activity Log Section */}
      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="space-y-4 font-mono">
          <div className="flex justify-between items-center border-b-2 border-[#090c0a] pb-2">
            <div>
              <div className="text-[10px] text-[#5a655b] font-bold uppercase">ATTENDANCE LOG</div>
              <h2 className="font-extrabold text-xl text-[#090c0a] uppercase tracking-tight">
                RECENT ATTENDANCE RECORD
              </h2>
            </div>
          </div>

          <div className="border-2 border-[#090c0a] bg-white divide-y-2 divide-[#090c0a] shadow-[4px_4px_0px_0px_#090c0a] text-xs">
            {data?.recentActivity?.length > 0 ? (
              data.recentActivity.map((act: any) => (
                <div key={act.id} className="p-4 flex items-start space-x-3 bg-[#e4e9d3]">
                  <div className="w-6 h-6 bg-[#090c0a] text-[#c5ea31] flex items-center justify-center font-bold text-xs mt-0.5">
                    ★
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-[10px] text-[#5a655b] font-bold uppercase mb-1">
                      <span>{new Date(act.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="text-emerald-800 font-extrabold">{act.type}</span>
                    </div>
                    <div className="font-extrabold text-[#090c0a] uppercase">
                      {act.title}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs font-bold text-[#5a655b]">
                NO ATTENDANCE RECORDS LOGGED YET.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
