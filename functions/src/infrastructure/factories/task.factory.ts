import { TaskFirestoreRepository } from "../repositories/task.firestore.repository";
import { GetTasksUseCase } from "../../application/use-cases/task-use-cases/get-tasks.usecase";
import { CreateTaskUseCase } from "../../application/use-cases/task-use-cases/create-task.usecase";
import { UpdateTaskUseCase } from "../../application/use-cases/task-use-cases/update-task.usecase";
import { DeleteTaskUseCase } from "../../application/use-cases/task-use-cases/delete-task.usecase";

/**
 * Factory for creating task use case instances with a shared repository.
 * This ensures that all use cases operate on the same data source.
 * Singleton pattern is used for the repository instance.
 */
const repo = new TaskFirestoreRepository();
export const createTaskUseCase = new CreateTaskUseCase(repo);
export const getTasksUseCase = new GetTasksUseCase(repo);
export const updateTaskUseCase = new UpdateTaskUseCase(repo);
export const deleteTaskUseCase = new DeleteTaskUseCase(repo);