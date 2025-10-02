import { Router } from "express";
import { register, login, forgotPassword, resetPassword, verifyEmail, resendOtp, createAdmin } from "../controllers/user.controller";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);   
router.post("/resend-otp", resendOtp); 
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

//  Admin-only endpoints
router.post("/create-admin", authMiddleware, authorizeRoles("admin"), createAdmin);

export default router;
