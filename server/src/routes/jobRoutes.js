import { Router } from "express";
import { getJobs, createJob } from "../controllers/jobController.js";
import { validateCreateJob } from "../middleware/jobMiddleware.js";

const router = Router();

router.get("/", getJobs);
router.post("/", validateCreateJob, createJob);

export default router;
