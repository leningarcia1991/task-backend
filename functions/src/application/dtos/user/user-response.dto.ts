/**
 * Data Transfer Object for user response.
 * Contains user information to be sent in responses.
 * Includes id, email, and creation date.
 */
export class UserResponseDto {
  id: string;
  email: string;
  createdAt: Date;
  constructor(user: { id: string; email: string; createdAt: Date }) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}
