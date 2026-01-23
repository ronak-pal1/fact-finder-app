import { Router } from "express";
import learnerRouter from "./v1/learner";
import emailPreviewRouter from "./v1/email-preview";
import { config } from "../env.config";
import adminRouter from "./v1/admin";
import agentRouter from "./v1/agent";

const router = Router();

router.use("/learner", learnerRouter);
router.use("/agent", agentRouter);
router.use("/admin", adminRouter);

// For development only
if (config.ENV === "development") {
  router.use("/resend/email", emailPreviewRouter);
}

export default router;
