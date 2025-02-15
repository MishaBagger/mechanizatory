const UserService = require('../service/user-service.js')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error.js')

class UserController {

    async registration (req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {login, password, username, email, phone} = req.body
            const userData = await UserService.registration(login, password, username, email, phone)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const {login, password} = req.body
            const userData = await UserService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(token)
        }
        catch (e) {
            next(e)
        }
    }
    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async getUserOrders (req, res, next) {
        try {
            const orders = await UserService.getUserOrders(req.user.id)
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async getCourses (req, res, next) {
        try {
            const courses = await UserService.getCourses()
            return res.json(courses)
        } catch (e) {
            next(e)
        }
    }

    async getServices (req, res, next) {
        try {
            const services = await UserService.getServices()
            return res.json(services)
        } catch (e) {
            next(e)
        }
    }

    async getImportants (req, res, next) {
        try {
            const importants = await UserService.getImportants()
            return res.json(importants)
        } catch (e) {
            next(e)
        }
    }

    async getVacancies (req, res, next) {
        try {
            const vacancies = await UserService.getVacancies()
            return res.json(vacancies)
        } catch (e) {
            next(e)
        }
    }
    
    async order (req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const {description} = req.body
            const date = new Date().toLocaleString("ru-RU")
            const orderData = await UserService.order(refreshToken, description, date)
            return res.json(orderData)
        } catch (e) {
            next(e)
        }
    }

}



module.exports = new UserController()