import { Router } from "express";
import learnerRouter from "./v1/learner";
import emailPreviewRouter from "./v1/email-preview";
import { config } from "../env.config";

const router = Router();

router.use("/learner", learnerRouter);


// For development only
if(config.ENV === "development"){
router.use("/resend/email", emailPreviewRouter)
}


export default router;
