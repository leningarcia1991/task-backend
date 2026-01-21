import { Router } from "express";
import { AuthController } from "../infrastructure/controllers/auth.controller";
import { LoginUserDto } from "../application/dtos/user/login-user.dto";
import { validateBody } from "../infrastructure/middlewares/validation.middleware";

const router = Router();

/**
 * @route POST /auth/login
 * @summary Authenticates a user by email and returns a JWT token.
 * @param {LoginUserDto} request.body.required - User login credentials
 */
router.post("/",
  validateBody(LoginUserDto),
  AuthController.login
);

export default router;
