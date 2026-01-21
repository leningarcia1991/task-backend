import { AppError } from "../../../domain/errors/app-error";
import { TaskRepository } from "../../../domain/repositories/task.repository";

/**
 * Use case for deleting an existing task.
 * Applies business logic to delete task details in the repository.
 * Logic independent of any framework.
 */
export class DeleteTaskUseCase {
  // Dependency injection of the TaskRepository
  constructor(private taskRepository: TaskRepository) {}
  // Execute the use case to delete an existing task
  async execute(id: string): Promise<void> {
    const taskExist = await this.taskRepository.findById(id);
    if (!taskExist) throw new AppError("Task not found", 404, "TASK_NOT_FOUND");
    await this.taskRepository.delete(taskExist.id);
  }
}
