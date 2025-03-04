/**
 * Logs an error message to the console.
 * @param message - The error message to log.
 */
export function logError(message: string): void {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
}

/**
 * Logs an info message to the console.
 * @param message - The info message to log.
 */
export function logInfo(message: string): void {
  console.info(`[INFO] ${new Date().toISOString()} - ${message}`);
}
