import { User } from "../models/User";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { CompletionRecord } from "../models/CompletionRecord";
import { Attendance } from "../models/Attendance";
import { AdminContent } from "../models/AdminContent";
import { getStudentAttendanceSummary } from "./attendanceService";

export const getStudentDashboardData = async (studentId: string) => {
  const student = await User.findById(studentId);
  if (!student) {
    const error: any = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  const enrollments = await Enrollment.find({ studentId }).populate("courseId");

  const enrolledCount = enrollments.length;
  const completedEnrollments = enrollments.filter((e) => e.status === "COMPLETED");
  const activeEnrollments = enrollments.filter((e) => e.status === "ACTIVE");

  const attendanceSummary = await getStudentAttendanceSummary(studentId);

  const currentCourses = activeEnrollments.map((e: any) => {
    const course = e.courseId;
    return {
      enrollmentId: e._id,
      courseId: course._id,
      code: course.code,
      title: course.title,
      dept: course.dept,
      primaryText: course.primaryText,
      description: course.description,
      progress: e.progress,
      meetingLink: course.meetingLink,
      schedule: course.schedule,
    };
  });

  const completedCoursesList = completedEnrollments.map((e: any) => {
    const course = e.courseId;
    return {
      enrollmentId: e._id,
      courseId: course._id,
      code: course.code,
      title: course.title,
      completedAt: e.completedAt,
    };
  });

  const recentAttendance = await Attendance.find({ studentId })
    .populate("courseId", "title code")
    .sort({ date: -1 })
    .limit(5);

  const recentActivity = recentAttendance.map((a: any) => ({
    id: a._id,
    type: "ATTENDANCE",
    title: `Attendance marked: ${a.status} in ${a.courseId?.title || "Course"}`,
    date: a.date,
    status: a.status,
  }));

  // Simple upcoming classes based on active courses schedules
  const upcomingClasses = activeEnrollments.slice(0, 3).map((e: any) => ({
    courseTitle: e.courseId?.title,
    courseCode: e.courseId?.code,
    schedule: e.courseId?.schedule,
    meetingLink: e.courseId?.meetingLink,
  }));

  return {
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      phone: student.phone,
    },
    stats: {
      enrolledCourses: enrolledCount,
      completedCourses: completedEnrollments.length,
      activeCourses: activeEnrollments.length,
      averageAttendance: attendanceSummary.attendancePercentage,
    },
    currentCourses,
    completedCourses: completedCoursesList,
    recentActivity,
    upcomingClasses,
  };
};

export const getAdminDashboardData = async () => {
  const totalStudents = await User.countDocuments({ role: "STUDENT" });
  const activeCourses = await Course.countDocuments({ status: "PUBLISHED" });
  const completedCourses = await Enrollment.countDocuments({ status: "COMPLETED" });
  const publishedContent = await AdminContent.countDocuments({ status: "PUBLISHED" });

  const recentStudents = await User.find({ role: "STUDENT" })
    .sort({ createdAt: -1 })
    .limit(5);

  const recentEnrollments = await Enrollment.find()
    .populate("studentId", "name email")
    .populate("courseId", "title code")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentCompletions = await CompletionRecord.find()
    .populate("studentId", "name email")
    .populate("courseId", "title code")
    .sort({ completionDate: -1 })
    .limit(5);

  return {
    stats: {
      totalStudents,
      activeCourses,
      completedCourses,
      publishedContent,
    },
    recentStudents,
    recentEnrollments,
    recentCompletions,
  };
};
