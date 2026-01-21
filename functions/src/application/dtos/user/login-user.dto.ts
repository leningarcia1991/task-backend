import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * Data Transfer Object for user login.
 * Includes validation for the email field.
 */
export class LoginUserDto {
    @IsEmail({}, { message: "Invalid email format" })
    @IsNotEmpty()
      email!: string;
}
