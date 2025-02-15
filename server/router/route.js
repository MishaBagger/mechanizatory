const Router = require('express').Router
const router = Router()
const { body } = require('express-validator')
const UserController = require('../controllers/user-controller.js')
const AdminController = require('../controllers/admin-controller.js')
const authMiddleware = require('../middlewares/auth-middleware.js')
const adminMiddleware = require('../middlewares/admin-middleware.js')

const serviceMulterMiddleware = require('../middlewares/service-multer-middleware.js')
const importantMulterMiddleware = require('../middlewares/important-multer-middleware.js')
const vacancyMulterMiddleware = require('../middlewares/vacancy-multer-middleware.js')
const courseMulterMiddleware = require('../middlewares/course-multer-middleware.js')

// Логика обычного пользователя
router.post(
    '/register',
    body('password').isLength({ min: 8, max: 40 }),
    UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/order', UserController.order)
router.get('/services', UserController.getServices)
router.get('/importants', UserController.getImportants)
router.get('/vacancies', UserController.getVacancies)

// Логика зарегистрированного пользователя

router.get('/refresh', UserController.refresh)
router.get('/user/orders', authMiddleware, UserController.getUserOrders)
router.get('/user/courses', authMiddleware, UserController.getCourses)

// Логика администратора

router.get('/users', adminMiddleware, AdminController.getUsers)
router.get('/orders', adminMiddleware, AdminController.getOrders)
router.get('/clients', adminMiddleware, AdminController.getClients)
router.get('/courses', adminMiddleware, AdminController.getCourses)
router.get('/data/orders', adminMiddleware, AdminController.getAllOrders)


router.post(
    '/add/service',
    adminMiddleware,
    serviceMulterMiddleware.single('serviceImage'),
    AdminController.addService
)
router.post(
    '/add/important',
    adminMiddleware,
    importantMulterMiddleware.single('importantImage'),
    AdminController.addImportant
)
router.post(
    '/add/vacancy',
    adminMiddleware,
    vacancyMulterMiddleware.single('vacancyImage'),
    AdminController.addVacancy
)
router.post(
    '/add/course',
    adminMiddleware,
    courseMulterMiddleware.single('courseFile'),
    AdminController.addCourse
)
router.post('/delete/service', adminMiddleware, AdminController.deleteService)
router.post(
    '/delete/important',
    adminMiddleware,
    AdminController.deleteImportant
)
router.post(
    '/delete/vacancy',
    adminMiddleware,
    AdminController.deleteVacancy
)
router.post(
    '/delete/course',
    adminMiddleware,
    AdminController.deleteCourse
)
router.post('/delete/order', adminMiddleware, AdminController.deleteOrder)


module.exports = router
