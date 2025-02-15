const ApiError = require('../exceptions/api-error.js')
const tokenService = require('../service/token-service.js')
const AdminService = require('../service/admin-service.js')

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnAuthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]

        if (!accessToken) {
            return next(ApiError.UnAuthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)

        if (!userData) {
            return next(ApiError.UnAuthorizedError())
        }

        const admin = await AdminService.getAdmin(userData.id)

        if (!admin) {
            return next(ApiError.NonAdminError())
        }

        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnAuthorizedError())
    }
}
