import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          errors[path] = err.message;
        });

        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
        return;
      }
      next(error);
    }
  };
};

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "STUDENT"]).optional().default("STUDENT"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  code: z.string().min(2, "Code is required"),
  dept: z.string().optional(),
  deptBadge: z.string().optional(),
  primaryText: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().optional().default("General"),
  level: z.string().optional().default("FOUNDATIONAL"),
  duration: z.string().optional().default("30 Hours"),
  totalLessons: z.number().optional().default(20),
  meetingLink: z.string().url("Invalid meeting URL").optional().or(z.literal("")),
  schedule: z
    .object({
      days: z.array(z.string()).optional().default([]),
      startTime: z.string().optional().default("19:00"),
      endTime: z.string().optional().default("20:30"),
      timezone: z.string().optional().default("Asia/Kolkata"),
    })
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional().default("DRAFT"),
});

export const enrollmentSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
});

export const attendanceSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
  remarks: z.string().optional(),
});

export const completionSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  completionPercentage: z.number().min(0).max(100).optional().default(100),
  remarks: z.string().optional(),
});

export const contentSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  type: z.enum(["ARTICLE", "THOUGHT", "ANNOUNCEMENT"]),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("DRAFT"),
});
