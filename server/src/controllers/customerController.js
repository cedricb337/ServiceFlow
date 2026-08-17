import { getAllCustomers, findCustomerById, createCustomerRecord, updateCustomerRecord, deleteCustomerRecord } from "../services/customerService.js";




export const getCustomers = (req, res) => {
  const customers = getAllCustomers();

  res.status(200).json(customers);
};

export const getCustomerById = (req, res) => {
  const customerId = req.customerId;
  

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


  const newCustomer = createCustomerRecord(name, email);

  return res.status(201).json(newCustomer);
  };

export const updateCustomer = (req, res) => {
  const customerId = req.customerId;

  const customer = findCustomerById(customerId);

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  const { name, email } = req.body;

  const updatedCustomer = updateCustomerRecord(customer, name, email);

  return res.status(200).json(updatedCustomer);
};

export const deleteCustomer = (req, res) => {
  
  const customerId = req.customerId;

  const wasDeleted = deleteCustomerRecord(customerId);

    if (!wasDeleted) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(204).send();
}