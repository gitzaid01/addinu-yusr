import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import * as courseService from "../services/courseService";
import { getCourseEnrollments } from "../services/enrollmentService";

export const getPublicCourses = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const courses = await courseService.getPublicCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await courseService.getCourseByIdForUser(
      req.params.id,
      req.user?.userId,
      req.user?.role
    );
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await courseService.createCourse(req.body, req.user!.userId);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    const course = await courseService.updateCourseStatus(req.params.id, status);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

export const updateMeeting = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { meetingLink } = req.body;
    const course = await courseService.updateCourseMeeting(req.params.id, meetingLink);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

export const getAdminCourses = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const courses = await courseService.getAllCoursesAdmin();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

export const getCourseStudents = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enrollments = await getCourseEnrollments(req.params.courseId);
    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
};
