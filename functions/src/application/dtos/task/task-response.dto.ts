/**
 * DTO for task response.
 * Used to transfer task data in responses.
 * Includes all relevant task properties.
 */
export class TaskResponseDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
    constructor(
       task: { id: string; title: string; description: string; completed: boolean; createdAt: Date }
    ) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.completed = task.completed;
        this.createdAt = task.createdAt;
    }
}