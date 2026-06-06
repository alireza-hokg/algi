/**
 * For handling error message, statusCode and errorCode
 * @class
 * 
 * @description
 * Creates a child class from Error class and adds statusCode and errorCode
 */
export class AppError extends Error {
    /**
     * @param {string} message - Message caught from AppError
     * @param {number} statusCode - StatusCode caught from AppError
     * @param {string} errorCode - ErrorCode caught from AppError
     */
    constructor(message, statusCode, errorCode = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true;

        // Error.captureStackTrace(this, this.contructor)
    }
}
/**
 * @description
 * Creates a child class from AppError class for 404 errors
 */
export class NotFoundError extends AppError {
    constructor(message = "resource not found.") {
        super(message, 404, 'NOT_FOUND')
    }
}

/**
 * @description
 * Creates a child class from AppError class when entry data in invalid
 */
export class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
        super(message, 400, "VALIDATION_ERROR")
    }
}

/**
 * @description
 * Creates a child class from AppError when server has problem
 */
export class DatabaseError extends AppError {
    constructor(message = "Database error") {
        super(message, 500, "DATABASE_ERROR")
    }
}

/**
 * @description
 * Creates a child class from AppError when have a conflict
 */
export class ConflictError extends AppError {
    constructor(message = "Conflict error") {
        super(message, 409, "CONFLICT");
    }
}

/**
 * @description
 * Creates a child class from AppError when authorization is incorrect
 */
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized error") {
        super(message, 401, "UNAUTHORIZED")
    }
}