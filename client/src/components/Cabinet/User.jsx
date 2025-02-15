import Slider from '../Slider/Slider'
import Contacts from '../Main/Contacts'
import { useEffect, useState } from 'react'
import UserService from '../../services/UserService'
import { SRC_URL } from '../../http/index'

export default function User({ response, logout }) {
    const [description, setDescription] = useState('')
    const [order, setOrder] = useState()
    const [userGetOrders, setUserGetOrders] = useState()
    const [userGetCourses, setUserGetCourses] = useState([])
    const [disableForm, setDisableForm] = useState()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
            checkCourses()
        }
    }, [])

    async function checkAuth() {
        try {
            const response = await UserService.getUserOrders()
            setUserGetOrders(response.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async function checkCourses() {
        try {
            const courses = await UserService.getCourses()
            setUserGetCourses(courses.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    function request(e) {
        e.preventDefault()
        orderForm(description)
        orderMail(description)
        e.target.reset()
    }

    async function orderForm(description) {
        try {
            const response = await UserService.order(description)
            setOrder(response.data)
            hide()
        } catch (e) {
            console.log(e)
        }
    }
    function orderMail(description) {
        const formData = new URLSearchParams()
        formData.append('username', response.data.user.username)
        formData.append('description', description)
        formData.append('phone', response.data.user.phone)
        formData.append('email_from', response.data.user.email)
        formData.append('uuid', response.data.user.uuid)

        // username=username&description=description&phone=phone&email_from=email_from&uuid=uuid

        fetch('/src/php/order.php', {
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
    }

    function hide() {
        setDisableForm(true)
        setTimeout(() => {
            setDisableForm(false)
            checkAuth()
        }, 5000)
    }

    return (
        <>
            {disableForm && (
                <div className="popup">
                    <h2 className="title title-popup">
                        Заявка успешно отправлена!
                    </h2>
                    <p className="text text-popup">
                        {order
                            ? `Заказ # ${order.order.id} успешно оформлен. Дата: ${order.order.date}`
                            : 'Ошибка в данных'}
                    </p>{' '}
                    <div className="popup__container">
                        {' '}
                        <hr className="line" />
                    </div>
                </div>
            )}
            <section className="cabinet">
                <h1 className="title title-cabinet">Личный кабинет</h1>
                <div className="cabinet__container">
                    <div className="cabinet__image">
                        <img
                            src="/src/assets/img/personal_cabinet.png"
                            alt="personal_cabinet"
                        />
                        <button className="quitButton" onClick={logout}>
                            Выйти
                        </button>
                    </div>
                    <div className="cabinet__person">
                        <h2 className="subtitle">
                            Здравствуйте, {response.data.user.username}
                        </h2>

                        <h2 className="subtitle">
                            Электронная почта: {response.data.user.email}
                        </h2>

                        <h2 className="subtitle">
                            Номер телефона: {response.data.user.phone}
                        </h2>
                    </div>
                </div>
                <hr className="hr" />
                <p className="text">
                    Ваш личный идентификатор:{' '}
                    <span className="span-bold">{response.data.user.uuid}</span>
                </p>
            </section>

            <section className="orders">
                <h2 className="title">Последние записи:</h2>
                {userGetOrders && userGetOrders.length > 0 ? (
                    <div className="ordersList">
                        {userGetOrders.map((order) => (
                            <div className="ordersList__container">
                                <p className="text">
                                    <span className="span-bold">
                                        Номер заказа:
                                    </span>{' '}
                                    #{order.id}
                                </p>
                                <p className="text">
                                    <span className="span-bold">
                                        Описание заказа:
                                    </span>{' '}
                                    {order.description}
                                </p>
                                <p className="text">
                                    <span className="span-bold">
                                        Дата заказа:
                                    </span>{' '}
                                    {order.date}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="text">
                            К сожалению, записей не обнаружено
                        </p>
                    </>
                )}
                {userGetOrders && userGetOrders.length > 9 ? (
                    <h3 className="subtitle">
                        Невозможно записаться более 9 раз.
                    </h3>
                ) : (
                    <form
                        className="formOrder"
                        id="FormOrder"
                        method="post"
                        onSubmit={request}
                    >
                        <h2 className="title title-form">Запишитесь к нам!</h2>
                        <div className="formOrder__container">
                            <div className="formOrder__inner">
                                <textarea
                                    placeholder="Краткий комментарий*"
                                    name="order"
                                    id="order"
                                    maxLength="100"
                                    required
                                    className="formInput formInput-comment"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    disabled={disableForm}
                                ></textarea>
                                <button
                                    className="formButton"
                                    type="submit"
                                    disabled={disableForm}
                                >
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
                )}

                <hr className="hr" />
            </section>
            <section className="courses">
                <h2 className="title">Учебные курсы</h2>
                <div className="courses__container">
                    {userGetCourses.map((course) => (
                        <a
                            href={`${SRC_URL}/courses/${course.file}`}
                            target="_blank"
                            className="courses__wrapper"
                            key={course.id}
                        >
                            <img
                                src="/src/assets/img/course.png"
                                alt="course"
                                key={course.title}
                            />
                            <p className="text" key={course.file}>
                                {course.title}
                            </p>
                        </a>
                    ))}
                </div>
                <hr className="hr" />
            </section>
            <section className="trying">
                <h2 className="title">Попробуйте также:</h2>
                <Slider>Services</Slider>
                <div className="trying__container">
                    <button
                        className="formButton"
                        type="submit"
                        onClick={() => (window.location.href = '#FormOrder')}
                    >
                        Попробовать
                    </button>
                </div>
            </section>
            <Contacts />
        </>
    )
}
