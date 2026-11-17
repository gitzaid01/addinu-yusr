"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";
import { courseService, enrollmentService, getStoredUser } from "@/lib/api";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Authentication & Enrollment State
  const [user, setUser] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [resolvedParams.id]);

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
    if (currentUser && currentUser.role === "STUDENT") {
      checkStudentEnrollment(currentUser);
    } else {
      setCheckingEnrollment(false);
    }
  }, [course]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getCourseById(resolvedParams.id);
      setCourse(data);
    } catch (err: any) {
      setError(err.message || "Failed to load course details from database");
    } finally {
      setLoading(false);
    }
  };

  const checkStudentEnrollment = async (currentUser: any) => {
    try {
      const enrollments = await enrollmentService.getStudentEnrollments();
      if (Array.isArray(enrollments) && course) {
        const found = enrollments.some((e: any) => {
          const eCourseId = e.courseId?._id || e.courseId?.id || e.courseId;
          const targetId = course._id || course.id;
          const eCode = e.courseId?.code?.toUpperCase();
          const targetCode = course.code?.toUpperCase();
          return (eCourseId && targetId && eCourseId.toString() === targetId.toString()) || (eCode && targetCode && eCode === targetCode);
        });
        setIsEnrolled(found);
      }
    } catch (err) {
      console.error("Error checking enrollment:", err);
    } finally {
      setCheckingEnrollment(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${resolvedParams.id}`);
      return;
    }

    setEnrolling(true);
    setEnrollMsg(null);
    try {
      const courseIdToEnroll = course?._id || course?.id || resolvedParams.id;
      await enrollmentService.studentEnroll(courseIdToEnroll);
      setIsEnrolled(true);
      setEnrollMsg({
        text: "You are successfully enrolled! You can now join live classes.",
        type: "success",
      });
      // Re-fetch course to unmask meeting link if available
      fetchCourseDetails();
    } catch (err: any) {
      setEnrollMsg({
        text: err.message || "Failed to complete enrollment. Please try again.",
        type: "error",
      });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans flex flex-col">
        <TopBanner />
        <Header activeTab="COURSES" />
        <div className="p-12 text-center font-sans font-semibold text-sm">
          Loading course syllabus...
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans flex flex-col">
        <TopBanner />
        <Header activeTab="COURSES" />
        <div className="max-w-xl mx-auto my-16 p-8 border border-red-200 bg-red-50/70 rounded-3xl text-center font-sans shadow-xs">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
            ✕
          </div>
          <h2 className="font-serif font-bold text-lg text-[#14241c] mb-2">
            Course Not Found
          </h2>
          <p className="font-sans text-xs text-gray-600 mb-6 leading-relaxed">
            {error || "The requested course could not be located in the curriculum database."}
          </p>
          <Link
            href="/courses"
            className="inline-block bg-[#166236] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-[#114e2a] transition-all shadow-xs"
          >
            ← Return to Courses Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
          <span>Courses</span>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-[#14241c]">{course.code}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="bg-[#166236] text-white px-3 py-1 rounded-full shadow-xs">
            Level: {course.level}
          </span>
          <span className="bg-white border border-[#e6e0d4] text-gray-700 px-3 py-1 rounded-full">
            {course.totalLessons || 20} Lessons
          </span>
          <span className="bg-white border border-[#e6e0d4] text-gray-700 px-3 py-1 rounded-full">
            {course.duration || "30 Hours"}
          </span>
        </div>
      </div>

      {/* Main Course Header Hero */}
      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-sans text-gray-500 font-bold uppercase mb-2">
                Course Code: {course.code}
              </div>

              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#14241c] tracking-tight leading-tight mb-3">
                {course.title}
              </h1>

              {/* Arabic Text strictly left-aligned for consistency */}
              {course.primaryText && (
                <div className="font-arabic text-2xl md:text-3xl font-bold text-[#166236] mb-4 text-left">
                  {course.primaryText}
                </div>
              )}

              <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mb-6">
                {course.description}
              </p>
            </div>

            {/* Live Meeting Link Box for Enrolled Students */}
            {course.meetingLink && (
              <div className="bg-[#166236] text-white rounded-2xl p-4 font-sans font-bold text-xs shadow-xs mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span>Enrolled Live Classroom Access:</span>
                </div>
                <a
                  href={course.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-emerald-200 hover:text-white break-all"
                >
                  {course.meetingLink}
                </a>
              </div>
            )}
          </div>

          {/* Right Metrics & Enrollment Card */}
          <div className="lg:col-span-4 rounded-3xl bg-[#14241c] text-white p-6 flex flex-col justify-between shadow-xs border border-[#14241c]">
            <div>
              <div className="flex justify-between items-center font-sans text-xs border-b border-emerald-900 pb-2 mb-3">
                <span className="text-emerald-300 font-bold">Course Information</span>
                <span className="text-emerald-200/80">Status: {course.status}</span>
              </div>
              <div className="font-sans text-xs text-emerald-100/80 space-y-2.5 my-4">
                <div><strong className="text-white">Department:</strong> {course.dept || "Islamic Studies"}</div>
                <div><strong className="text-white">Format:</strong> Live Interactive Group Meet</div>
                <div><strong className="text-white">Duration:</strong> {course.duration || "30 Hours"}</div>
                <div><strong className="text-white">Total Lessons:</strong> {course.totalLessons || 20}</div>
              </div>
            </div>

            {/* Dynamic Enrollment Action State */}
            <div className="pt-4 border-t border-emerald-900/60 mt-4">
              {enrollMsg && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold mb-3 ${
                    enrollMsg.type === "success"
                      ? "bg-emerald-800 text-emerald-100 border border-emerald-600"
                      : "bg-red-900/80 text-red-100 border border-red-700"
                  }`}
                >
                  {enrollMsg.text}
                </div>
              )}

              {/* State 1: Enrolled Student */}
              {user && user.role === "STUDENT" && isEnrolled ? (
                <div className="space-y-2">
                  <div className="bg-[#166236] text-white py-2.5 px-3 rounded-xl text-center text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs">
                    <span>✓</span>
                    <span>You are Enrolled</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="w-full bg-white text-[#14241c] hover:bg-emerald-50 rounded-xl py-3 text-center font-bold text-xs uppercase transition-all shadow-xs block"
                  >
                    Go to Student Dashboard →
                  </Link>
                </div>
              ) : user && user.role === "STUDENT" ? (
                /* State 2: Logged-in Student Not Yet Enrolled */
                <button
                  type="button"
                  disabled={enrolling || checkingEnrollment}
                  onClick={handleEnroll}
                  className="w-full bg-[#166236] text-white rounded-xl py-3.5 text-center font-bold text-xs uppercase hover:bg-[#114e2a] transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {enrolling ? "Enrolling..." : "Enroll in This Course"}
                </button>
              ) : user && user.role === "ADMIN" ? (
                /* State 3: Admin User */
                <div className="space-y-2">
                  <div className="text-[11px] text-gray-400 text-center font-medium">
                    Logged in as Senior Administrator
                  </div>
                  <Link
                    href="/admin"
                    className="w-full bg-[#166236] text-white rounded-xl py-3 text-center font-bold text-xs uppercase hover:bg-[#114e2a] transition-all shadow-xs block"
                  >
                    Manage Course in Admin Console →
                  </Link>
                </div>
              ) : (
                /* State 4: Guest / Not Logged In */
                <div className="space-y-2">
                  <Link
                    href={`/login?redirect=/courses/${resolvedParams.id}`}
                    className="w-full bg-[#166236] text-white rounded-xl py-3.5 text-center font-bold text-xs uppercase hover:bg-[#114e2a] transition-all shadow-xs block"
                  >
                    Login to Enroll
                  </Link>
                  <p className="text-[10px] text-gray-400 text-center">
                    New student? Register for free to enroll in live group classes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
