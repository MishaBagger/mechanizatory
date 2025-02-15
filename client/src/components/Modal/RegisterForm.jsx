import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthService from '../../services/AuthService'

export default function RegisterForm({ onClick, swap }) {
    const {
        register: registration,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })

    const [registerError, setRegisterError] = useState(false)

    function onSubmit(data) {
        // e.preventDefault()
        register(data)
    }
    if (registerError) {
        setTimeout(() => {
            setRegisterError(false)
        }, 5000)
    }

    async function register(data) {
        try {
            const {
                RegisterLogin,
                RegisterPassword,
                RegisterName,
                RegisterEmail,
                RegisterPhone,
            } = data
            const passwordProtect = String(RegisterPassword)
            const response = await AuthService.register(
                RegisterLogin,
                passwordProtect,
                RegisterName,
                RegisterEmail,
                RegisterPhone
            )
            localStorage.setItem('token', response.data.accessToken)
            window.location.href = '/cabinet'
        } catch (e) {
            console.log(e)
            setRegisterError(e)
        }
    }

    return (
        <>
            {registerError && (
                <div className="popup popup-error">
                    <h2 className="title title-popup">
                        {registerError.message}
                    </h2>
                    <p className="text text-popup">
                        {registerError.response.data.message}
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
                <h2 className="title title-modal">Регистрация</h2>
                <div className="modalMenu__block">
                    <input
                        type="text"
                        placeholder="Логин*"
                        name="RegisterLogin"
                        id="RegisterLogin"
                        className="formInput formInput-short formInput-modal"
                        {...registration('RegisterLogin', {
                            minLength: 8,
                            maxLength: 40,
                            required: true,
                        })}
                    />
                    {errors.RegisterLogin &&
                        errors.RegisterLogin.type === 'required' && (
                            <span className="modal-error modal-error-registerLogin">
                                Необходимо заполнить
                            </span>
                        )}
                    <input
                        type="password"
                        placeholder="Пароль*"
                        name="RegisterPassword"
                        id="RegisterPassword"
                        className="formInput formInput-short formInput-modal"
                        {...registration('RegisterPassword', {
                            minLength: 8,
                            maxLength: 40,
                            required: true,
                        })}
                    />
                    {errors.RegisterPassword &&
                        errors.RegisterPassword.type === 'required' && (
                            <span className="modal-error modal-error-registerPassword">
                                Необходимо заполнить
                            </span>
                        )}
                </div>
                <input
                    type="text"
                    placeholder="Фамилия, Имя, Отчество*"
                    name="RegisterName"
                    id="RegisterName"
                    className="formInput formInput-modal"
                    {...registration('RegisterName', {
                        required: true,
                        minLength: 2,
                        maxLength: 40,
                        pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                    })}
                />
                {errors.RegisterName &&
                    errors.RegisterName.type === 'required' && (
                        <span className="modal-error modal-error-registerName">
                            Необходимо заполнить
                        </span>
                    )}
                {errors.RegisterName &&
                    errors.RegisterName.type === 'minLength' && (
                        <span className="modal-error modal-error-registerName">
                            Минимальная длина 2 символа
                        </span>
                    )}
                {errors.RegisterName &&
                    errors.RegisterName.type === 'maxLength' && (
                        <span className="modal-error modal-error-registerName">
                            Максимальная длина 40 символов
                        </span>
                    )}
                <input
                    type="email"
                    placeholder="Электронная почта"
                    name="RegisterEmail"
                    id="RegisterEmail"
                    className="formInput formInput-modal"
                    {...registration('RegisterEmail', {
                        validate: (input) => {
                            if (input === '') {
                                return undefined
                            } else {
                                return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(
                                    input
                                )
                                    ? undefined
                                    : 'Неверный формат'
                            }
                        },
                    })}
                />
                {errors.RegisterEmail && (
                    <span className="modal-error modal-error-registerEmail">
                        {errors.RegisterEmail.message}
                    </span>
                )}
                <input
                    type="phone"
                    placeholder="Номер телефона*"
                    name="RegisterPhone"
                    id="RegisterPhone"
                    className="formInput formInput-modal"
                    {...registration('RegisterPhone', {
                        required: true,
                        maxLength: 30,
                        validate: (input) =>
                            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(
                                input
                            ) || 'Неверный формат',
                    })}
                />
                {errors.RegisterPhone && (
                    <span className="modal-error modal-error-registerPhone">
                        {errors.RegisterPhone.type === 'required'
                            ? 'Необходимо заполнить'
                            : errors.RegisterPhone.message}
                    </span>
                )}
                <button className="modalButton modalButton-register">
                    Зарегистрироваться
                </button>
                <p className="text text-modal">
                    Нажимая кнопку, Вы согласны на обработку{' '}
                    <a href="#">персональных данных</a>
                </p>
                <p className="text text-modal">
                    Уже есть аккаунт?{' '}
                    <span className="swapper" onClick={swap}>
                        Авторизоваться
                    </span>
                </p>
            </form>
        </>
    )
}
