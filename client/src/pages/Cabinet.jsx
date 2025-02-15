import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../http'
import Admin from '../components/Cabinet/Admin'
import User from '../components/Cabinet/User'
import AuthService from '../services/AuthService'
import Error from './Error'

export default function Cabinet() {
    const [response, setResponse] = useState()


    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
        async function checkAuth() {
            try {
                const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                })
                setResponse(response)
                localStorage.setItem('token', response.data.accessToken)
            } catch (e) {
                console.log(e.response?.data?.message)
            }
        }
    }, [])

    async function logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            setResponse(null)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    return (
        <>
            {response ? (
                <>
                    <Header cabinet />

                    <main className="main">
                        {response.data.user.role == 'admin' ? 
                        <Admin response={response} logout={logout}/> : <User response={response} logout={logout}/>}
                    </main>
                    <Footer />
                </>
            ) : (
                <>
                    <Error title={'UnAuthorized'}/>
                </>
            )}
        </>
    )
}
