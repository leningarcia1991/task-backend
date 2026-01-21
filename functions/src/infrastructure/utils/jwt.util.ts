import jwt, { SignOptions, Secret } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}
/**
 * Generates a JWT token.
 * @param payload The payload to include in the token
 * @return The generated JWT token
 */
export function generateToken(payload: JwtPayload): string {
  const secret: Secret = process.env.JWT_SECRET!;

  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  } as SignOptions;

  return jwt.sign(payload, secret, options);
}
