import { Router } from "express";
import * as studentController from "../controllers/studentController";
import { requireAuth, requireAdmin, requireStudent } from "../middleware/auth";

const router = Router();

// Student Profile routes
router.get("/student/profile", requireAuth, requireStudent, studentController.getStudentProfile);
router.patch("/student/profile", requireAuth, requireStudent, studentController.updateStudentProfile);

// Admin Student Management routes
router.get("/admin/students", requireAuth, requireAdmin, studentController.getAdminStudents);
router.get("/admin/students/:id", requireAuth, requireAdmin, studentController.getAdminStudentById);
router.get("/admin/students/:id/courses", requireAuth, requireAdmin, studentController.getAdminStudentCourses);
router.get("/admin/students/:id/attendance", requireAuth, requireAdmin, studentController.getAdminStudentAttendance);
router.get("/admin/students/:id/completions", requireAuth, requireAdmin, studentController.getAdminStudentCompletions);

export default router;
