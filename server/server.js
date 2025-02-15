const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./controllers/db-connect.js')
const router = require('./router/route.js')
const errorMiddleware = require('./middlewares/error-middleware.js')
const PORT = process.env.PORT || 3000;

const User = require('./models/user-model.js'); // Файл модели User
const Token = require('./models/token-model.js'); // Файл модели Token
const Order = require('./models/order-model.js'); // Файл модели Order
const Service = require('./models/service-model.js'); // Файл модели Service
const Important = require('./models/important-model.js'); // Файл модели Important
const Vacancy = require('./models/vacancy-model.js'); // Файл модели Vacancy
const Course = require('./models/course-model.js'); // Файл модели Course

const app = express();
const path = require('path');

const start = async () => {
    try {
        sequelize.authenticate()
        .then(() => {
            console.log('Подключение к базе данных MySQL успешно');
        })
        .catch(err => {
            console.log('Подключение к базе данных MySQL провалилось:', err);
        });

        const tables = [
            { model: User, message: 'Таблица пользователей успешно синхронизирована' },
            { model: Token, message: 'Таблица токенов пользователей успешно синхронизирована' },
            { model: Order, message: 'Таблица заказов пользователей успешно синхронизирована' },
            { model: Service, message: 'Таблица слайдера услуг успешно синхронизирована' },
            { model: Important, message: 'Таблица слайдера полезностей успешно синхронизирована' },
            { model: Vacancy, message: 'Таблица вакансий успешно синхронизирована' },
            { model: Course, message: 'Таблица курсов успешно синхронизирована' }

        ];
        
        for (const table of tables) {
            const syncResult = await table.model.sync(); // Создание таблицы, если она не существует
            if (syncResult) {
                console.log(table.message);
            }
        }
        

        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'https://mechanizatory.ru' // Замените на ваш домен
}));
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)
app.use(express.static(path.join(__dirname, 'public')));

start()