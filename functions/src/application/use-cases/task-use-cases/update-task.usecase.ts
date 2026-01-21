import { AppError } from "../../../domain/errors/app-error";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { UpdateTaskDto } from "../../dtos/task/update-task.dto";

/**
 * Use case for updating an existing task.
 * Applies business logic to update task details in the repository.
 * Logic independent of any framework.
 */
export class UpdateTaskUseCase {
  // Dependency injection of the TaskRepository
  constructor(private taskRepository: TaskRepository) { }
  // Execute the use case to update an existing task
  async execute(id: string, update: UpdateTaskDto, userEmail: string): Promise<void> {
    const taskExists = await this.taskRepository.findById(id);
    if (!taskExists) throw new AppError("Task not found", 404, "TASK_NOT_FOUND");
    // Ensure the task belongs to the user
    if (taskExists.userEmail !== userEmail) {
      throw new AppError("Not authorized to update this task", 403, "FORBIDDEN");
    }
    await this.taskRepository.update(id, update);
  }
}
