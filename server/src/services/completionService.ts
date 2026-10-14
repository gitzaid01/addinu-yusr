import { CompletionRecord } from "../models/CompletionRecord";
import { Enrollment } from "../models/Enrollment";
import { Course } from "../models/Course";
import { User } from "../models/User";

export interface CreateCompletionInput {
  studentId: string;
  courseId: string;
  approvedBy: string;
  completionPercentage?: number;
  remarks?: string;
}

export const createCompletionRecord = async (input: CreateCompletionInput) => {
  const enrollment = await Enrollment.findOne({
    studentId: input.studentId,
    courseId: input.courseId,
  });

  if (!enrollment) {
    const error: any = new Error("Enrollment record not found for this student and course");
    error.statusCode = 404;
    throw error;
  }

  const existingRecord = await CompletionRecord.findOne({
    studentId: input.studentId,
    courseId: input.courseId,
  });

  if (existingRecord) {
    const error: any = new Error("Completion record already exists for this student and course");
    error.statusCode = 409;
    throw error;
  }

  // Generate unique certificate number e.g. IIS-2026-000123
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const certificateNumber = `IIS-${year}-${randomNum}`;

  const completionRecord = await CompletionRecord.create({
    studentId: input.studentId,
    courseId: input.courseId,
    completionDate: new Date(),
    completionPercentage: input.completionPercentage || 100,
    approvedBy: input.approvedBy,
    remarks: input.remarks,
    certificateNumber,
  });

  // Automatically update Enrollment status to COMPLETED
  enrollment.status = "COMPLETED";
  enrollment.completedAt = new Date();
  enrollment.progress = 100;
  await enrollment.save();

  return completionRecord;
};

export const getStudentCompletions = async (studentId: string) => {
  return CompletionRecord.find({ studentId })
    .populate("courseId")
    .populate("approvedBy", "name")
    .sort({ completionDate: -1 });
};

export const getStudentCourseCompletion = async (studentId: string, courseId: string) => {
  return CompletionRecord.findOne({ studentId, courseId })
    .populate("courseId")
    .populate("approvedBy", "name");
};

export const getAllCompletionsAdmin = async () => {
  return CompletionRecord.find()
    .populate("studentId", "name email")
    .populate("courseId", "title code")
    .populate("approvedBy", "name")
    .sort({ completionDate: -1 });
};
