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

  const newCustomer = {
    id: customers.length + 1,
    name,
    email,
  };

  customers.push(newCustomer);

  return res.status(201).json(newCustomer);
};