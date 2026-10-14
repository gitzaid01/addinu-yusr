import { Router } from "express";
import * as enrollmentController from "../controllers/enrollmentController";
import { requireAuth, requireAdmin, requireStudent } from "../middleware/auth";
import { validateBody, enrollmentSchema } from "../validators";

const router = Router();

// Admin Enrollment routes
router.post("/admin/enrollments", requireAuth, requireAdmin, validateBody(enrollmentSchema), enrollmentController.adminEnrollStudent);
router.get("/admin/enrollments", requireAuth, requireAdmin, enrollmentController.getAdminEnrollments);
router.patch("/admin/enrollments/:id", requireAuth, requireAdmin, enrollmentController.updateEnrollment);

// Student Enrollment routes
router.get("/student/enrollments", requireAuth, requireStudent, enrollmentController.getStudentEnrollments);
router.get("/student/enrollments/:id", requireAuth, requireStudent, enrollmentController.getStudentEnrollmentById);

export default router;
