import { Router } from "express";
import { register, login, refreshToken, verifyOtp, resendOtp } from "../../../controllers/learner/auth.controller";
import { googleAuth } from "../../../controllers/learner/sso.controller";


const router = Router();


// POST ENDPOINTS
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/google", googleAuth);

// GET ENDPOINTS

export default router;

