/**
 * Represents a task entity in the system.
 * @interface Task
 */
export interface Task {
  readonly id: string;
  title: string;
  description: string;
  completed: boolean;
  userEmail: string;
  createdAt: Date;
}
