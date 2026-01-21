import { Router } from "express";
import { UserController } from "../infrastructure/controllers/user.controller";
import { CreateUserDto } from "../application/dtos/user/create-user.dto";
import { LoginUserDto } from "../application/dtos/user/login-user.dto";
import { validateBody, validateParams } from "../infrastructure/middlewares/validation.middleware";

const router = Router();

/**
 * @route POST /user
 * @summary Creates a new user.
 * @param {CreateUserDto} request.body.required - User creation data
 */
router.post("/",
    validateBody(CreateUserDto),
    UserController.create
);
/**
 * @route GET /user/:email
 * @summary Retrieves a user by email.
 * @param {LoginUserDto} request.params.required - User email parameter
 */
router.get("/:email",
    validateParams(LoginUserDto),
    UserController.getByEmail
);

export default router;