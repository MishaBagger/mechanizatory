const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/db-connect.js'); // Импортируйте ваше подключение к базе данных
const User = require('./user-model.js'); // Импортируйте модель User

const Token = sequelize.define('Token', {
    userId: {
        type: DataTypes.INTEGER, // Убедитесь, что это соответствует типу ID вашей модели User
        allowNull: false,
        references: {
            model: User, // Ссылается на модель User
            key: 'id'    // Предположим, что первичный ключ в модели User - это 'id'
        }
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'tokens', // Указывает имя таблицы
    timestamps: false // Убрать или оставить: true, если хотите использовать createdAt и updatedAt
});

// Установите связь с моделью User
Token.belongsTo(User, {
    foreignKey: 'userId', // Используем внешний ключ userId
    targetKey: 'id',      // Указываем, что целевой ключ в модели User - id
    allowNull: false
});

// Если вы хотите синхронизировать модель с базой данных:
// Token.sync();

module.exports = Token;
