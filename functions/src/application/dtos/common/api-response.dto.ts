/**
 * DTO for standard API responses.
 * Used to transfer response data, messages, and errors.
 * Generic type T allows for flexibility in the data payload.
 */
export class ApiResponseDto<T> {
  message: string;
  data: T | null;
  error: string | null;
  constructor(
    message: string,
    data: T | null = null,
    error: any = null
  ) {
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
