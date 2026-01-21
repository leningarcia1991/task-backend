import { User } from "../entities/user.entity";

/**
 * UserRepository defines the contract for user data operations.
 * @interface UserRepository
 */
export interface UserRepository {
  create(user: Omit<User, "id">): Promise<User>
  findByEmail(email: string): Promise<User | null>
}