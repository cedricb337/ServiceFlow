import { getAllCustomers, findCustomerById, createCustomerRecord, updateCustomerRecord, deleteCustomerRecord } from "../services/customerService.js";




export const getCustomers = async (req, res, next) => {
  try {
    const customers = await getAllCustomers();

    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await findCustomerById(req.customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

export const createCustomer = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const newCustomer = await createCustomerRecord(name, email);

    return res.status(201).json(newCustomer);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Customer email already exists",
      });
    }

    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.customerId;

    const customer = await findCustomerById(customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const { name, email } = req.body;

    const updatedCustomer = await updateCustomerRecord(
      customer,
      name,
      email
    );

    return res.status(200).json(updatedCustomer);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Customer email already exists",
      });
    }

    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.customerId;

    const wasDeleted = await deleteCustomerRecord(customerId);

    if (!wasDeleted) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};