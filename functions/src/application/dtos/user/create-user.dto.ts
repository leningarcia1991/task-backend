import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * Data Transfer Object for creating a new user.
 * Includes validation and transformation for the email field.
 */
export class CreateUserDto{
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;
}