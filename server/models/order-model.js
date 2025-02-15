const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/db-connect.js'); // Импортируйте ваше подключение к базе данных
const User = require('./user-model.js'); // Импортируйте модель User

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER, // Убедитесь, что это соответствует типу ID вашей модели User
        allowNull: false,
        references: {
            model: User, // Ссылается на модель User
            key: 'id'    // Предположим, что первичный ключ в модели User - это 'id'
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.CHAR,
        allowNull: false
    },
}, {
    tableName: 'orders', // Указывает имя таблицы
    timestamps: false // Убрать или оставить: true, если хотите использовать createdAt и updatedAt
});

// Установите связь с моделью User
Order.belongsTo(User, {
    foreignKey: 'userId', // Используем внешний ключ userId
    targetKey: 'id',      // Указываем, что целевой ключ в модели User - id
    allowNull: false
});

// Если вы хотите синхронизировать модель с базой данных:
// Order.sync();

module.exports = Order;
