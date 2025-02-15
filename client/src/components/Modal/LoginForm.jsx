import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthService from '../../services/AuthService'

export default function LoginForm({ onClick, swap }) {
    const {
        register: login,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })

    const [loginError, setLoginError] = useState(false)

    function onSubmit(data) {
        authLogin(data)
    }

    if (loginError) {
        setTimeout(() => {
            setLoginError(false)
        }, 5000)
    }


    async function authLogin(data) {
        const { LoginLogin, LoginPassword } = data
        try {
            const response = await AuthService.login(LoginLogin, LoginPassword)
            localStorage.setItem('token', response.data.accessToken)
            window.location.href = '/cabinet'
        } catch (e) {
            console.log(e)
            setLoginError(e)
        }
    }
    return (
        <>
                    {loginError && (
                <div className="popup popup-error">
                    <h2 className="title title-popup">
                        {loginError.message}
                    </h2>
                    <p className="text text-popup">
                        {loginError.response.data.message}
                    </p>{' '}
                    <div className="popup__container">
                        {' '}
                        <hr className="line" />
                    </div>
                </div>
            )}
            <form
                className="modalForm"
                method="get"
                target="_blank"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="modalClose" onClick={onClick}>
                    X
                </span>
                <h2 className="title title-modal">Авторизация</h2>
                <input
                    type="text"
                    placeholder="Логин*"
                    name="LoginLogin"
                    id="LoginLogin"
                    className="formInput formInput-modal"
                    {...login('LoginLogin', {
                        minLength: 8,
                        maxLength: 40,
                        required: true,
                    })}
                />
                {errors.LoginLogin && errors.LoginLogin.type === 'required' && (
                    <span className="modal-error modal-error-loginLogin">
                        Необходимо заполнить
                    </span>
                )}
                <input
                    type="password"
                    placeholder="Пароль*"
                    name="LoginPassword"
                    id="LoginPassword"
                    className="formInput formInput-modal"
                    {...login('LoginPassword', {
                        minLength: 8,
                        maxLength: 40,
                        required: true,
                    })}
                />
                {errors.LoginPassword &&
                    errors.LoginPassword.type === 'required' && (
                        <span className="modal-error modal-error-loginPassword">
                            Необходимо заполнить
                        </span>
                    )}
                <button className="modalButton modalButton-auth">
                    Авторизоваться
                </button>
                <p className="text text-modal">
                    Ещё нет аккаунта?{' '}
                    <span className="swapper" onClick={swap}>
                        Регистрация
                    </span>
                </p>
            </form>
        </>
    )
}
