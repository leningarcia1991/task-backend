import { IsBoolean, IsOptional, IsString } from "class-validator";

/**
 * DTO for updating an existing task.
 * Includes optional properties for partial updates.
 * Used to transfer data when updating a task.
 */
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
    title?: string;

  @IsString()
  @IsOptional()
    description?: string;

  @IsBoolean()
  @IsOptional()
    completed?: boolean;
}
