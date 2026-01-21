import { UserRepository } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";

/**
 * Use case for creating a new user.
 * Applies business logic to create user details in the repository.
 * Logic independent of any framework.
 */
export class CreateUserUseCase {
    // Dependency injection of the UserRepository
    constructor(private userRepository: UserRepository) {}
    // Execute the use case to create a new user
    async execute(email: string): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            return existingUser;
        }
        return this.userRepository.create({
            email,
            createdAt: new Date(),
        });
    }
}