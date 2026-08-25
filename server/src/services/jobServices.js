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
