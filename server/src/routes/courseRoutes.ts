import { Router } from "express";
import * as courseController from "../controllers/courseController";
import { requireAuth, requireAdmin, requireStudent } from "../middleware/auth";
import { validateBody, courseSchema } from "../validators";
import { getStudentEnrollments, getStudentEnrollmentById } from "../controllers/enrollmentController";

const router = Router();

// Public / Student course routes
router.get("/courses", courseController.getPublicCourses);
router.get("/courses/:id", courseController.getCourseById);

// Admin course management routes
router.post("/admin/courses", requireAuth, requireAdmin, validateBody(courseSchema), courseController.createCourse);
router.get("/admin/courses", requireAuth, requireAdmin, courseController.getAdminCourses);
router.patch("/admin/courses/:id", requireAuth, requireAdmin, courseController.updateCourse);
router.delete("/admin/courses/:id", requireAuth, requireAdmin, courseController.deleteCourse);
router.patch("/admin/courses/:id/status", requireAuth, requireAdmin, courseController.updateStatus);
router.patch("/admin/courses/:id/meeting", requireAuth, requireAdmin, courseController.updateMeeting);
router.get("/admin/courses/:courseId/students", requireAuth, requireAdmin, courseController.getCourseStudents);

// Student courses routes
router.get("/student/courses", requireAuth, requireStudent, getStudentEnrollments);
router.get("/student/courses/:courseId", requireAuth, requireStudent, getStudentEnrollmentById);

export default router;
