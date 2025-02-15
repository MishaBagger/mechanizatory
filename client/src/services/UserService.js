import $api from "../http"

export default class UserService {
    static getUserOrders() {
        return $api.get('/user/orders')
    }
    static getCourses() {
        return $api.get('/user/courses')
    }
    static getServices () {
        return $api.get('/services')
    }
    static getImportants () {
        return $api.get('/importants')
    }
    static getVacancies () {
        return $api.get('/vacancies')
    }
    static order (description) {
        return $api.post('/order', {description})
    }

}