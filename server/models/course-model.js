const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/db-connect.js'); // Импортируйте ваше подключение к базе данных

const Course = sequelize.define('Courses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    file: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    tableName: 'courses', // Указывает имя таблицы
    timestamps: false // Убрать или оставить: true, если хотите использовать createdAt и updatedAt
});

module.exports = Course;
