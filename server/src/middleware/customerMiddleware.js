export const validateCustomerId = (req, res, next) => {
  const customerId = Number(req.params.id);

  if (Number.isNaN(customerId)) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }
    req.customerId = customerId;
    next();
};