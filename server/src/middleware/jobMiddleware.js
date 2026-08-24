import mongoose from "mongoose";

const validStatuses = [
  "pending",
  "in-progress",
  "completed",
  "cancelled",
];

export const validateCreateJob = (req, res, next) => {
  const { customer, title, description, status } = req.body;

  if (!customer) {
    return res.status(400).json({
      message: "Customer is required",
    });
  }

  if (!mongoose.isValidObjectId(customer)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      message: "Title must be a non-empty string",
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      message: "Description must be a string",
    });
  }

  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid job status",
   });
 }

  next();
};

export const validateJobId = (req, res, next) => {
  const jobId = req.params.id;

  if (!mongoose.isValidObjectId(jobId)) {
    return res.status(400).json({
      message: "Invalid job ID",
    });
  }

  req.jobId = jobId;
  next();
};
