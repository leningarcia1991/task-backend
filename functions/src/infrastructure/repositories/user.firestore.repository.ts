
import { UserRepository } from "../../domain/repositories/user.repository";
import { db } from "../firebase/firestore.config";
import { User } from "../../domain/entities/user.entity.js";

/**
 * Firestore implementation of the UserRepository.
 * Handles CRUD operations for User entities in Firestore.
 * Implements the repository pattern to abstract data access logic.
 */
export class UserFirestoreRepository implements UserRepository {
  // Reference to the Firestore collection for users
  private collection = db.collection("users");
  /**
     * Creates a new user in Firestore.
     * @param user The user to create
     * @return The created user with its generated ID
     */
  async create(user: User): Promise<User> {
    const userDoc = await this.collection.add({
      email: user.email,
      createdAt: user.createdAt,
    });
    return {
      id: userDoc.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  /**
     * Finds a user by their email.
     * @param email The email of the user to find
     * @return The user if found, or null if not found
     */
  async findByEmail(email: string): Promise<User | null> {
    const querySnapshot = await this.collection.where("email", "==", email).get();
    // If no user is found, return null
    if (querySnapshot.empty) return null;
    // Return the first matching user
    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      email: userDoc.data().email,
      createdAt: userDoc.data().createdAt,
    };
  }
}
