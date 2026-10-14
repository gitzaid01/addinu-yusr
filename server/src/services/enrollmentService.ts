import { Enrollment, IEnrollment, EnrollmentStatus } from "../models/Enrollment";
import { Course } from "../models/Course";
import { User } from "../models/User";

export const enrollStudent = async (studentId: string, courseId: string) => {
  const student = await User.findById(studentId);
  if (!student || student.role !== "STUDENT") {
    const error: any = new Error("Invalid student ID");
    error.statusCode = 404;
    throw error;
  }

  const course = await Course.findById(courseId);
  if (!course) {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const existing = await Enrollment.findOne({ studentId, courseId });
  if (existing) {
    const error: any = new Error("Student is already enrolled in this course");
    error.statusCode = 409;
    throw error;
  }

  return Enrollment.create({
    studentId,
    courseId,
    status: "ACTIVE",
    progress: 0,
    enrolledAt: new Date(),
  });
};

export const getStudentEnrollments = async (studentId: string) => {
  return Enrollment.find({ studentId }).populate("courseId").sort({ createdAt: -1 });
};

export const getCourseEnrollments = async (courseId: string) => {
  return Enrollment.find({ courseId }).populate("studentId", "name email phone role").sort({ createdAt: -1 });
};

export const getAllEnrollmentsAdmin = async () => {
  return Enrollment.find()
    .populate("studentId", "name email")
    .populate("courseId", "title code")
    .sort({ createdAt: -1 });
};

export const updateEnrollmentStatus = async (
  enrollmentId: string,
  status: EnrollmentStatus,
  progress?: number
) => {
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
    const error: any = new Error("Enrollment record not found");
    error.statusCode = 404;
    throw error;
  }

  enrollment.status = status;
  if (progress !== undefined) {
    enrollment.progress = progress;
  }
  if (status === "COMPLETED") {
    enrollment.completedAt = new Date();
    enrollment.progress = 100;
  }

  await enrollment.save();
  return enrollment;
};
