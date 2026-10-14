import { Course, ICourse, CourseStatus } from "../models/Course";
import { Enrollment } from "../models/Enrollment";

export const createCourse = async (data: Partial<ICourse>, adminId: string) => {
  const slug =
    data.slug ||
    data.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") ||
    `course-${Date.now()}`;

  const existingCode = await Course.findOne({ code: data.code });
  if (existingCode) {
    const error: any = new Error("Course code already exists");
    error.statusCode = 409;
    throw error;
  }

  return Course.create({
    ...data,
    slug,
    createdBy: adminId,
  });
};

export const updateCourse = async (id: string, updates: Partial<ICourse>) => {
  const course = await Course.findById(id);
  if (!course) {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  if (updates.title && !updates.slug) {
    updates.slug = updates.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  Object.assign(course, updates);
  await course.save();
  return course;
};

export const updateCourseStatus = async (id: string, status: CourseStatus) => {
  return updateCourse(id, { status });
};

export const updateCourseMeeting = async (id: string, meetingLink: string) => {
  return updateCourse(id, { meetingLink });
};

export const archiveCourse = async (id: string) => {
  return updateCourseStatus(id, "ARCHIVED");
};

export const deleteCourse = async (id: string) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }
  return true;
};

export const getPublicCourses = async () => {
  const courses = await Course.find({ status: "PUBLISHED" }).sort({ createdAt: -1 });
  return courses.map((c) => {
    const obj = c.toJSON();
    delete obj.meetingLink;
    return obj;
  });
};

export const getCourseByIdForUser = async (courseId: string, userId?: string, role?: string) => {
  let course = await Course.findById(courseId);
  if (!course) {
    course = await Course.findOne({ code: courseId.toUpperCase() });
  }

  if (!course) {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  if (role === "ADMIN") {
    return course;
  }

  if (course.status === "DRAFT") {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const obj = course.toJSON();

  if (userId) {
    const isEnrolled = await Enrollment.exists({ studentId: userId, courseId: course._id });
    if (isEnrolled) {
      return obj;
    }
  }

  delete obj.meetingLink;
  return obj;
};

export const getAllCoursesAdmin = async () => {
  return Course.find({ status: { $ne: "ARCHIVED" } }).sort({ createdAt: -1 });
};
