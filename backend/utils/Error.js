/**
 * Custom error class for handling application errors with statusCode and errorCode
 * 
 * @class
 * @extends Error
 * 
 * @description
 * Creates a child class from Error class and adds statusCode and errorCode
 * 
 * @property {string} message - HTTP error message
 * @property {string} errorCode - custom error identifiere (e.g 'NOT_FOUND')
 * 
 * @example
 * throw new AppError("Not found", "404", "NOT_FOUND")
 */
export class AppError extends Error {
    /**
     * Creates an instance of AppError
     * 
     * @param {string} message - Message caught from AppError
     * @param {number} statusCode - StatusCode caught from AppError
     * @param {string} errorCode - ErrorCode caught from AppError
     */
    constructor(message, statusCode, errorCode = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true;

    }
}
/**
 * error class for 404 not found responses.
 * @class
 * @extends AppError
 * 
 * @description
 * throws when requested resource (e.g page, product) can not be found.
 */
export class NotFoundError extends AppError {
    constructor(message = "resource not found.") {
        super(message, 404, 'NOT_FOUND')
    }
}

/**
 * error class for 400 validation 
 * 
 * @class
 * @extends ValidationError
 * 
 * @description
 * throws when validation fails
 */
export class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
        super(message, 400, "VALIDATION_ERROR")
    }
}

/**
 * error class 500 database 
 * @class
 * @extends
 * @description
 * throws when database fails to response
 */
export class DatabaseError extends AppError {
    constructor(message = "Database error") {
        super(message, 500, "DATABASE_ERROR")
    }
}

/**
 * error class 409 conflict
 * @class
 * @extends AppError
 * @description
 * throws when there is a conflict between database and request
 */
export class ConflictError extends AppError {
    constructor(message = "Conflict error") {
        super(message, 409, "CONFLICT");
    }
}

/**
 * error class 401 authorization
 * @class
 * @extends AppError
 * 
 * @description
 * throws when authorization fails
 */
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized error") {
        super(message, 401, "UNAUTHORIZED")
    }
}