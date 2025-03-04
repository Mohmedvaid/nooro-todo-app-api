import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";
import { logError } from "../utils/logger";

/**
 * Global error handling middleware for Express.
 * @param error - The error object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error using the custom logger
  logError(`${req.method} ${req.url} - ${error.message}`);

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  }

  // Handle Prisma-specific errors
  if (error instanceof Error && error.message.includes("Prisma")) {
    res.status(500).json({
      status: "error",
      message: "Database error occurred",
    });
    return;
  }

  // Generic server error
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
