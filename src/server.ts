import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { logInfo } from "./utils/logger";
import {
  DEFAULT_PORT,
  CORS_METHODS,
  CORS_ALLOWED_HEADERS,
} from "./constants/server";
import { API_BASE_PATH } from "./constants/api";

// Load environment variables
dotenv.config();

/**
 * Initializes and starts the Express server.
 */
const app: Express = express();

// Middleware
app.use(express.json());

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: CORS_METHODS,
    allowedHeaders: CORS_ALLOWED_HEADERS,
  })
);

// Routes
app.use(API_BASE_PATH, taskRoutes);

// Global error handler (must be after routes)
app.use(errorHandler);

// Start the server
const PORT = Number(process.env.PORT) || DEFAULT_PORT;
const server = app.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
});

/**
 * Handles graceful shutdown of the server.
 */
const shutdown = () => {
  logInfo("Shutting down server...");
  server.close(() => {
    logInfo("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
