const ServiceModel = require('../models/service-model.js')
const ImportantModel = require('../models/important-model.js')
const UserModel = require('../models/user-model.js')
const OrderModel = require('../models/order-model.js')
const VacancyModel = require('../models/vacancy-model.js')
const CourseModel = require('../models/course-model.js')

const path = require('path')
const fs = require('fs')
class AdminService {
    async getUsers() {
        const users = UserModel.findAll()
        return users
    }

    async getOrders(trim = false) {
        const orders = await OrderModel.findAll()
        if (trim) {
            return orders.map((order) => {
                if (order.description && order.description.length > 40) {
                    // Обрезка описания, если оно длиннее 30 символов
                    order.description =
                        order.description.substring(0, 30) + '...'
                }
                return order // Возвращаем обновленный заказ
            })
        }
        return orders // Если trim = false, возвращаем все заказы как есть
    }

    async getClients() {
        try {
            // Получаем все заказы
            const orders = await OrderModel.findAll()

            // Извлекаем userId из заказов и получаем уникальные значения
            const userIds = [...new Set(orders.map((order) => order.userId))]

            // Получаем всех пользователей с нужными userId
            const users = await UserModel.findAll({ where: { id: userIds } })

            return { orders, users }
        } catch (e) {
            return false
        }
    }

    async getAdmin(id) {
        try {
            const admin = await UserModel.findOne({ where: { id } })

            if (admin.dataValues.role == 'admin') {
                return admin
            }
        } catch (e) {
            return false
        }
    }

    async getCourses() {
        try {
            const courses = await CourseModel.findAll()
            return courses
        } catch (e) {
            return false
        }
    }

    async addService(title, description, image) {
        try {
            const service = await ServiceModel.create({
                title,
                description,
                image,
            })
            return {
                ...service,
                messageDescription: `"${service.title}" успешно добавлен в слайдер услуг.`,
            }
        } catch (e) {
            return false
        }
    }

    async deleteService(id) {
        // Сначала находим запись по id
        const service = await ServiceModel.findOne({
            where: { id },
        })

        // Если запись найдена, получаем имя изображения
        if (service) {
            const imageName = service.image

            // Здесь можно вызвать ваш сервис для удаления файла
            const result = await deleteImageFile(imageName)

            async function deleteImageFile(imageName) {
                const filePath = path.join(
                    __dirname,
                    '..',
                    '..',
                    'server',
                    'public',
                    'images',
                    imageName
                )

                // Используйте fs.promises или любой другой метод для удаления файла
                try {
                    await fs.promises.unlink(filePath)
                    const success = `Файл ${imageName} удален с сервера.`
                    return success
                } catch (error) {
                    const failed = `Ошибка при удалении файла ${imageName}: фотография не найдена`
                    return failed
                }
            }

            // Затем удаляем запись из базы данных
            const deleted = await ServiceModel.destroy({
                where: { id },
            })

            return { messageDescription: result, success: deleted > 0 } // Возвращаем true, если запись была удалена
        }

        return false // Если запись не найдена, возвращаем false
    }

    async addImportant(title, description, image, link) {
        const isLinkValid =
            /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
                link
            )

        if (!isLinkValid) {
            return { message: 'Ссылка должна иметь валидный URL, начинающийся с "https://"', success: false }
        }

        try {
            const important = await ImportantModel.create({
                title,
                description,
                image,
                link,
            })
            return {
                ...important,
                messageDescription: `"${important.title}" успешно добавлен в слайдер полезностей.`,
                success: true
            }
        } catch (e) {
            return res.json({ messageDescription: e })
        }
    }

    async addVacancy(title, image, link) {
        const isLinkValid =
            /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
                link
            )

        if (!isLinkValid) {
            return { message: 'Ссылка должна иметь валидный URL, начинающийся с "https://"', success: false }
        }

        try {
            const vacancy = await VacancyModel.create({
                title,
                image,
                link,
            })
            return {
                ...vacancy,
                messageDescription: `"${vacancy.title}" успешно добавлена.`,
                success: true
            }
        } catch (e) {
            return res.json({ messageDescription: e })
        }
    }

    async addCourse(title, file) {

        try {
            const course = await CourseModel.create({
                title,
                file
            })
            return {
                ...course,
                messageDescription: `"${course.title}" успешно добавлен.`,
                success: true
            }
        } catch (e) {
            return res.json({ messageDescription: e })
        }
    }
    async deleteImportant(id) {
        // Сначала находим запись по id
        const important = await ImportantModel.findOne({
            where: { id },
        })

        // Если запись найдена, получаем имя изображения
        if (important) {
            const imageName = important.image

            // Здесь можно вызвать ваш сервис для удаления файла
            const result = await deleteImageFile(imageName)

            async function deleteImageFile(imageName) {
                const filePath = path.join(
                    __dirname,
                    '..',
                    '..',
                    'server',
                    'public',
                    'images',
                    imageName
                )

                // Используйте fs.promises или любой другой метод для удаления файла
                try {
                    await fs.promises.unlink(filePath)
                    const success = `Файл ${imageName} удален с сервера.`
                    return success
                } catch (error) {
                    const failed = `Ошибка при удалении файла ${imageName}: фотография не найдена`
                    return failed
                }
            }

            // Затем удаляем запись из базы данных
            const deleted = await ImportantModel.destroy({
                where: { id },
            })

            return { messageDescription: result, success: deleted > 0 } // Возвращаем true, если запись была удалена
        }

        return false // Если запись не найдена, возвращаем false
    }

    async deleteVacancy(id) {
        // Сначала находим запись по id
        const vacancy = await VacancyModel.findOne({
            where: { id },
        })

        // Если запись найдена, получаем имя изображения
        if (vacancy) {
            const imageName = vacancy.image

            // Здесь можно вызвать ваш сервис для удаления файла
            const result = await deleteImageFile(imageName)

            async function deleteImageFile(imageName) {
                const filePath = path.join(
                    __dirname,
                    '..',
                    '..',
                    'server',
                    'public',
                    'images',
                    imageName
                )

                // Используйте fs.promises или любой другой метод для удаления файла
                try {
                    await fs.promises.unlink(filePath)
                    const success = `Файл ${imageName} удален с сервера.`
                    return success
                } catch (error) {
                    const failed = `Ошибка при удалении файла ${imageName}: фотография не найдена`
                    return failed
                }
            }

            // Затем удаляем запись из базы данных
            const deleted = await VacancyModel.destroy({
                where: { id },
            })

            return { messageDescription: result, success: deleted > 0 } // Возвращаем true, если запись была удалена
        }

        return false // Если запись не найдена, возвращаем false
    }

    async deleteCourse(id) {
        // Сначала находим запись по id
        const course = await CourseModel.findOne({
            where: { id },
        })

        // Если запись найдена, получаем имя изображения
        if (course) {
            const fileName = course.file

            // Здесь можно вызвать ваш сервис для удаления файла
            const result = await deleteFile(fileName)

            async function deleteFile(fileName) {
                const filePath = path.join(
                    __dirname,
                    '..',
                    '..',
                    'server',
                    'public',
                    'courses',
                    fileName
                )

                // Используйте fs.promises или любой другой метод для удаления файла
                try {
                    await fs.promises.unlink(filePath)
                    const success = `Файл ${fileName} удален с сервера.`
                    return success
                } catch (error) {
                    const failed = `Ошибка при удалении файла ${fileName}: файл не найден`
                    return failed
                }
            }

            // Затем удаляем запись из базы данных
            const deleted = await CourseModel.destroy({
                where: { id },
            })

            return { messageDescription: result, success: deleted > 0 } // Возвращаем true, если запись была удалена
        }

        return false // Если запись не найдена, возвращаем false
    }

    async deleteOrder(id) {
        try {
            const order = await OrderModel.findOne({
                where: { id },
            })

            const user = await UserModel.findOne({
                where: { id: order.userId },
            })

            if (!order) {
                return false
            }

            const deleted = await OrderModel.destroy({
                where: { id },
            })

            return {
                messageDescription: `Заказ #${order.id} пользователя ${user.username} успешно удален.`,
                success: deleted > 0,
            }
        } catch (error) {
            return false
        }
    }
}

module.exports = new AdminService()
