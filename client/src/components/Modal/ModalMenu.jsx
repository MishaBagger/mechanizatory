import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../http/index'

export default function ModalMenu({ onClick }) {
    const [isSwap, setIsSwap] = useState(false)

    function swap () {
        setIsSwap(prev => !prev)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
        async function checkAuth() {
            try {
                const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                })
                localStorage.setItem('token', response.data.accessToken)
                window.location.href = '/cabinet'
                
            } catch (e) {
                console.log(e.response?.data?.message)
            }
        }
    }, [])

    return (
        <div className="modalMenu">
            <div className="modalMenu__container">
                <div className="modal">
                    <div className="modal__container modal__container-img">
                        {isSwap === false ? (
                            <img
                                src="/src/assets/img/register.png"
                                alt="register"
                            />
                        ) : (
                            <img src="/src/assets/img/login.png" alt="login" />
                        )}
                    </div>
                    <div className="modal__container modal__container-form">
                        {isSwap === false ? (<RegisterForm onClick={onClick} swap={swap}/>) : (<LoginForm onClick={onClick} swap={swap}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
