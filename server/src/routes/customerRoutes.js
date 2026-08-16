import { Router } from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customerController.js";
import { validateCustomerId } from "../middleware/customerMiddleware.js";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", validateCustomerId, getCustomerById);
router.post("/", createCustomer);
router.patch("/:id", validateCustomerId, updateCustomer);
router.delete("/:id", validateCustomerId, deleteCustomer);

export default router;