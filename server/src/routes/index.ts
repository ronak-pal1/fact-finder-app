import { Router } from "express";
import agentRouter from "./agent"
import learnerRouter from "./learner";

const router = Router()

router.use("/agent", agentRouter)
router.use("/", learnerRouter)

export default router;