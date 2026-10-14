import { Router } from "express";
import * as contentController from "../controllers/contentController";
import { requireAuth, requireAdmin } from "../middleware/auth";
import { validateBody, contentSchema } from "../validators";

const router = Router();

// Student / Public Content routes
router.get("/content", contentController.getPublishedContent);
router.get("/content/:slug", contentController.getContentBySlug);

// Admin Content routes
router.post("/admin/content", requireAuth, requireAdmin, validateBody(contentSchema), contentController.createContent);
router.get("/admin/content", requireAuth, requireAdmin, contentController.getAdminContent);
router.get("/admin/content/:id", requireAuth, requireAdmin, contentController.getContentById);
router.patch("/admin/content/:id", requireAuth, requireAdmin, contentController.updateContent);
router.delete("/admin/content/:id", requireAuth, requireAdmin, contentController.deleteContent);
router.patch("/admin/content/:id/status", requireAuth, requireAdmin, contentController.updateStatus);

export default router;
