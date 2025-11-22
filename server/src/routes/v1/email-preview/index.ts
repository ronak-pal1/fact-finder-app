import { Router } from "express";
import { resendOTPTemplate } from "../../../services/email/controllers/resend.controller";



const router = Router();

router.get("/preview/otp", resendOTPTemplate);

export default router;
