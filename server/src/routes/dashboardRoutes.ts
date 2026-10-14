import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController";
import { requireAuth, requireAdmin, requireStudent } from "../middleware/auth";

const router = Router();

router.get("/student/dashboard", requireAuth, requireStudent, dashboardController.getStudentDashboard);
router.get("/admin/dashboard", requireAuth, requireAdmin, dashboardController.getAdminDashboard);

export default router;
