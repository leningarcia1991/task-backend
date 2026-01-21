import type { AuthenticatedUser } from "../domain/auth/authenticated-user";

/**
 * Extends the Express Request interface to include authenticated user information.
 * This allows middleware and route handlers to access user details
 * attached to the request object after successful authentication.
 */
declare module "express-serve-static-core" {
  interface Request {
    user?: AuthenticatedUser;
  }
}
