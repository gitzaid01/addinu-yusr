import { Router } from "express";
import * as completionController from "../controllers/completionController";
import { requireAuth, requireAdmin, requireStudent } from "../middleware/auth";
import { validateBody, completionSchema } from "../validators";

const router = Router();

// Admin Completion routes
router.post("/admin/completions", requireAuth, requireAdmin, validateBody(completionSchema), completionController.createCompletion);
router.get("/admin/completions", requireAuth, requireAdmin, completionController.getAdminCompletions);

// Student Completion routes
router.get("/student/completions", requireAuth, requireStudent, completionController.getStudentCompletions);
router.get("/student/courses/:courseId/completion", requireAuth, requireStudent, completionController.getStudentCourseCompletion);

export default router;
