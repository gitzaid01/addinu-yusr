import { Attendance, AttendanceStatus } from "../models/Attendance";
import { Enrollment } from "../models/Enrollment";

export interface MarkAttendanceInput {
  courseId: string;
  studentId: string;
  date: string | Date;
  status: AttendanceStatus;
  markedBy: string;
  remarks?: string;
}

export const markAttendance = async (input: MarkAttendanceInput) => {
  const isEnrolled = await Enrollment.exists({
    studentId: input.studentId,
    courseId: input.courseId,
  });

  if (!isEnrolled) {
    const error: any = new Error("Student is not enrolled in this course");
    error.statusCode = 400;
    throw error;
  }

  const attendanceDate = new Date(input.date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  const existing = await Attendance.findOne({
    courseId: input.courseId,
    studentId: input.studentId,
    date: attendanceDate,
  });

  if (existing) {
    existing.status = input.status;
    existing.markedBy = input.markedBy as any;
    if (input.remarks) existing.remarks = input.remarks;
    await existing.save();
    return existing;
  }

  return Attendance.create({
    courseId: input.courseId,
    studentId: input.studentId,
    date: attendanceDate,
    status: input.status,
    markedBy: input.markedBy,
    remarks: input.remarks,
  });
};

export const updateAttendance = async (id: string, status: AttendanceStatus, remarks?: string) => {
  const record = await Attendance.findById(id);
  if (!record) {
    const error: any = new Error("Attendance record not found");
    error.statusCode = 404;
    throw error;
  }

  record.status = status;
  if (remarks !== undefined) record.remarks = remarks;
  await record.save();
  return record;
};

export const getStudentAttendanceForCourse = async (studentId: string, courseId: string) => {
  return Attendance.find({ studentId, courseId }).sort({ date: -1 });
};

export const getStudentAttendanceSummary = async (studentId: string, courseId?: string) => {
  const filter: any = { studentId };
  if (courseId) filter.courseId = courseId;

  const records = await Attendance.find(filter);
  const totalClasses = records.length;
  let present = 0;
  let absent = 0;
  let late = 0;
  let excused = 0;

  records.forEach((r) => {
    if (r.status === "PRESENT") present++;
    else if (r.status === "ABSENT") absent++;
    else if (r.status === "LATE") late++;
    else if (r.status === "EXCUSED") excused++;
  });

  // Calculate attendance percentage: (PRESENT + LATE*0.8 + EXCUSED*1.0) / totalClasses
  const effectiveCount = present + late * 0.8 + excused;
  const attendancePercentage =
    totalClasses > 0 ? Math.min(100, Math.round((effectiveCount / totalClasses) * 100)) : 100;

  return {
    totalClasses,
    present,
    absent,
    late,
    excused,
    attendancePercentage,
    records,
  };
};

export const getCourseAttendanceAdmin = async (courseId: string) => {
  return Attendance.find({ courseId })
    .populate("studentId", "name email")
    .populate("markedBy", "name")
    .sort({ date: -1 });
};
