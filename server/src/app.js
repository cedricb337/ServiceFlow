import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/jobs", jobRoutes);

app.use(errorHandler);

export default app;