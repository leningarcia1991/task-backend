import { Request, Response } from "express";
import { getUserUseCase, createUserUseCase } from "../factories/user.factory";
import { ApiResponseDto } from "../../application/dtos/common/api-response.dto";
import { UserResponseDto } from "../../application/dtos/user/user-response.dto";
import { AppError } from "../../domain/errors/app-error";

export class UserController {
    /**
     * Creates a new user.
     * @route POST /users
     * @param req - Request with user data validated in the body.
     * @returns {Promise<Response>}
     */
    static async create(req: Request, res: Response): Promise<Response> {
        // Extract validated data from the request
        const { email } = req.body;
        // Execute the use case to create the user
        const user = await createUserUseCase.execute(email);
        return res.status(201).json(
            new ApiResponseDto(
                "User created successfully.",
                new UserResponseDto(user),
                null
            )
        );
    }
    /**
     * Retrieves a user by email.
     * @route GET /users/:email
     * @returns {Promise<Response>}
     */
    static async getByEmail( req: Request, res: Response): Promise<Response> {
        // Extract validated data from the request
        const { email } = req.params;
        // Validate email parameter
        if (typeof email !== 'string') throw new  AppError("Invalid email parameter", 400, "BAD_REQUEST");
        // Find user by email
        const user = await getUserUseCase.execute(email);
        return res.status(200).json(
            new ApiResponseDto(
                "User retrieved successfully.",
                new UserResponseDto(user),
                null
            )
        );
    }
}