import { Router } from "express";
import authRoutes from "./authRoutes";
import courseRoutes from "./courseRoutes";
import enrollmentRoutes from "./enrollmentRoutes";
import attendanceRoutes from "./attendanceRoutes";
import completionRoutes from "./completionRoutes";
import contentRoutes from "./contentRoutes";
import dashboardRoutes from "./dashboardRoutes";
import studentRoutes from "./studentRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/", courseRoutes);
router.use("/", enrollmentRoutes);
router.use("/", attendanceRoutes);
router.use("/", completionRoutes);
router.use("/", contentRoutes);
router.use("/", dashboardRoutes);
router.use("/", studentRoutes);

export default router;
