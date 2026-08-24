import { Router } from "express";
import { getJobs, createJob, getJobById } from "../controllers/jobController.js";
import { validateCreateJob, validateJobId } from "../middleware/jobMiddleware.js";

const router = Router();

router.get("/", getJobs);
router.post("/", validateCreateJob, createJob);
router.get("/:id",validateJobId, getJobById);

export default router;
