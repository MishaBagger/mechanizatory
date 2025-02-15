const AdminService = require('../service/admin-service.js')
const ExcelJS = require('exceljs')

class AdminController {
    async getUsers(req, res, next) {
        try {
            const users = await AdminService.getUsers()
            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Users')
            worksheet.columns = [
                {
                    header: 'Номер пользователя',
                    key: 'id',
                    width: 20,
                    style: { alignment: { horizontal: 'center' } },
                },
                {
                    header: 'Логин пользователя',
                    key: 'login',
                    width: 30,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Фамилия, Имя, Отчество пользователя',
                    key: 'username',
                    width: 50,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Email пользователя',
                    key: 'email',
                    width: 30,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Телефон пользователя',
                    key: 'phone',
                    width: 30,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Роль пользователя',
                    key: 'role',
                    width: 20,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'UUID пользователя',
                    key: 'uuid',
                    width: 50,
                    style: { alignment: { horizontal: 'left' } },
                },
            ]

            users.forEach((user) => {
                worksheet.addRow({
                    id: user.id,
                    login: user.login,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    uuid: user.uuid,
                })
            })

            worksheet.properties.defaultRowHeight = 20

            // Устанавливаем заголовки для загрузки файла
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=Users.xlsx'
            )

            // Записываем файл в ответ
            await workbook.xlsx.write(res)
            return res.end()
        } catch (e) {
            res.status(500).send('Ошибка при создании файла пользователей')
        }
    }

    async getOrders(req, res, next) {
        try {
            const orders = await AdminService.getOrders()
            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Orders')
            worksheet.columns = [
                {
                    header: 'Номер заказа',
                    key: 'id',
                    width: 20,
                    style: { alignment: { horizontal: 'center' } },
                },
                {
                    header: 'Номер пользователя',
                    key: 'userId',
                    width: 20,
                    style: { alignment: { horizontal: 'center' } },
                },
                {
                    header: 'Описание заказа',
                    key: 'description',
                    width: 100,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Дата заказа',
                    key: 'date',
                    width: 20,
                    style: { alignment: { horizontal: 'left' } },
                },
            ]

            orders.forEach((order) => {
                worksheet.addRow({
                    id: order.id,
                    userId: order.userId,
                    description: order.description,
                    date: order.date,
                })
            })

            worksheet.properties.defaultRowHeight = 20

            // Устанавливаем заголовки для загрузки файла
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=Orders.xlsx'
            )

            // Записываем файл в ответ
            await workbook.xlsx.write(res)
            return res.end()
        } catch (e) {
            res.status(500).send('Ошибка при создании файла заказов')
        }
    }

    async getClients(req, res, next) {
        try {
            const response = await AdminService.getClients()

            if (!response) {
                res.status(500).send('Ошибка при получении клиентов')
            }
            const orders = response.orders
            const users = response.users
            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Clients')
            worksheet.columns = [
                {
                    header: 'Номер заказа',
                    key: 'orderId',
                    width: 20,
                    style: { alignment: { horizontal: 'center' } },
                },
                {
                    header: 'Описание заказа',
                    key: 'orderDescription',
                    width: 100,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Дата заказа',
                    key: 'orderDate',
                    width: 20,
                    style: { alignment: { horizontal: 'left' } },
                },

                {
                    header: 'Номер клиента',
                    key: 'userId',
                    width: 20,
                    style: { alignment: { horizontal: 'center' } },
                },
                {
                    header: 'Фамилия, Имя, Отчество клиента',
                    key: 'userName',
                    width: 50,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Email клиента',
                    key: 'userEmail',
                    width: 30,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'Телефон клиента',
                    key: 'userPhone',
                    width: 30,
                    style: { alignment: { horizontal: 'left' } },
                },
                {
                    header: 'UUID клиента',
                    key: 'userUUID',
                    width: 50,
                    style: { alignment: { horizontal: 'left' } },
                },

                // Добавьте другие заголовки по мере необходимости
            ]

            // Заполняем данные в worksheet
            orders.forEach((order) => {
                const user = users.find((user) => user.id == order.userId) // Находим пользователя по userId
                worksheet.addRow({
                    orderId: order.id,
                    orderDescription: order.description,
                    orderDate: order.date,
                    userId: user.id,
                    userName: user.username,
                    userEmail: user.email,
                    userPhone: user.phone,
                    userUUID: user.uuid,
                })
            })

            worksheet.properties.defaultRowHeight = 20

            // Указываем, что нужно отправить файл в ответ
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=Clients.xlsx'
            )
            await workbook.xlsx.write(res)
            res.end()
        } catch (e) {
            res.status(500).send('Ошибка при создании файла заказов')
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const trim = true
            const allOrders = await AdminService.getOrders(trim)
            return res.json(allOrders)
        } catch (e) {
            next(e)
        }
    }

    async getCourses(req, res, next) {
        try {
            const courses = await AdminService.getCourses()
            return res.json(courses)
        } catch (e) {
            next(e)
        }
    }

    async addService(req, res, next) {
        try {
            const { serviceTitle, serviceDescription } = req.body

            if (!req.file) {
                return res.status(400).json({
                    messageTitle:
                        'Файл фотографии не загружен или формат не поддерживается!',
                })
            }

            const image = req.file.filename
            const serviceData = await AdminService.addService(
                serviceTitle,
                serviceDescription,
                image
            )
            if (serviceData) {
                res.status(201).json({
                    ...serviceData,
                    messageTitle: 'Услуга успешно добавлена!',
                })
            }
        } catch (e) {
            next(e)
        }
    }
    async deleteService(req, res, next) {
        try {
            const { serviceId } = req.body

            if (!serviceId) {
                return res.status(400).json({ message: 'Не выбрана услуга!' })
            }

            const serviceData = await AdminService.deleteService(serviceId)

            if (serviceData) {
                res.status(201).json({
                    ...serviceData,
                    messageTitle: 'Услуга успешно удалена!',
                })
            } else {
                res.status(404).json({
                    ...serviceData,
                    messageTitle: 'Услуга не найдена!',
                })
            }
        } catch (e) {
            next(e)
        }
    }

    async addImportant(req, res, next) {
        try {
            const { importantTitle, importantDescription, importantLink } = req.body

            if (!req.file) {
                return res.status(400).json({
                    message:
                        'Файл фотографии не загружен или формат не поддерживается!',
                })
            }

            const image = req.file.filename
            const importantData = await AdminService.addImportant(
                importantTitle,
                importantDescription,
                image,
                importantLink
            )
            if (importantData && importantData.success) {
                res.status(201).json({
                    ...importantData,
                    messageTitle: 'Полезность успешно добавлена!',
                })
            }
            else {
                res.status(400).json({
                    ...importantData,
                })
            }
        } catch (e) {
            next(e)
        }
    }
    async addVacancy(req, res, next) {
        try {
            const { vacancyTitle, vacancyLink } = req.body

            if (!req.file) {
                return res.status(400).json({
                    message:
                        'Файл фотографии не загружен или формат не поддерживается!',
                })
            }

            const image = req.file.filename
            const vacancyData = await AdminService.addVacancy(
                vacancyTitle,
                image,
                vacancyLink
            )
            if (vacancyData && vacancyData.success) {
                res.status(201).json({
                    ...vacancyData,
                    messageTitle: 'Вакансия успешно добавлена!',
                })
            }
            else {
                res.status(400).json({
                    ...vacancyData,
                })
            }
        } catch (e) {
            next(e)
        }
    }
    async addCourse(req, res, next) {
        try {

            const { courseTitle } = req.body

            if (!req.file) {
                return res.status(400).json({
                    message:
                        'Файл курса не загружен или формат не поддерживается!',
                })
            }

            const file = req.file.filename
            const courseData = await AdminService.addCourse(
                courseTitle,
                file
            )
            if (courseData && courseData.success) {
                res.status(201).json({
                    ...courseData,
                    messageTitle: 'Курс успешно добавлен!',
                })
            }
            else {
                res.status(400).json({
                    ...courseData,
                })
            }
        } catch (e) {
            next(e)
        }
    }
    async deleteImportant(req, res, next) {
        try {
            const { importantId } = req.body

            if (!importantId) {
                return res
                    .status(400)
                    .json({ messageTitle: 'Не выбрана полезность!' })
            }

            const importantData = await AdminService.deleteImportant(
                importantId
            )

            if (importantData) {
                res.status(201).json({
                    ...importantData,
                    messageTitle: 'Полезность успешно удалена!',
                })
            } else {
                res.status(404).json({
                    ...importantData,
                    messageTitle: 'Полезность не найдена!',
                })
            }
        } catch (e) {
            next(e)
        }
    }

    async deleteVacancy(req, res, next) {
        try {
            const { vacancyId } = req.body

            if (!vacancyId) {
                return res
                    .status(400)
                    .json({ messageTitle: 'Не выбрана вакансия!' })
            }

            const vacancyData = await AdminService.deleteVacancy(
                vacancyId
            )

            if (vacancyData) {
                res.status(201).json({
                    ...vacancyData,
                    messageTitle: 'Вакансия успешно удалена!',
                })
            } else {
                res.status(404).json({
                    ...vacancyData,
                    messageTitle: 'Вакансия не найдена!',
                })
            }
        } catch (e) {
            next(e)
        }
    }

    async deleteCourse(req, res, next) {
        try {
            const { courseId } = req.body

            if (!courseId) {
                return res
                    .status(400)
                    .json({ messageTitle: 'Не выбран курс!' })
            }

            const courseData = await AdminService.deleteCourse(
                courseId
            )

            if (courseData) {
                res.status(201).json({
                    ...courseData,
                    messageTitle: 'Курс успешно удален!',
                })
            } else {
                res.status(404).json({
                    ...courseData,
                    messageTitle: 'Курс не найден!',
                })
            }
        } catch (e) {
            next(e)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const { orderId } = req.body

            if (!orderId) {
                return res.status(400).json({ message: 'Не выбран заказ!' })
            }

            const orderData = await AdminService.deleteOrder(orderId)

            if (orderData) {
                res.status(201).json({
                    ...orderData,
                    messageTitle: 'Заказ успешно удален!',
                })
            } else {
                res.status(404).json({
                    ...orderData,
                    messageTitle: 'Заказ не найден!',
                })
            }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdminController()
