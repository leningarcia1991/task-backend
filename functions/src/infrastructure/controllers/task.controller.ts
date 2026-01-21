import { Request, Response } from "express";
import { createTaskUseCase, getTasksUseCase, updateTaskUseCase, deleteTaskUseCase } from "../factories/task.factory";
import { ApiResponseDto } from "../../application/dtos/common/api-response.dto";
import { TaskResponseDto } from "../../application/dtos/task/task-response.dto";
import { UpdateTaskDto } from "../../application/dtos/task/update-task.dto";
import { AppError } from "../../domain/errors/app-error";

export class TaskController {
    /**
     * Creates a new task.
     * @route POST /tasks
     * @param req - Request with task data validated in the body.
     * @returns {Promise<Response>}
     */
    static async create(req: Request, res: Response): Promise<Response> {
        // Set email from authenticated user if available
        const userEmail = req.user!.email;
        // Extract validated data from the request
        const dto = req.body;
        // Create task using the use case
        const task = await createTaskUseCase.execute({ ...dto, userEmail });
        return res.status(201).json(
            new ApiResponseDto(
                "Task created successfully.",
                new TaskResponseDto(task),
                null
            )
        );
    }
    /**
     * Updates an existing task.
     * @route PUT /tasks/:id
     * @param req - Request with task data validated in the body.
     * @returns {Promise<Response>}
     */
    static async update( req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        if (typeof id !== 'string') throw new AppError("Invalid task ID", 400, "BAD_REQUEST");

        // Get user email from authenticated user
        const userEmail = req.user!.email;
        // Extract validated data from the request
        const dto: UpdateTaskDto =  req.body;
        // Update task using the use case
        await updateTaskUseCase.execute(id, { ...dto }, userEmail);
        return res.status(200).json(
            new ApiResponseDto(
                "Task updated successfully.",
                null,
                null
            )
        );
    }

    /**
     * Deletes a task.
     * @route DELETE /tasks/:id
     * @param req - Request with task ID in the parameters.
     * @returns {Promise<Response>}
     */
    static async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        // Validate id parameter
        if (typeof id !== 'string') return res.status(400).json({ message: "ID must be a valid string." });
        // Delete task using the use case
        await deleteTaskUseCase.execute(id);
        return res.status(200).json(
            new ApiResponseDto(
                "Task deleted successfully.",
                null,
                null
            )
        );
    }

    /**
     * Retrieves tasks for a user.
     * @route GET /tasks/:email
     * @returns {Promise<Response>}
     */
    static async getTasks(req: Request, res: Response): Promise<Response> {
        const { email } = req.params;
        // Validate email parameter
        if (!email || Array.isArray(email)) return res.status(400).json({ message: "The email must be a valid string." });
        // Get tasks using the use case
        const tasks = await getTasksUseCase.execute(email);
        // Transform tasks to DTOs
        const tasksDto = tasks.map(task => new TaskResponseDto(task));
        return res.status(200).json(
            new ApiResponseDto(
                `Tasks retrieved successfully. ${tasksDto.length} tasks found.`,
                tasksDto,
                null
            )
        );
    }
}