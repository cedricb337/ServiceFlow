import { Router } from "express";
import { getJobs, createJob, getJobById, updateJob } from "../controllers/jobController.js";
import { validateCreateJob, validateJobId, validateUpdateJob  } from "../middleware/jobMiddleware.js";

const router = Router();

router.get("/", getJobs);
router.post("/", validateCreateJob, createJob);
router.get("/:id", validateJobId, getJobById);
router.patch("/:id", validateJobId, validateUpdateJob, updateJob);

export default router;
