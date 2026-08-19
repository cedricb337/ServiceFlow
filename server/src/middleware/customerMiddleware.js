import mongoose from "mongoose";

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
};

export const validateCustomerId = (req, res, next) => {
  const customerId = req.params.id;

  if (!mongoose.isValidObjectId(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  req.customerId = customerId;
  next();
};

export const validateCreateCustomer = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Name must be a non-empty string",
    });
  }

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      message: "Email must be a non-empty string",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "Email format is invalid",
    });
  }

  next();
};

export const validateUpdateCustomer = (req, res, next) => {
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      message: "Name or email is required",
    });
  }

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Name must be a non-empty string",
      });
    }
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        message: "Email must be a non-empty string",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Email format is invalid",
      });
    }
  }

  next();
};