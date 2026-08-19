import Customer from "../models/Customer.js";

export const getAllCustomers = async () => {
  return Customer.find();
};

export const findCustomerById = async (customerId) => {
  return Customer.findById(customerId);
};

export const createCustomerRecord = async (name, email) => {
  return Customer.create({
    name,
    email,
  });
};

export const updateCustomerRecord = async (customer, name, email) => {
  if (name !== undefined) {
    customer.name = name;
  }

  if (email !== undefined) {
    customer.email = email;
  }

  return customer.save();
};

export const deleteCustomerRecord = async (customerId) => {
  return Customer.findByIdAndDelete(customerId);
};
