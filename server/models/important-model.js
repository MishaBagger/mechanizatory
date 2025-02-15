const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/db-connect.js'); // Импортируйте ваше подключение к базе данных

const Important = sequelize.define('Important', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    image: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    link: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    tableName: 'importants', // Указывает имя таблицы
    timestamps: false // Убрать или оставить: true, если хотите использовать createdAt и updatedAt
});

module.exports = Important;
