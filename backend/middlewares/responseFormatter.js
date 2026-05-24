export const responseFormatter = (req, res, next) => {

    res.success = (data, message = "Operation successfull", statusCode = 200, count = null) => {
        const responseCount = count !== null ? count : (Array.isArray(data) ? data.length : undefined);

        return res.status(statusCode).json({
            success: true,
            body: data,
            message,
            count: responseCount
        })
    }

    res.created = (data, message = "Source created successfully") => {
        return res.success(data, message)
    }

    res.updated = (data, message = "Source updated successfully") => {
        return res.success(data, message)
    }

    res.deleted = (data, message = "Source deleted successfully") => {
        return res.success(data, message)
    }

    res.error = (message = "Operation failed", statusCode = 400, errors=null) => {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
            timestamps: new Date().toISOString()
        })
    }

    res.notFound = (message = "Resource not found.") => {
        return res.error(message, 404)
    }

    res.badRequest = (message = "Bad request", errors = null) => {
        return res.error(message, 400, errors);
    }

    res.unAuthorized = (message = "unAuthorized") => {
        return res.error(message, 401)
    }

    res.forbidden = (message = "Access forbiden") => {
        return res.error(message, 403)
    };

    next();
}