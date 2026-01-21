import { Task } from "../../../domain/entities/task.entity";
import { AppError } from "../../../domain/errors/app-error";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { CreateTaskDto } from "../../dtos/task/create-task.dto";

/**
 * Use case for creating a new task.
 * Applies business logic to create task details in the repository.
 * Logic independent of any framework.
 */
export class CreateTaskUseCase {
  // Dependency injection of the TaskRepository
  constructor(private taskRepository: TaskRepository) { }
  // Execute the use case to create a new task
  async execute(taskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create({
      title: taskDto.title,
      description: taskDto.description,
      userEmail: taskDto.userEmail!,
      completed: false,
      createdAt: new Date(),
    });
    if (!task) {
      throw new AppError("Failed to create task", 500, "TASK_CREATION_FAILED");
    }

    return task;
  }
}
