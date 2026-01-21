import { IsEmail } from "class-validator";

/**
 * DTO for retrieving tasks for a user.
 * Includes validation rules for the email property.
 * Used to transfer data when fetching tasks.
 */
export class GetTasksDto {
  @IsEmail()
  email!: string;
}
