import { UserFirestoreRepository } from "../repositories/user.firestore.repository";
import { CreateUserUseCase } from "../../application/use-cases/user-use-cases/create-user.usecase";
import { GetUserUseCase } from "../../application/use-cases/user-use-cases/get-user.usecase";

/**
 * Factory for creating user use case instances with a shared repository.
 * This ensures that all use cases operate on the same data source.
 * Singleton pattern is used for the repository instance.
 */
const repo = new UserFirestoreRepository();
export const createUserUseCase = new CreateUserUseCase(repo);
export const getUserUseCase = new GetUserUseCase(repo);
