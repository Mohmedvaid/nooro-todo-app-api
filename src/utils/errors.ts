/**
 * Custom error class for API errors.
 */
export class ApiError extends Error {
  public statusCode: number;

  /**
   * Creates an instance of ApiError.
   * @param statusCode - The HTTP status code for the error.
   * @param message - The error message.
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}
