require('dotenv').config()
const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/db-connect.js')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
    uuid : {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    tableName: 'users', // Если хотите только 'User', можно убрать этот параметр
    timestamps: false // Добавьте true, если хотите использовать createdAt и updatedAt
});

module.exports = User;