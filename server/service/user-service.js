const UserModel = require('../models/user-model.js')
const OrderModel = require('../models/order-model.js')
const ServiceModel = require('../models/service-model.js')
const ImportantModel = require('../models/important-model.js')
const VacancyModel = require('../models/vacancy-model.js')
const CourseModel = require('../models/course-model.js')

const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const tokenService = require('./token-service.js')
const { UserDto, UserDataDto } = require('../dtos/user-dto.js')
const ApiError = require('../exceptions/api-error.js')

class UserService {
    async registration(login, password, username, email, phone) {
        const loginCandidate = await UserModel.findOne({
            where: { login }, // Убедись, что здесь указано условие
        })

        if (loginCandidate) {
            throw ApiError.BadRequest(
                `Пользователь с таким логином ${login} уже существует`
            )
        }

        const phoneCandidate = await UserModel.findOne({
            where: { phone }, // Убедись, что здесь указано условие
        })

        if (phoneCandidate) {
            throw ApiError.BadRequest(
                `Пользователь с таким телефоном ${phone} уже существует`
            )
        }
        if (email == '') {
            email = 'Не указана'
        }
        const userUUID = uuid.v4()
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({
            login,
            password: hashPassword,
            username,
            email,
            phone,
            uuid: userUUID,
        })

        const userDto = new UserDto(user)
        const userDataDto = new UserDataDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: { ...userDto, ...userDataDto } }
    }

    async login(login, password) {
        const user = await UserModel.findOne({
            where: { login },
        })
        if (!user) {
            throw ApiError.BadRequest(
                `Пользователь с таким логином ${login} не найден`
            )
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        const userDto = new UserDto(user)
        const userDataDto = new UserDataDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: { ...userDto, ...userDataDto } }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnAuthorizedError()
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnAuthorizedError()
        }

        const user = await UserModel.findByPk(userData.id)
        const userDto = new UserDto(user)
        const userDataDto = new UserDataDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: { ...userDto, ...userDataDto } }
    }

    async order(refreshToken, description, date) {
        if (!refreshToken) {
            throw ApiError.UnAuthorizedError()
        }

        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnAuthorizedError()
        }

        const user = await UserModel.findByPk(userData.id)
        const order = await OrderModel.create({
            userId: userData.id,
            description,
            date,
        })
        const userDto = new UserDto(user)
        const userDataDto = new UserDataDto(user)

        return { order, user: { ...userDto, ...userDataDto } }
    }

    async getUserOrders(userId) {
        const orders = await OrderModel.findAll({
            where: { userId },
        })
        return orders
    }

    async getCourses() {
        const orders = await CourseModel.findAll()
        return orders
    }

    async getServices() {
        const services = await ServiceModel.findAll()
        return services
    }
    async getImportants() {
        const importants = await ImportantModel.findAll()
        return importants
    }
    async getVacancies() {
        const vacancies = await VacancyModel.findAll()
        return vacancies
    }
}

module.exports = new UserService()
