import { UserResponseDto } from "./user-response.dto";
/**
 * Data Transfer Object for authentication response.
 * Contains the authenticated user's information and the JWT token.
 */
export class AuthResponseDto {
    user: UserResponseDto;
    token: string;
    constructor(user: UserResponseDto, token: string) {
        this.user = user;
        this.token = token;
    }
}