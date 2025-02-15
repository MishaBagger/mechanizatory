module.exports = class ApiError extends Error {
    status
    errors

    constructor (status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnAuthorizedError () {
        return new ApiError (401, 'Пользователь не авторизован')
    }
    static NonAdminError () {
        return new ApiError (403, 'Пользователь не администратор')
    }
    static BadRequest (message, errors = []) {
        return new ApiError (400, message, errors)

    }
}