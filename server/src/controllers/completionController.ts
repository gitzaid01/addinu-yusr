import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import * as completionService from "../services/completionService";

export const createCompletion = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const record = await completionService.createCompletionRecord({
      ...req.body,
      approvedBy: req.user!.userId,
    });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export const getAdminCompletions = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const records = await completionService.getAllCompletionsAdmin();
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getStudentCompletions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const records = await completionService.getStudentCompletions(studentId);
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getStudentCourseCompletion = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const record = await completionService.getStudentCourseCompletion(studentId, req.params.courseId);
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};
