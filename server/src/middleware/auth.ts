import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, AuthPayload } from "../types";

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication token missing or invalid",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "tawtheeq_jwt_super_secret_key_1446_ah";

  try {
    const decoded = jwt.verify(token, secret) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
    return;
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
    return;
  }
  next();
};

export const requireStudent = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "STUDENT") {
    res.status(403).json({
      success: false,
      message: "Access denied. Student role required.",
    });
    return;
  }
  next();
};
