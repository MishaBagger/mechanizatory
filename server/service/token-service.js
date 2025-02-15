const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model.js')
const sequelize = require('../controllers/db-connect.js')
const ApiError = require('../exceptions/api-error.js')
class TokenService {
    generateTokens (payload) { 
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '7d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }


    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }
        catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }
        catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({
            where: { userId } // Убедись, что здесь указано условие
        })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({userId, refreshToken})
        return token
    }

    async removeToken (refreshToken) {
        try {
            const [results] = await sequelize.query('DELETE FROM tokens WHERE refreshToken = ?', {
                replacements: [refreshToken]
            });
    
            return results;
        } catch (error) {
            throw ApiError.BadRequest('Вы уже разлогинились!');
        }
    }

    async findToken (refreshToken) {
        const tokenData = await tokenModel.findOne({
            where: {refreshToken}
        })
        return tokenData
    }
}

module.exports = new TokenService()