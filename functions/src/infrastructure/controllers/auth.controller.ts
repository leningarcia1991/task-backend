import { Request, Response } from "express";
import { getUserUseCase } from "../factories/user.factory";
import { ApiResponseDto } from "../../application/dtos/common/api-response.dto";
import { AppError } from "../../domain/errors/app-error";
import { generateToken } from "../utils/jwt.util";

export class AuthController {
  /**
   * Authenticates a user using email.
   * Validates user credentials and returns a JWT token upon successful authentication.
   *
   * @route POST /auth/login
  */
  static async login(req: Request, res: Response): Promise<Response> {
    // Extract validated data from the request
    const { email } = req.body;
     // Get tasks using the use case
    const user = await getUserUseCase.execute(email);
    if (!user) throw new AppError("Invalid credentials", 401, "UNAUTHORIZED");

    // JWT
    const token = generateToken({ id: user.id, email: user.email });

    return res.status(200).json(
      new ApiResponseDto(
        "Login successful",
        { token, userEmail: user.email },
        null
      )
    );
  }
}
