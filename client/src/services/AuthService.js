import $api from "../http"

export default class AuthServce {
    static async login(login, password) {
        return $api.post('/login', {login, password})
    }
    static async register(login, password, username, email, phone) {
        return $api.post('/register', {login, password, username, email, phone})
    }
    static async logout() {
        return $api.post('/logout')
    }
}