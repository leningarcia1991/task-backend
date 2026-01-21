import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../domain/errors/app-error";

/**
 * Middleware to authenticate requests using JWT.
 * Validates the token and attaches user information to the request object.
 * @function authMiddleware
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @param {NextFunction} next - The next middleware function.
 * @throws {AppError} Throws an AppError if authentication fails.
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("No token provided", 401, "UNAUTHORIZED");

  const [, token] = authHeader.split(" ");

  try {
    // decode JwtPayload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    // Validate decoded payload
    if (!decoded || typeof decoded !== "object" || !decoded.id || !decoded.email) {
      throw new AppError("Invalid token payload", 401, "UNAUTHORIZED");
    }

    // Attach user info to request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401, "UNAUTHORIZED");
  }
}
