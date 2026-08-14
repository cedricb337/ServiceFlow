const customers = [
  {
    id: 1,
    name: "Northside Plumbing",
    email: "contact@northsideplumbing.ca",
  },
  {
    id: 2,
    name: "GreenLeaf Landscaping",
    email: "hello@greenleaf.ca",
  },
];

export const getAllCustomers = () => {
  return customers;
};

export const findCustomerById = (customerId) => {
  return customers.find(
    (customer) => customer.id === customerId
  );
};

export const createCustomerRecord = (name, email) => {
  const nextId =
    customers.length > 0
      ? Math.max(...customers.map((customer) => customer.id)) + 1
      : 1;

  const newCustomer = {
    id: nextId,
    name,
    email,
  };

  customers.push(newCustomer);

  return newCustomer;
};

export const updateCustomerRecord = (customer, name, email) => {
  if (name !== undefined) {
    customer.name = name;
  }

  if (email !== undefined) {
    customer.email = email;
  }

  return customer;
};

export const deleteCustomerRecord = (customerId) => {
  const customerIndex = customers.findIndex(
    (customer) => customer.id === customerId
  );

  if (customerIndex === -1) {
    return false;
  }

  customers.splice(customerIndex, 1);

  return true;
};