import $api from "../http"

export default class AdminService {
    
    static getUsers () {
        return $api.get('/users', {
            responseType: 'blob'
        })
    }

    static getOrders () {
        return $api.get('/orders', {
            responseType: 'blob'
        })
    }

    static getClients () {
        return $api.get('/clients', {
            responseType: 'blob'
        })
    }

    static getServices() {
        return $api.get('/services')
    }
    static getImportants() {
        return $api.get('/importants')
    }

    static getAllOrders() {
        return $api.get('/data/orders')
    }
    static getVacancies() {
        return $api.get('/vacancies')
    }
    static getCourses() {
        return $api.get('/courses')
    }
    static addService (formData) {
        return $api.post('/add/service', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static addImportant (formData) {
        return $api.post('/add/important', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static addVacancy (formData) {
        return $api.post('/add/vacancy', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static addCourse(formData) {
        return $api.post('/add/course', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static deleteService (serviceId) {
        return $api.post('/delete/service', {serviceId})
    }
    static deleteImportant (importantId) {
        return $api.post('/delete/important', {importantId})
    }
    static deleteVacancy (vacancyId) {
        return $api.post('/delete/vacancy', {vacancyId})
    }
    static deleteCourse (courseId) {
        return $api.post('/delete/course', {courseId})
    }
    static deleteOrder (orderId) {
        return $api.post('/delete/order', {orderId})
    }


}