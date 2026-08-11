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