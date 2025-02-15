const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/db-connect.js'); // Импортируйте ваше подключение к базе данных

const Vacancy = sequelize.define('Vacancies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.CHAR,
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
    tableName: 'vacancies', // Указывает имя таблицы
    timestamps: false // Убрать или оставить: true, если хотите использовать createdAt и updatedAt
});

module.exports = Vacancy;
