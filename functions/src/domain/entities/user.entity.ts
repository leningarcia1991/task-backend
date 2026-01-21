/**
 * Represents a user entity in the system.
 * @interface User
 */
export interface User {
  readonly id: string;
  email: string;
  createdAt: Date;
}