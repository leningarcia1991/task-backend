import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./infrastructure/middlewares/error.middleware";
import { authMiddleware } from "./infrastructure/middlewares/auth.middleware";

/**
 * Express application setup.
 * Configures middleware, routes, and error handling.
 * @module app
 */

// Initialize Express app
const app = express();

// Middleware global
app.use(cors({ origin: true }));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.send("Hello, API is running.");
});

// Public routes (no JWT required)
app.use("/auth", authRoutes);

// Protected routes (JWT required)
app.use("/tasks", authMiddleware, taskRoutes);
app.use("/users", userRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
