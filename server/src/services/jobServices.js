import Job from "../models/Job.js";

export const getAllJobs = async () => {
  return Job.find().populate("customer", "name email");
};

export const createJobRecord = async (jobData) => {
  const createdJob = await Job.create(jobData);
  await createdJob.populate("customer", "name email");
  return createdJob;
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

  await job.save();

  return Job.findById(job._id).populate("customer", "name email");
};

export const deleteJobRecord = async (jobId) => {
  return Job.findByIdAndDelete(jobId);
};
