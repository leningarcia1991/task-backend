/**
 * Custom application error class to standardize error handling.
 * Includes HTTP status code and error code for better error management.
 */
export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
