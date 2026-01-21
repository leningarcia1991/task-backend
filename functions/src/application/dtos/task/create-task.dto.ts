import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * DTO for creating a new task.
 * Includes validation rules for each property.
 * Used to transfer data when creating a task.
 */
export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MaxLength(100, { message: 'Title must be at most 100 characters long' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'Description cannot be empty if provided' })
    @MaxLength(500, { message: 'Description must be at most 500 characters long' })
    description!: string;

    @IsString()
    @IsOptional()
    userEmail?: string;
}