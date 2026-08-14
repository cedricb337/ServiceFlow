import { getAllCustomers, findCustomerById, createCustomerRecord, updateCustomerRecord, deleteCustomerRecord } from "../services/customerService.js";


const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
};

export const getCustomers = (req, res) => {
  const customers = getAllCustomers();

  res.status(200).json(customers);
};

export const getCustomerById = (req, res) => {
  const customerId = Number(req.params.id);

  if (Number.isNaN(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  const customer = findCustomerById(customerId);

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  res.status(200).json(customer);
};

export const createCustomer = (req, res) => {
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


  const newCustomer = createCustomerRecord(name, email);

  return res.status(201).json(newCustomer);
  };

export const updateCustomer = (req, res) => {
  const customerId = Number(req.params.id);

  if (Number.isNaN(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  const customer = findCustomerById(customerId);

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

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
  const updatedCustomer = updateCustomerRecord(customer, name, email);

  return res.status(200).json(updatedCustomer);
};

export const deleteCustomer = (req, res) => {
  const customerId = Number(req.params.id);

  if (Number.isNaN(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }
  const wasDeleted = deleteCustomerRecord(customerId);

    if (!wasDeleted) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(204).send();
}