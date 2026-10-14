import { Router } from "express";
import * as attendanceController from "../controllers/attendanceController";
import { requireAuth, requireAdmin, requireStudent } from "../middleware/auth";
import { validateBody, attendanceSchema } from "../validators";

const router = Router();

// Admin Attendance routes
router.post("/admin/attendance", requireAuth, requireAdmin, validateBody(attendanceSchema), attendanceController.markAttendance);
router.patch("/admin/attendance/:id", requireAuth, requireAdmin, attendanceController.updateAttendance);
router.get("/admin/courses/:courseId/attendance", requireAuth, requireAdmin, attendanceController.getCourseAttendance);
router.get(
  "/admin/courses/:courseId/students/:studentId/attendance",
  requireAuth,
  requireAdmin,
  attendanceController.getStudentCourseAttendanceAdmin
);

// Student Attendance routes
router.get("/student/courses/:courseId/attendance", requireAuth, requireStudent, attendanceController.getStudentCourseAttendance);
router.get("/student/attendance", requireAuth, requireStudent, attendanceController.getStudentAttendanceSummary);

export default router;
