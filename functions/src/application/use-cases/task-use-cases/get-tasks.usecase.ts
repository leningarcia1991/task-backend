import { Task } from "../../../domain/entities/task.entity";
import { AppError } from "../../../domain/errors/app-error";
import { TaskRepository } from "../../../domain/repositories/task.repository";

/**
 * Use case for getting all tasks for a specific user.
 * Applies business logic to retrieve task details from the repository.
 * Logic independent of any framework.
 */
export class GetTasksUseCase {
  // Dependency injection of the TaskRepository
  constructor(private taskRepository: TaskRepository) {}
  // Execute the use case to get all tasks for a specific user
  async execute(email: string): Promise<Task[]> {
    if (!email) throw new AppError("User email is required.", 400, "EMAIL_REQUIRED");
    return this.taskRepository.getTasks(email);
  }
}
