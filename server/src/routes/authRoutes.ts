import { Router } from "express";
import * as authController from "../controllers/authController";
import { requireAuth } from "../middleware/auth";
import { validateBody, registerSchema, loginSchema } from "../validators";

const router = Router();

router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.getMe);

export default router;
