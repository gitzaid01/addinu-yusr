"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";
import {
  dashboardService,
  courseService,
  enrollmentService,
  attendanceService,
  completionService,
  contentService,
  studentService,
  getStoredUser,
} from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<
    "DASHBOARD" | "COURSES" | "ENROLLMENTS" | "ATTENDANCE" | "COURSE_STUDENTS" | "COMPLETION" | "CONTENT"
  >("DASHBOARD");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Dashboard Data
  const [dashboardData, setDashboardData] = useState<any>(null);

  // Lists
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [contents, setContents] = useState<any[]>([]);
  const [completions, setCompletions] = useState<any[]>([]);

  // Selected Course Students & Attendance state
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseEnrolledStudents, setSelectedCourseEnrolledStudents] = useState<any[]>([]);
  const [selectedCourseAttendance, setSelectedCourseAttendance] = useState<any[]>([]);

  // Forms State
  // New Course Form
  const [courseForm, setCourseForm] = useState({
    title: "",
    code: "",
    dept: "Department of Qur'anic Studies",
    primaryText: "",
    description: "",
    level: "FOUNDATIONAL",
    duration: "30 Hours",
    totalLessons: 20,
    meetingLink: "",
    status: "PUBLISHED",
  });

  // Enrollment Form
  const [enrollForm, setEnrollForm] = useState({
    studentId: "",
    courseId: "",
  });

  // Attendance Form
  const [attendanceForm, setAttendanceForm] = useState({
    courseId: "",
    studentId: "",
    date: new Date().toISOString().split("T")[0],
    status: "PRESENT",
    remarks: "",
  });

  // Completion Form
  const [completionForm, setCompletionForm] = useState({
    studentId: "",
    courseId: "",
    completionPercentage: 100,
    remarks: "Passed with distinction",
  });

  // Article/Content Form
  const [contentForm, setContentForm] = useState({
    title: "",
    content: "",
    type: "HADITH",
    status: "PUBLISHED",
  });

  useEffect(() => {
    const user = getStoredUser();
    if (!user || user.role !== "ADMIN") {
      router.push("/login");
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dash, crs, stds, cnts, cmps] = await Promise.all([
        dashboardService.getAdminDashboard().catch(() => null),
        courseService.getAdminCourses().catch(() => []),
        studentService.getAdminStudents().catch(() => []),
        contentService.getAdminContent().catch(() => []),
        completionService.getAdminCompletions().catch(() => []),
      ]);

      setDashboardData(dash);
      setCourses(crs);
      setStudents(stds);
      setContents(cnts);
      setCompletions(cmps);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await courseService.createCourse(courseForm);
      setMessage({ text: "Course created successfully!", type: "success" });
      setCourseForm({
        title: "",
        code: "",
        dept: "Department of Qur'anic Studies",
        primaryText: "",
        description: "",
        level: "FOUNDATIONAL",
        duration: "30 Hours",
        totalLessons: 20,
        meetingLink: "",
        status: "PUBLISHED",
      });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to create course", type: "error" });
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseService.deleteCourse(id);
      setMessage({ text: "Course deleted successfully!", type: "success" });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to delete course", type: "error" });
    }
  };

  const handleSelectCourseForStudents = async (courseId: string) => {
    setSelectedCourseId(courseId);
    if (!courseId) {
      setSelectedCourseEnrolledStudents([]);
      setSelectedCourseAttendance([]);
      return;
    }
    try {
      const [enrolled, att] = await Promise.all([
        courseService.getCourseStudents(courseId).catch(() => []),
        attendanceService.getCourseAttendance(courseId).catch(() => []),
      ]);
      setSelectedCourseEnrolledStudents(enrolled);
      setSelectedCourseAttendance(att);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await enrollmentService.adminEnrollStudent(enrollForm.studentId, enrollForm.courseId);
      setMessage({ text: "Student enrolled successfully!", type: "success" });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to enroll student", type: "error" });
    }
  };

  const handleMarkAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await attendanceService.markAttendance(attendanceForm);
      setMessage({ text: "Attendance marked successfully!", type: "success" });
      loadData();
      if (selectedCourseId === attendanceForm.courseId) {
        handleSelectCourseForStudents(selectedCourseId);
      }
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to mark attendance", type: "error" });
    }
  };

  const handleCreateCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await completionService.createCompletion(completionForm);
      setMessage({ text: "Course completion record created successfully!", type: "success" });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to create completion record", type: "error" });
    }
  };

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contentService.createContent(contentForm);
      setMessage({ text: "Content item created successfully!", type: "success" });
      setContentForm({ title: "", content: "", type: "HADITH", status: "PUBLISHED" });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to create content", type: "error" });
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content item?")) return;
    try {
      await contentService.deleteContent(id);
      setMessage({ text: "Content item deleted successfully!", type: "success" });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to delete content", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans antialiased flex flex-col selection:bg-[#166236] selection:text-white">
      <TopBanner />
      <Header activeTab="ADMIN CONSOLE" />

      <div className="bg-[#faf8f5] border-b border-[#e6e0d4] px-4 md:px-8 py-3 flex justify-between items-center font-sans text-xs text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
          <span className="font-bold">Addinu Yusr Institute // Administrative Console</span>
        </div>
        <div className="text-[11px] text-gray-500 font-semibold">
          <span>Role: Senior Admin</span>
        </div>
      </div>

      <section className="p-6 md:p-10 lg:p-12 border-b border-[#e6e0d4] bg-[#faf8f5] max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#14241c] tracking-tight">
              Institute Management Terminal
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-600 mt-1">
              Manage courses, custom duration/lessons, student enrollments, course-specific attendance ledgers & completions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-sans text-xs">
            {(
              [
                "DASHBOARD",
                "COURSES",
                "ENROLLMENTS",
                "ATTENDANCE",
                "COURSE_STUDENTS",
                "COMPLETION",
                "CONTENT",
              ] as const
            ).map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3.5 py-2 rounded-xl font-bold uppercase transition-all shadow-xs cursor-pointer ${
                  activeSection === sec
                    ? "bg-[#166236] text-white"
                    : "bg-white text-gray-700 border border-[#e6e0d4] hover:bg-stone-50 hover:text-[#166236]"
                }`}
              >
                {sec === "COURSE_STUDENTS" ? "COURSE STUDENTS & ATTENDANCE" : sec}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-2xl border mb-6 font-sans text-xs font-bold shadow-xs ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-[#166236]"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* SECTION: DASHBOARD */}
        {activeSection === "DASHBOARD" && (
          <div className="space-y-6 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="rounded-3xl border border-[#e6e0d4] bg-white p-6 shadow-xs hover:shadow-md transition-all">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Total Students</div>
                <div className="text-4xl font-serif font-extrabold text-[#14241c] my-2">
                  {dashboardData?.stats?.totalStudents || students.length || 0}
                </div>
                <div className="text-[11px] text-gray-500 font-medium">Enrolled Candidates</div>
              </div>

              <div className="rounded-3xl border border-[#e6e0d4] bg-white p-6 shadow-xs hover:shadow-md transition-all">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Active Courses</div>
                <div className="text-4xl font-serif font-extrabold text-[#14241c] my-2">
                  {dashboardData?.stats?.activeCourses || courses.length || 0}
                </div>
                <div className="text-[11px] text-gray-500 font-medium">Published Curricula</div>
              </div>

              <div className="rounded-3xl border border-[#e6e0d4] bg-white p-6 shadow-xs hover:shadow-md transition-all">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Completed Courses</div>
                <div className="text-4xl font-serif font-extrabold text-[#14241c] my-2">
                  {dashboardData?.stats?.completedCourses || completions.length || 0}
                </div>
                <div className="text-[11px] text-gray-500 font-medium">Ijazah Granted</div>
              </div>

              <div className="rounded-3xl bg-[#166236] text-white p-6 shadow-xs hover:shadow-md transition-all">
                <div className="text-[10px] font-bold uppercase text-emerald-100">Published Content</div>
                <div className="text-4xl font-serif font-extrabold text-white my-2">
                  {dashboardData?.stats?.publishedContent || contents.length || 0}
                </div>
                <div className="text-[11px] font-bold uppercase text-emerald-100">Articles & Thoughts</div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: COURSES */}
        {activeSection === "COURSES" && (
          <div className="grid lg:grid-cols-12 gap-8 font-sans">
            {/* Form */}
            <div className="lg:col-span-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-base text-gray-900 uppercase mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                Create New Course
              </h2>
              <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">
                    Select Preset Or Enter Title
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        const title = e.target.value;
                        const code =
                          "AY-" +
                          title.substring(0, 3).toUpperCase() +
                          "-" +
                          Math.floor(100 + Math.random() * 900);
                        setCourseForm({ ...courseForm, title, code, dept: title });
                      }
                    }}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 mb-2 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 font-bold text-xs transition-all"
                  >
                    <option value="">-- Select Addinu Yusr Official Course --</option>
                    <option value="Nazrah Qur’an Classes">1. Nazrah Qur’an Classes</option>
                    <option value="Tajweed Classes">2. Tajweed Classes</option>
                    <option value="Arabic Language Course">3. Arabic Language Course</option>
                    <option value="Seerah Course">4. Seerah Course</option>
                    <option value="Taharah Course">5. Taharah Course</option>
                    <option value="Hifz Course">6. Hifz Course</option>
                    <option value="Group Classes for Qaida, Quran & Tajweed">
                      7. Group Classes for Qaida, Quran & Tajweed
                    </option>
                  </select>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="E.g. Nazrah Qur’an Classes"
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Course Code</label>
                    <input
                      type="text"
                      required
                      value={courseForm.code}
                      onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                      placeholder="AY-QUR-101"
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Department / Category</label>
                    <input
                      type="text"
                      value={courseForm.dept}
                      onChange={(e) => setCourseForm({ ...courseForm, dept: e.target.value })}
                      placeholder="Qur'anic Studies"
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Explicit Duration & Total Lessons Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Lessons Count</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={courseForm.totalLessons}
                      onChange={(e) => setCourseForm({ ...courseForm, totalLessons: Number(e.target.value) })}
                      placeholder="20"
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Duration</label>
                    <input
                      type="text"
                      required
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      placeholder="30 Hours"
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Primary Text (Arabic - Optional)</label>
                  <input
                    type="text"
                    value={courseForm.primaryText}
                    onChange={(e) => setCourseForm({ ...courseForm, primaryText: e.target.value })}
                    placeholder="القرآن الكريم"
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all font-arabic text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Course description and curriculum objectives..."
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Live Meeting Link (Secure)</label>
                  <input
                    type="text"
                    value={courseForm.meetingLink}
                    onChange={(e) => setCourseForm({ ...courseForm, meetingLink: e.target.value })}
                    placeholder="https://meet.google.com/live-room"
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Status</label>
                    <select
                      value={courseForm.status}
                      onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as any })}
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all font-bold"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Level</label>
                    <select
                      value={courseForm.level}
                      onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all font-bold"
                    >
                      <option value="FOUNDATIONAL">FOUNDATIONAL</option>
                      <option value="INTERMEDIATE">INTERMEDIATE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#166236] text-white rounded-xl py-3 font-bold text-xs uppercase shadow-xs hover:shadow-md hover:bg-[#124f2b] transition-all cursor-pointer"
                >
                  Save & Publish Course
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-base text-gray-900 uppercase mb-4 border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Existing Courses ({courses.length})</span>
                <span className="text-xs text-gray-400 font-normal">Active Directory</span>
              </h2>
              <div className="space-y-3 text-xs">
                {courses.length === 0 ? (
                  <div className="py-8 text-center text-gray-400">No courses created yet. Use the form to create your first course.</div>
                ) : (
                  courses.map((c) => (
                    <div key={c._id || c.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:shadow-xs transition-all space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-gray-900">{c.code}: {c.title}</span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full ${
                              c.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {c.status}
                          </span>
                          <button
                            onClick={() => handleDeleteCourse(c._id || c.id)}
                            className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase transition-all cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="text-[12px] text-gray-600">{c.description}</div>
                      <div className="flex space-x-3 text-[11px] font-semibold text-gray-500">
                        <span>Lessons: {c.totalLessons || 20}</span>
                        <span>•</span>
                        <span>Duration: {c.duration || "30 Hours"}</span>
                        <span>•</span>
                        <span>Level: {c.level}</span>
                      </div>
                      {c.meetingLink && (
                        <div className="text-[11px] font-semibold text-[#166236] bg-emerald-50/50 rounded-lg p-2 border border-emerald-100">
                          🔗 Meeting: <a href={c.meetingLink} target="_blank" rel="noreferrer" className="underline hover:text-emerald-900">{c.meetingLink}</a>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: ENROLLMENTS */}
        {activeSection === "ENROLLMENTS" && (
          <div className="grid lg:grid-cols-12 gap-8 font-sans">
            <div className="lg:col-span-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-base text-gray-900 uppercase mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                Enroll Student Into Course
              </h2>
              <form onSubmit={handleEnrollStudent} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Student</label>
                  <select
                    required
                    value={enrollForm.studentId}
                    onChange={(e) => setEnrollForm({ ...enrollForm, studentId: e.target.value })}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  >
                    <option value="">-- Select Student --</option>
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Course</label>
                  <select
                    required
                    value={enrollForm.courseId}
                    onChange={(e) => setEnrollForm({ ...enrollForm, courseId: e.target.value })}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.code} - {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#166236] text-white rounded-xl py-3 font-bold text-xs uppercase shadow-xs hover:shadow-md hover:bg-[#124f2b] transition-all cursor-pointer"
                >
                  Confirm Enrollment
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SECTION: ATTENDANCE */}
        {activeSection === "ATTENDANCE" && (
          <div className="grid lg:grid-cols-12 gap-8 font-sans">
            <div className="lg:col-span-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-base text-gray-900 uppercase mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                Mark Attendance Ledger
              </h2>
              <form onSubmit={handleMarkAttendance} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Course</label>
                  <select
                    required
                    value={attendanceForm.courseId}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, courseId: e.target.value })}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.code} - {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Student</label>
                  <select
                    required
                    value={attendanceForm.studentId}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, studentId: e.target.value })}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  >
                    <option value="">-- Select Student --</option>
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Date</label>
                    <input
                      type="date"
                      required
                      value={attendanceForm.date}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Status</label>
                    <select
                      value={attendanceForm.status}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
                      className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                    >
                      <option value="PRESENT">PRESENT</option>
                      <option value="ABSENT">ABSENT</option>
                      <option value="LATE">LATE</option>
                      <option value="EXCUSED">EXCUSED</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#166236] text-white rounded-xl py-3 font-bold text-xs uppercase shadow-xs hover:shadow-md hover:bg-[#124f2b] transition-all cursor-pointer"
                >
                  Save Attendance Record
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SECTION: COURSE_STUDENTS (Students & Attendance by Course) */}
        {activeSection === "COURSE_STUDENTS" && (
          <div className="space-y-6 font-sans">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-base text-gray-900 uppercase mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                Filter Students & Attendance by Course
              </h2>
              <div className="max-w-md mb-6">
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => handleSelectCourseForStudents(e.target.value)}
                  className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-3 text-xs font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                >
                  <option value="">-- Choose Course to View Enrolled Students & Attendance --</option>
                  {courses.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.code}: {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCourseId ? (
                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Enrolled Students for Selected Course */}
                  <div className="lg:col-span-6 rounded-2xl border border-gray-150 bg-gray-50/40 p-5">
                    <h3 className="font-bold text-sm text-gray-900 uppercase mb-3 border-b border-gray-200 pb-2 flex justify-between items-center">
                      <span>Enrolled Students</span>
                      <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-700">{selectedCourseEnrolledStudents.length}</span>
                    </h3>
                    {selectedCourseEnrolledStudents.length === 0 ? (
                      <div className="text-xs text-gray-500 py-4">No students enrolled in this course yet.</div>
                    ) : (
                      <div className="divide-y divide-gray-200/60 text-xs">
                        {selectedCourseEnrolledStudents.map((item: any) => (
                          <div key={item._id} className="py-2.5 flex justify-between items-center">
                            <div>
                              <div className="font-bold text-gray-900">{item.studentId?.name || "Student"}</div>
                              <div className="text-[11px] text-gray-500">{item.studentId?.email}</div>
                            </div>
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                              {item.status} ({item.progress}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Attendance Log for Selected Course */}
                  <div className="lg:col-span-6 rounded-2xl border border-gray-150 bg-gray-50/40 p-5">
                    <h3 className="font-bold text-sm text-gray-900 uppercase mb-3 border-b border-gray-200 pb-2 flex justify-between items-center">
                      <span>Attendance Logs</span>
                      <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-700">{selectedCourseAttendance.length}</span>
                    </h3>
                    {selectedCourseAttendance.length === 0 ? (
                      <div className="text-xs text-gray-500 py-4">No attendance marked for this course yet.</div>
                    ) : (
                      <div className="divide-y divide-gray-200/60 text-xs">
                        {selectedCourseAttendance.map((att: any) => (
                          <div key={att._id} className="py-2 flex justify-between items-center">
                            <div>
                              <div className="font-bold text-gray-900">{att.studentId?.name || "Student"}</div>
                              <div className="text-[11px] text-gray-500">{new Date(att.date).toLocaleDateString()}</div>
                            </div>
                            <span
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                                att.status === "PRESENT"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : att.status === "ABSENT"
                                  ? "bg-red-50 text-red-800 border border-red-200"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {att.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-gray-500 rounded-2xl border border-dashed border-gray-200">
                  Select a course from the dropdown above to inspect enrolled students & attendance.
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: COMPLETION */}
        {activeSection === "COMPLETION" && (
          <div className="grid lg:grid-cols-12 gap-8 font-sans">
            <div className="lg:col-span-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-base text-gray-900 uppercase mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                Approve Course Completion & Ijazah
              </h2>
              <form onSubmit={handleCreateCompletion} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Student</label>
                  <select
                    required
                    value={completionForm.studentId}
                    onChange={(e) => setCompletionForm({ ...completionForm, studentId: e.target.value })}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  >
                    <option value="">-- Select Student --</option>
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Course</label>
                  <select
                    required
                    value={completionForm.courseId}
                    onChange={(e) => setCompletionForm({ ...completionForm, courseId: e.target.value })}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.code} - {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Remarks</label>
                  <input
                    type="text"
                    value={completionForm.remarks}
                    onChange={(e) => setCompletionForm({ ...completionForm, remarks: e.target.value })}
                    placeholder="E.g. With distinction in Tajweed & Recitation"
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-2.5 font-medium focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#166236] text-white rounded-xl py-3 font-bold text-xs uppercase shadow-xs hover:shadow-md hover:bg-[#124f2b] transition-all cursor-pointer"
                >
                  Grant Ijazah / Completion
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SECTION: CONTENT */}
        {activeSection === "CONTENT" && (
          <div className="grid lg:grid-cols-12 gap-8 font-sans">
            <div className="lg:col-span-5 rounded-3xl border border-[#e6e0d4] bg-white p-6 shadow-xs">
              <h2 className="font-bold text-base text-[#14241c] uppercase mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                Publish Hadith, Sunnah & Reflections
              </h2>
              <form onSubmit={handleCreateContent} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Title</label>
                  <input
                    type="text"
                    required
                    value={contentForm.title}
                    onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                    placeholder="e.g. Hadith #224 — The Seeking of Knowledge"
                    className="w-full bg-[#faf8f5] border border-[#e6e0d4] rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all text-[#14241c]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Type</label>
                    <select
                      value={contentForm.type}
                      onChange={(e) => setContentForm({ ...contentForm, type: e.target.value as any })}
                      className="w-full bg-[#faf8f5] border border-[#e6e0d4] rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all text-[#14241c]"
                    >
                      <option value="HADITH">HADITH / SUNNAH</option>
                      <option value="THOUGHT">DAILY THOUGHT</option>
                      <option value="ARTICLE">ISLAMIC ARTICLE</option>
                      <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Status</label>
                    <select
                      value={contentForm.status}
                      onChange={(e) => setContentForm({ ...contentForm, status: e.target.value as any })}
                      className="w-full bg-[#faf8f5] border border-[#e6e0d4] rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all text-[#14241c]"
                    >
                      <option value="PUBLISHED">PUBLISHED (Live on Home)</option>
                      <option value="DRAFT">DRAFT (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">
                    Content (Arabic Hadith, Translation & Reflection)
                  </label>
                  <textarea
                    required
                    rows={7}
                    value={contentForm.content}
                    onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                    placeholder="Enter Arabic text, English translation, canonical reference, and commentary here..."
                    className="w-full bg-[#faf8f5] border border-[#e6e0d4] rounded-xl p-3 focus:outline-none focus:border-[#166236] focus:ring-2 focus:ring-[#166236]/20 transition-all resize-none text-[#14241c] text-xs leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#166236] text-white rounded-xl py-3 font-bold text-xs uppercase shadow-xs hover:shadow-md hover:bg-[#114e2a] transition-all cursor-pointer"
                >
                  Publish to Landing Page
                </button>
              </form>
            </div>

            {/* List of Published Content Items */}
            <div className="lg:col-span-7 rounded-3xl border border-[#e6e0d4] bg-white p-6 shadow-xs flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-4">
                <div>
                  <h2 className="font-bold text-base text-[#14241c] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
                    Published Hadith & Academy Content ({contents.length})
                  </h2>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Published items directly feed into the home page Daily Hadith & Reflection section.
                  </p>
                </div>
              </div>

              {contents.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-xs font-medium">
                  No content published yet. Publish your first Hadith or reflection using the form on the left.
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto max-h-[600px] pr-1">
                  {contents.map((item: any) => (
                    <div
                      key={item.id || item._id}
                      className="p-4 rounded-2xl border border-[#e6e0d4] bg-[#faf8f5] flex flex-col justify-between hover:border-[#166236]/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                item.type === "HADITH"
                                  ? "bg-[#166236] text-white"
                                  : item.type === "ANNOUNCEMENT"
                                  ? "bg-amber-600 text-white"
                                  : "bg-[#14241c] text-white"
                              }`}
                            >
                              {item.type}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                item.status === "PUBLISHED"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {item.status}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "Draft"}
                            </span>
                          </div>
                          <h3 className="font-serif font-bold text-sm text-[#14241c]">{item.title}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteContent(item.id || item._id)}
                          className="text-red-600 hover:text-red-800 text-[11px] font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed whitespace-pre-wrap font-sans">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
