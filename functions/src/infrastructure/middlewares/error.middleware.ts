import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/app-error";

/**
 * Error handling middleware.
 * Logs the error and sends a 500 response.
 * @param err - The error object.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function.
 * @returns
 */
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  if (Array.isArray(err)) { // errores de class-validator
    return res.status(400).json({
      message: "Validation failed",
      errors: err.map(e => Object.values(e.constraints).join(", ")),
    });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.code,
      data: null,
    });
  }
  return res.status(500).json({ message: "Internal server error" });
}
