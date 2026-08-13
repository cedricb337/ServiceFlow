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

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
};

export const getCustomers = (req, res) => {
  res.status(200).json(customers);
};

export const getCustomerById = (req, res) => {
  const customerId = Number(req.params.id);

  if (Number.isNaN(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  const customer = customers.find(
    (customer) => customer.id === customerId
  );

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

  return res.status(201).json(newCustomer);
};

export const updateCustomer = (req, res) => {
  const customerId = Number(req.params.id);

  if (Number.isNaN(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  const customer = customers.find(
    (customer) => customer.id === customerId
  );

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
    customer.name = name;
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

  customer.email = email;
}
  return res.status(200).json(customer);
}

export const deleteCustomer = (req, res) => {
  const customerId = Number(req.params.id);

  if (Number.isNaN(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  const customerIndex = customers.findIndex(
    (customer) => customer.id === customerId
  );

  if (customerIndex === -1) {
  return res.status(404).json({
    message: "Customer not found",
  });
}

customers.splice(customerIndex, 1);

return res.status(204).send();
}