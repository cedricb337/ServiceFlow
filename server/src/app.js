import express from "express";
import healthRoutes from "./routes/healthRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/customers", customerRoutes);

app.use(errorHandler);

export default app;