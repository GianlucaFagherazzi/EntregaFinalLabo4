export class AppError extends Error {
  constructor(message, statusCode = 500, originalError = null) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name

    // Guardamos el error original, si existe
    if (originalError) {
      this.originalError = {
        message: originalError.message,
        stack: originalError.stack,
        name: originalError.name
      }
    }
    
    Error.captureStackTrace(this, this.constructor)
  }
}
