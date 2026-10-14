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
    type: "ARTICLE",
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
      setContentForm({ title: "", content: "", type: "ARTICLE", status: "PUBLISHED" });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to create content", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans antialiased flex flex-col">
      <TopBanner />
      <Header activeTab="ADMIN CONSOLE" />

      <div className="bg-[#d8ddc6] border-b-2 border-[#090c0a] px-4 md:px-8 py-2 flex justify-between items-center font-mono text-[11px] text-[#090c0a]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-red-600"></span>
          <span className="font-bold">ADDINU YUSR INSTITUTE // ADMINISTRATIVE CONSOLE</span>
        </div>
        <div className="text-[10px] text-[#5a655b] font-bold">
          <span>ROLE: SENIOR ADMIN</span>
        </div>
      </div>

      <section className="p-4 md:p-8 border-b-2 border-[#090c0a] bg-[#d8ddc6]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="font-mono font-extrabold text-3xl sm:text-4xl text-[#090c0a] uppercase tracking-tight">
              INSTITUTE MANAGEMENT TERMINAL
            </h1>
            <p className="font-mono text-xs text-[#5a655b] mt-1">
              Manage courses, custom duration/lessons, student enrollments, course-specific attendance ledgers & completions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
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
                className={`px-3 py-2 border-2 border-[#090c0a] font-bold uppercase transition-all shadow-[2px_2px_0px_0px_#090c0a] ${
                  activeSection === sec
                    ? "bg-[#090c0a] text-[#c5ea31]"
                    : "bg-white text-[#090c0a] hover:bg-[#c5ea31]"
                }`}
              >
                {sec === "COURSE_STUDENTS" ? "COURSE STUDENTS & ATTENDANCE" : sec}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`p-4 border-2 border-[#090c0a] mb-6 font-mono text-xs font-bold ${
              message.type === "success" ? "bg-[#c5ea31] text-[#090c0a]" : "bg-red-200 text-red-900"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* SECTION: DASHBOARD */}
        {activeSection === "DASHBOARD" && (
          <div className="space-y-6 font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
                <div className="text-[10px] text-[#5a655b] font-bold uppercase">TOTAL STUDENTS</div>
                <div className="text-4xl font-extrabold text-[#090c0a] my-2">
                  {dashboardData?.stats?.totalStudents || students.length || 0}
                </div>
                <div className="text-[10px] text-[#5a655b] font-bold">ENROLLED CANDIDATES</div>
              </div>

              <div className="border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
                <div className="text-[10px] text-[#5a655b] font-bold uppercase">ACTIVE COURSES</div>
                <div className="text-4xl font-extrabold text-[#090c0a] my-2">
                  {dashboardData?.stats?.activeCourses || courses.length || 0}
                </div>
                <div className="text-[10px] text-[#5a655b] font-bold">PUBLISHED CURRICULA</div>
              </div>

              <div className="border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
                <div className="text-[10px] text-[#5a655b] font-bold uppercase">COMPLETED COURSES</div>
                <div className="text-4xl font-extrabold text-[#090c0a] my-2">
                  {dashboardData?.stats?.completedCourses || completions.length || 0}
                </div>
                <div className="text-[10px] text-[#5a655b] font-bold">IJAZAH GRANTED</div>
              </div>

              <div className="border-2 border-[#090c0a] bg-[#c5ea31] p-5 shadow-[4px_4px_0px_0px_#090c0a]">
                <div className="text-[10px] font-bold uppercase text-[#090c0a]">PUBLISHED CONTENT</div>
                <div className="text-4xl font-extrabold text-[#090c0a] my-2">
                  {dashboardData?.stats?.publishedContent || contents.length || 0}
                </div>
                <div className="text-[10px] font-bold uppercase text-[#090c0a]">ARTICLES & THOUGHTS</div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: COURSES */}
        {activeSection === "COURSES" && (
          <div className="grid lg:grid-cols-12 gap-8 font-mono">
            {/* Form */}
            <div className="lg:col-span-5 border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
              <h2 className="font-extrabold text-lg text-[#090c0a] uppercase mb-4 border-b-2 border-[#090c0a] pb-2">
                + CREATE NEW COURSE
              </h2>
              <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">
                    SELECT PRESET OR ENTER TITLE
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
                    className="w-full bg-white border border-[#090c0a] p-2 mb-2 focus:outline-none font-bold text-xs"
                  >
                    <option value="">-- Select Addinu Yusr Official Course --</option>
                    <option value="Nazrah Qur’an Classes">1. Nazrah Qur’an Classes</option>
                    <option value="Tajweed Classes">2. Tajweed Classes</option>
                    <option value="Arabic Language Course">3. Arabic Language Course</option>
                    <option value="Seerah Course">4. Seerah Course</option>
                    <option value="Taharah Course">5. Taharah Course</option>
                    <option value="Hifz Course">6. Hifz Course</option>
                    <option value="Personal Classes for Qaida, Quran & Tajweed">
                      7. Personal Classes for Qaida, Quran & Tajweed
                    </option>
                  </select>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="E.g. Nazrah Qur’an Classes"
                    className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none focus:ring-1 focus:ring-[#c5ea31]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">COURSE CODE</label>
                    <input
                      type="text"
                      required
                      value={courseForm.code}
                      onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                      placeholder="AY-QUR-101"
                      className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">DEPARTMENT / CATEGORY</label>
                    <input
                      type="text"
                      value={courseForm.dept}
                      onChange={(e) => setCourseForm({ ...courseForm, dept: e.target.value })}
                      placeholder="Qur'anic Studies"
                      className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Explicit Duration & Total Lessons Inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">LESSONS COUNT</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={courseForm.totalLessons}
                      onChange={(e) => setCourseForm({ ...courseForm, totalLessons: Number(e.target.value) })}
                      placeholder="20"
                      className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">DURATION (E.G. 30 HOURS / 2 MONTHS)</label>
                    <input
                      type="text"
                      required
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      placeholder="30 Hours"
                      className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">PRIMARY TEXT (ARABIC - OPTIONAL)</label>
                  <input
                    type="text"
                    value={courseForm.primaryText}
                    onChange={(e) => setCourseForm({ ...courseForm, primaryText: e.target.value })}
                    placeholder="القرآن الكريم"
                    className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none font-arabic text-right"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">DESCRIPTION</label>
                  <textarea
                    required
                    rows={3}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Course description and curriculum objectives..."
                    className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">LIVE MEETING LINK (SECURE)</label>
                  <input
                    type="text"
                    value={courseForm.meetingLink}
                    onChange={(e) => setCourseForm({ ...courseForm, meetingLink: e.target.value })}
                    placeholder="https://meet.google.com/live-room"
                    className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">STATUS</label>
                    <select
                      value={courseForm.status}
                      onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as any })}
                      className="w-full bg-white border border-[#090c0a] p-2 focus:outline-none font-bold"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">LEVEL</label>
                    <select
                      value={courseForm.level}
                      onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                      className="w-full bg-white border border-[#090c0a] p-2 focus:outline-none font-bold"
                    >
                      <option value="FOUNDATIONAL">FOUNDATIONAL</option>
                      <option value="INTERMEDIATE">INTERMEDIATE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#090c0a] hover:bg-[#b0d624]"
                >
                  SAVE & PUBLISH COURSE
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
              <h2 className="font-extrabold text-lg text-[#090c0a] uppercase mb-4 border-b-2 border-[#090c0a] pb-2">
                EXISTING COURSES ({courses.length})
              </h2>
              <div className="divide-y-2 divide-[#090c0a] text-xs">
                {courses.length === 0 ? (
                  <div className="py-4 text-[#5a655b]">No courses created yet. Use the form to create your first course.</div>
                ) : (
                  courses.map((c) => (
                    <div key={c._id || c.id} className="py-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-sm">{c.code}: {c.title}</span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold border border-[#090c0a] ${
                              c.status === "PUBLISHED" ? "bg-[#c5ea31] text-[#090c0a]" : "bg-gray-200"
                            }`}
                          >
                            {c.status}
                          </span>
                          <button
                            onClick={() => handleDeleteCourse(c._id || c.id)}
                            className="bg-red-800 text-white px-2 py-0.5 text-[9px] font-bold uppercase hover:bg-red-900 border border-[#090c0a]"
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#5a655b]">{c.description}</div>
                      <div className="flex space-x-4 text-[10px] font-bold text-[#090c0a]">
                        <span>LESSONS: {c.totalLessons || 20}</span>
                        <span>•</span>
                        <span>DURATION: {c.duration || "30 Hours"}</span>
                        <span>•</span>
                        <span>LEVEL: {c.level}</span>
                      </div>
                      {c.meetingLink && (
                        <div className="text-[10px] font-bold text-emerald-800">
                          🔗 Meeting: {c.meetingLink}
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
          <div className="grid lg:grid-cols-12 gap-8 font-mono">
            <div className="lg:col-span-5 border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
              <h2 className="font-extrabold text-lg text-[#090c0a] uppercase mb-4 border-b-2 border-[#090c0a] pb-2">
                + ENROLL STUDENT INTO COURSE
              </h2>
              <form onSubmit={handleEnrollStudent} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">SELECT STUDENT</label>
                  <select
                    required
                    value={enrollForm.studentId}
                    onChange={(e) => setEnrollForm({ ...enrollForm, studentId: e.target.value })}
                    className="w-full bg-white border border-[#090c0a] p-2.5 font-bold focus:outline-none"
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
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">SELECT COURSE</label>
                  <select
                    required
                    value={enrollForm.courseId}
                    onChange={(e) => setEnrollForm({ ...enrollForm, courseId: e.target.value })}
                    className="w-full bg-white border border-[#090c0a] p-2.5 font-bold focus:outline-none"
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
                  className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#090c0a] hover:bg-[#b0d624]"
                >
                  CONFIRM ENROLLMENT
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SECTION: ATTENDANCE */}
        {activeSection === "ATTENDANCE" && (
          <div className="grid lg:grid-cols-12 gap-8 font-mono">
            <div className="lg:col-span-5 border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
              <h2 className="font-extrabold text-lg text-[#090c0a] uppercase mb-4 border-b-2 border-[#090c0a] pb-2">
                MARK ATTENDANCE LEDGER
              </h2>
              <form onSubmit={handleMarkAttendance} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">SELECT COURSE</label>
                  <select
                    required
                    value={attendanceForm.courseId}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, courseId: e.target.value })}
                    className="w-full bg-white border border-[#090c0a] p-2.5 font-bold focus:outline-none"
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
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">SELECT STUDENT</label>
                  <select
                    required
                    value={attendanceForm.studentId}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, studentId: e.target.value })}
                    className="w-full bg-white border border-[#090c0a] p-2.5 font-bold focus:outline-none"
                  >
                    <option value="">-- Select Student --</option>
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">DATE</label>
                    <input
                      type="date"
                      required
                      value={attendanceForm.date}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                      className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">STATUS</label>
                    <select
                      value={attendanceForm.status}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
                      className="w-full bg-white border border-[#090c0a] p-2 font-bold"
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
                  className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#090c0a] hover:bg-[#b0d624]"
                >
                  SAVE ATTENDANCE RECORD
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SECTION: COURSE_STUDENTS (Students & Attendance by Course) */}
        {activeSection === "COURSE_STUDENTS" && (
          <div className="space-y-6 font-mono">
            <div className="border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
              <h2 className="font-extrabold text-lg text-[#090c0a] uppercase mb-3 border-b-2 border-[#090c0a] pb-2">
                FILTER STUDENTS & ATTENDANCE BY PARTICULAR COURSE
              </h2>
              <div className="max-w-md mb-6">
                <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">SELECT COURSE</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => handleSelectCourseForStudents(e.target.value)}
                  className="w-full bg-white border-2 border-[#090c0a] p-3 text-xs font-extrabold focus:outline-none"
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
                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Enrolled Students for Selected Course */}
                  <div className="lg:col-span-6 border-2 border-[#090c0a] bg-[#f9faf7] p-4">
                    <h3 className="font-extrabold text-sm text-[#090c0a] uppercase mb-3 border-b border-[#090c0a] pb-1">
                      ENROLLED STUDENTS ({selectedCourseEnrolledStudents.length})
                    </h3>
                    {selectedCourseEnrolledStudents.length === 0 ? (
                      <div className="text-xs text-[#5a655b]">No students enrolled in this course yet.</div>
                    ) : (
                      <div className="divide-y divide-[#090c0a] text-xs">
                        {selectedCourseEnrolledStudents.map((item: any) => (
                          <div key={item._id} className="py-2.5 flex justify-between items-center">
                            <div>
                              <div className="font-bold">{item.studentId?.name || "Student"}</div>
                              <div className="text-[10px] text-[#5a655b]">{item.studentId?.email}</div>
                            </div>
                            <span className="bg-[#c5ea31] text-[#090c0a] border border-[#090c0a] text-[9px] font-extrabold px-2 py-0.5">
                              STATUS: {item.status} ({item.progress}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Attendance Log for Selected Course */}
                  <div className="lg:col-span-6 border-2 border-[#090c0a] bg-[#f9faf7] p-4">
                    <h3 className="font-extrabold text-sm text-[#090c0a] uppercase mb-3 border-b border-[#090c0a] pb-1">
                      ATTENDANCE LOGS ({selectedCourseAttendance.length})
                    </h3>
                    {selectedCourseAttendance.length === 0 ? (
                      <div className="text-xs text-[#5a655b]">No attendance marked for this course yet.</div>
                    ) : (
                      <div className="divide-y divide-[#090c0a] text-xs">
                        {selectedCourseAttendance.map((att: any) => (
                          <div key={att._id} className="py-2 flex justify-between items-center">
                            <div>
                              <div className="font-bold">{att.studentId?.name || "Student"}</div>
                              <div className="text-[10px] text-[#5a655b]">{new Date(att.date).toLocaleDateString()}</div>
                            </div>
                            <span
                              className={`px-2 py-0.5 text-[9px] font-bold border border-[#090c0a] ${
                                att.status === "PRESENT"
                                  ? "bg-[#c5ea31] text-[#090c0a]"
                                  : att.status === "ABSENT"
                                  ? "bg-red-200 text-red-900"
                                  : "bg-gray-200"
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
                <div className="p-8 text-center text-xs text-[#5a655b] border border-dashed border-[#090c0a]">
                  👈 Please select a course from the dropdown above to inspect enrolled students & attendance.
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: COMPLETION */}
        {activeSection === "COMPLETION" && (
          <div className="grid lg:grid-cols-12 gap-8 font-mono">
            <div className="lg:col-span-5 border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
              <h2 className="font-extrabold text-lg text-[#090c0a] uppercase mb-4 border-b-2 border-[#090c0a] pb-2">
                APPROVE COURSE COMPLETION & IJAZAH
              </h2>
              <form onSubmit={handleCreateCompletion} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">SELECT STUDENT</label>
                  <select
                    required
                    value={completionForm.studentId}
                    onChange={(e) => setCompletionForm({ ...completionForm, studentId: e.target.value })}
                    className="w-full bg-white border border-[#090c0a] p-2.5 font-bold focus:outline-none"
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
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">SELECT COURSE</label>
                  <select
                    required
                    value={completionForm.courseId}
                    onChange={(e) => setCompletionForm({ ...completionForm, courseId: e.target.value })}
                    className="w-full bg-white border border-[#090c0a] p-2.5 font-bold focus:outline-none"
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
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">REMARKS</label>
                  <input
                    type="text"
                    value={completionForm.remarks}
                    onChange={(e) => setCompletionForm({ ...completionForm, remarks: e.target.value })}
                    className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#090c0a] hover:bg-[#b0d624]"
                >
                  GRANT IJAZAH / COMPLETION
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SECTION: CONTENT */}
        {activeSection === "CONTENT" && (
          <div className="grid lg:grid-cols-12 gap-8 font-mono">
            <div className="lg:col-span-5 border-2 border-[#090c0a] bg-white p-5 shadow-[4px_4px_0px_0px_#090c0a]">
              <h2 className="font-extrabold text-lg text-[#090c0a] uppercase mb-4 border-b-2 border-[#090c0a] pb-2">
                WRITE ISLAMIC ARTICLE / THOUGHT
              </h2>
              <form onSubmit={handleCreateContent} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">TITLE</label>
                  <input
                    type="text"
                    required
                    value={contentForm.title}
                    onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                    placeholder="Article or Thought Title..."
                    className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">TYPE</label>
                    <select
                      value={contentForm.type}
                      onChange={(e) => setContentForm({ ...contentForm, type: e.target.value as any })}
                      className="w-full bg-white border border-[#090c0a] p-2 font-bold"
                    >
                      <option value="ARTICLE">ARTICLE</option>
                      <option value="THOUGHT">THOUGHT</option>
                      <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">STATUS</label>
                    <select
                      value={contentForm.status}
                      onChange={(e) => setContentForm({ ...contentForm, status: e.target.value as any })}
                      className="w-full bg-white border border-[#090c0a] p-2 font-bold"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="PUBLISHED">PUBLISHED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#5a655b] uppercase mb-1">CONTENT</label>
                  <textarea
                    required
                    rows={5}
                    value={contentForm.content}
                    onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                    placeholder="Write article text..."
                    className="w-full bg-[#f9faf7] border border-[#090c0a] p-2 font-mono"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c5ea31] text-[#090c0a] border-2 border-[#090c0a] py-3 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#090c0a] hover:bg-[#b0d624]"
                >
                  PUBLISH ARTICLE / THOUGHT
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
