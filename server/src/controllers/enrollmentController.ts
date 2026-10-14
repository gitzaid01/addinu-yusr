import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import * as enrollmentService from "../services/enrollmentService";

export const adminEnrollStudent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = await enrollmentService.enrollStudent(studentId, courseId);
    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
};

export const getAdminEnrollments = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enrollments = await enrollmentService.getAllEnrollmentsAdmin();
    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
};

export const updateEnrollment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, progress } = req.body;
    const enrollment = await enrollmentService.updateEnrollmentStatus(req.params.id, status, progress);
    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
};

export const getStudentEnrollments = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const enrollments = await enrollmentService.getStudentEnrollments(studentId);
    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
};

export const getStudentEnrollmentById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const enrollments = await enrollmentService.getStudentEnrollments(studentId);
    const item = enrollments.find((e: any) => e._id.toString() === req.params.id || e.courseId?._id?.toString() === req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: "Enrollment not found" });
      return;
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};
