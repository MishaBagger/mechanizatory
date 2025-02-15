import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function FormOrder( { formSended }) {

    const [disableForm, setDisableForm] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })

    function onSubmit(data, e) {
        e.preventDefault()

        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }
        fetch('/src/php/send.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json()) // Обрабатываем ответ как JSON
            .then((data) => {
                // for (const item in data) {
                //     console.log(`Успешно ${item} + ${data[item]}`)
                // }
                // Дальнейшая логика обработки данных... 
                // Внесение в базу данных или отправка на почту, логирование.
            })
            .catch((error) => {
                console.error('Ошибка:', error)
            })
        e.target.reset()
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        formSended()
        disableOrder()

    }   

    function disableOrder () {
        setDisableForm(true)

        setTimeout(() => {
            setDisableForm(false)
        }, 5000);
    }
    return (
        <form
            className="formOrder"
            id="FormOrder"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="title title-form">Запишитесь к нам!</h2>
            <div className="formOrder__container">
                <div className="formOrder__inner">
                    <input
                        type="text"
                        placeholder="Фамилия, Имя, Отчество*"
                        name="name"
                        id="name"
                        className="formInput"
                        {...register('name', {
                            required: true,
                            minLength: 2,
                            maxLength: 40,
                            pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                        })}
                        disabled={disableForm}/>
                    {errors.name && errors.name.type === 'required' && (
                        <span className="error">Необходимо заполнить</span>
                    )}
                    {errors.name && errors.name.type === 'minLength' && (
                        <span className="error">
                            Минимальная длина 2 символа
                        </span>
                    )}
                    {errors.name && errors.name.type === 'maxLength' && (
                        <span className="error">
                            Максимальная длина 40 символов
                        </span>
                    )}
                    <div className="formOrder__block">
                        {' '}
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            id="email"
                            className="formInput formInput-short"
                            {...register('email', {
                                validate: (input) => {
                                    if (input === '') {
                                        return undefined
                                    }
                                    else {
                                        return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(input) ? undefined : 'Неверный формат';
                                    }
                                },
                            })}
                            disabled={disableForm}/>
                        {errors.email && (
                            <span className="error error-email">
                                {errors.email.message}
                            </span>
                        )}
                        <input
                            type="tel"
                            placeholder="Телефон*"
                            name="phone"
                            id="phone"
                            className="formInput formInput-short"
                            {...register('phone', {
                                required: true,
                                maxLength: 30,
                                validate: (input) =>
                                    /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(
                                        input
                                    ) || 'Неверный формат',
                            })}
                            disabled={disableForm}/>
                        {errors.phone && (
                            <span className="error error-phone">
                                {errors.phone.type === 'required'
                                    ? 'Необходимо заполнить'
                                    : errors.phone.message}
                            </span>
                        )}
                    </div>

                    <textarea
                        type="select"
                        placeholder="Краткий комментарий*"
                        name="comment"
                        id="comment"
                        maxLength={100}
                        className="formInput formInput-comment"
                        {...register('comment', { required: true })}
                        disabled={disableForm}></textarea>
                    {errors.comment && (
                        <span className="error error-comment">
                            {errors.comment.type === 'required'
                                ? 'Необходимо заполнить'
                                : errors.comment.message}
                        </span>
                    )}
                    <button className="formButton" type="submit" disabled={!!errors.name || !!errors.phone || !!errors.comment || disableForm}>
                        Подать заявку
                    </button>
                    <p className="text text-form">
                        Нажимая кнопку, Вы согласны на обработку{' '}
                        <a
                            href="/src/assets/documents/Соглашение-об-использований-ПД-на-сайтах.pdf"
                            target="_blank"
                        >
                            персональных данных
                        </a>
                    </p>
                </div>
                <div className="formOrder__inner">
                    <img
                        src="/src/assets/img/form_image.png"
                        alt="form_image"
                    />
                </div>
            </div>
        </form>
    )
}
