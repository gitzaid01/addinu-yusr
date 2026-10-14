import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import * as attendanceService from "../services/attendanceService";

export const markAttendance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const record = await attendanceService.markAttendance({
      ...req.body,
      markedBy: req.user!.userId,
    });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export const updateAttendance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, remarks } = req.body;
    const record = await attendanceService.updateAttendance(req.params.id, status, remarks);
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export const getCourseAttendance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const records = await attendanceService.getCourseAttendanceAdmin(req.params.courseId);
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getStudentCourseAttendanceAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const records = await attendanceService.getStudentAttendanceForCourse(req.params.studentId, req.params.courseId);
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getStudentCourseAttendance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const records = await attendanceService.getStudentAttendanceForCourse(studentId, req.params.courseId);
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

export const getStudentAttendanceSummary = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const summary = await attendanceService.getStudentAttendanceSummary(studentId);
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};
