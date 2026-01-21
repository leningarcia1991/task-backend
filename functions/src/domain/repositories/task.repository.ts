import { Task } from "../entities/task.entity";

/**
 * TaskRepository defines the contract for task data operations.
 * @interface TaskRepository
 */
export interface TaskRepository {
  create(task: Omit<Task, "id">): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  getTasks(userEmail: string): Promise<Task[]>;
  update(id: string, task: Partial<Task>): Promise<void>;
  delete(id: string): Promise<void>;
}
