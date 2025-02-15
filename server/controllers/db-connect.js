const { Sequelize } = require('sequelize');
require('dotenv').config()

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // или 'postgres', 'sqlite', 'mssql' в зависимости от вашей базы данных
    logging: false,   // отключаем логирование
});

module.exports = sequelize;