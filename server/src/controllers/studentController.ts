import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { User } from "../models/User";
import { getStudentEnrollments } from "../services/enrollmentService";
import { getStudentAttendanceSummary } from "../services/attendanceService";
import { getStudentCompletions } from "../services/completionService";

export const getStudentProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user!.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User profile not found" });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateStudentProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user!.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User profile not found" });
      return;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getAdminStudents = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const students = await User.find({ role: "STUDENT" }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

export const getAdminStudentById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "STUDENT" });
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }

    const courses = await getStudentEnrollments(student._id.toString());
    const attendance = await getStudentAttendanceSummary(student._id.toString());
    const completions = await getStudentCompletions(student._id.toString());

    res.status(200).json({
      success: true,
      data: {
        student,
        courses,
        attendance,
        completions,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminStudentCourses = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const courses = await getStudentEnrollments(req.params.id);
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

export const getAdminStudentAttendance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const attendance = await getStudentAttendanceSummary(req.params.id);
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

export const getAdminStudentCompletions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const completions = await getStudentCompletions(req.params.id);
    res.status(200).json({ success: true, data: completions });
  } catch (error) {
    next(error);
  }
};
