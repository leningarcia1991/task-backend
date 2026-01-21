import { TaskRepository } from "../../domain/repositories/task.repository.js";
import { db } from "../firebase/firestore.config.js";
import { Task } from "../../domain/entities/task.entity.js";

/**
 * Firestore implementation of the TaskRepository.
 * Handles CRUD operations for Task entities in Firestore.
 * Implements the repository pattern to abstract data access logic.
 */
export class TaskFirestoreRepository implements TaskRepository {
  // Reference to the Firestore collection for tasks
  private collection = db.collection("tasks");
  /**
     * Creates a new task in Firestore.
     * @param task The task to create
     * @return The created task with its generated ID
     */
  async create(task: Task): Promise<Task> {
    const taskDoc = await this.collection.add(task);
    return {
      ...task,
      id: taskDoc.id,
    };
  }
  /**
     * Updates an existing task in Firestore.
     * @param id The ID of the task to update
     * @param task The updated task data
     */
  async update(id: string, task: Partial<Task>): Promise<void> {
    await this.collection.doc(id).update(task);
  }
  /**
     * Deletes a task from Firestore.
     * @param id The ID of the task to delete
     */
  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
  /**
     * Finds all tasks for a specific user.
     * @param email The email of the user
     * @return A list of tasks for the user
     */
  async getTasks(email: string): Promise<Task[]> {
    const querySnapshot = await this.collection
      .where("userEmail", "==", email)
      .orderBy("createdAt", "desc")
      .get();
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  }
  /**
     * Finds a task by its ID.
     * @param id The ID of the task to find
     * @return The task if found, or null if not found
     */
  async findById(id: string): Promise<Task | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return {
      id: doc.id,
      ...doc.data(),
    } as Task;
  }
}
