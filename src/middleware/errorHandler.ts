import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";

// Define the error handler with the explicit ErrorRequestHandler type
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging (in production, use a proper logging service)
  console.error(`[ERROR] ${req.method} ${req.url} - ${error.message}`);

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return; // Explicitly return void
  }

  // Handle Prisma-specific errors if needed
  if (error instanceof Error && error.message.includes("Prisma")) {
    res.status(500).json({
      status: "error",
      message: "Database error occurred",
    });
    return; // Explicitly return void
  }

  // Generic server error
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
  // No need to call next() since this is the last middleware
};
