export class AppError extends Error {
    constructor(message, statusCode, errorCode = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true;

        // Error.captureStackTrace(this, this.contructor)
    }
}

export class NotFoundError extends AppError {
    constructor(message = "resource not found.") {
        super(message, 404, 'NOT_FOUND')
    }
}

export class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
        super(message, 400, "VALIDATION_ERROR")
    }
}

export class DatabaseError extends AppError {
    constructor(message = "Database error") {
        super(message, 500, "DATABASE_ERROR")
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict error") {
        super(message, 409, "CONFLICT");
    }
}