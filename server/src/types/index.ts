import { Request } from "express";

export type UserRole = "ADMIN" | "STUDENT";

export interface AuthPayload {
  userId: string;
  role: UserRole;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}
