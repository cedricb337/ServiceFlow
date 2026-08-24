import { getAllJobs, createJobRecord, findJobById } from "../services/jobServices.js";
import { findCustomerById } from "../services/customerService.js";

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await getAllJobs();

    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const { customer } = req.body;

    const existingCustomer = await findCustomerById(customer);

    if (!existingCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const job = await createJobRecord(req.body);

    res.status(201).json(job);

  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.jobId;

    const existingJob = await findJobById(jobId);

    if (!existingJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(existingJob);
  } catch (err) {
    next(err);
  }
};