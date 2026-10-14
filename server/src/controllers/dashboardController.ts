import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { getStudentDashboardData, getAdminDashboardData } from "../services/dashboardService";

export const getStudentDashboard = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const data = await getStudentDashboardData(studentId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getAdminDashboard = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getAdminDashboardData();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
