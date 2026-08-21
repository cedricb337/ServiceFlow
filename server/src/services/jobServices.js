import Job from "../models/Job.js";

export const getAllJobs = async () => {
  return Job.find();
};

export const createJobRecord = async (jobData) => {
  return Job.create(jobData);
};
