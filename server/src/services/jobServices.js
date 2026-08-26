import Job from "../models/Job.js";

export const getAllJobs = async () => {
  return Job.find();
};

export const createJobRecord = async (jobData) => {
  return Job.create(jobData);
};

export const findJobById = async (jobId) => {
  return Job.findById(jobId).populate("customer", "name email");
};

export const updateJobRecord = async (job, title, description, status) => {
  if (title !== undefined) {
    job.title = title;
  }

  if (description !== undefined) {
    job.description = description;
  }

  if (status !== undefined) {
    job.status = status;
  }

  return job.save();
};
