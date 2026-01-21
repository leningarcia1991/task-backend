import { AppError } from "../../../domain/errors/app-error";
import { UserRepository } from "../../../domain/repositories/user.repository";

/**
 * Use case for retrieving a user by email.
 * Applies business logic to fetch user details from the repository.
 * Logic independent of any framework.
 */
export class GetUserUseCase {
  // Dependency injection of the UserRepository
  constructor(private userRepository: UserRepository) {}
  // Execute the use case to get a user by email
  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found.", 404, "USER_NOT_FOUND");
    }
    return user;
  }
}
