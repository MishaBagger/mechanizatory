import { useState } from 'react'
import AdminService from '../../services/AdminService'
import AdminImportantForm from './AdminImportantForm'
import AdminServiceForm from './AdminServiceForm'
import AdminVacancyForm from './AdminVacancyForm'
import AdminCourseForm from './AdminCourseForm'

export default function Admin({ response, logout }) {
    const [addSuccess, setAddSuccess] = useState()
    const [deleteSuccess, setDeleteSuccess] = useState()

    const [requestError, setRequestError] = useState()
    const [addSelect, setAddSelect] = useState()

    async function getUsers() {
        try {
            const response = await AdminService.getUsers()
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'users.xlsx') // Указываем имя файла при скачивании
            document.body.appendChild(link)
            link.click()
        } catch (e) {
            catchErrors(e)
        }
    }

    async function getOrders() {
        try {
            const response = await AdminService.getOrders()
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'orders.xlsx') // Указываем имя файла при скачивании
            document.body.appendChild(link)
            link.click()
        } catch (e) {
            catchErrors(e)
        }
    }
    async function getClients() {
        try {
            const response = await AdminService.getClients()
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'clients.xlsx') // Указываем имя файла при скачивании
            document.body.appendChild(link)
            link.click()
        } catch (e) {
            catchErrors(e)
        }
    }

    function catchErrors(e) {
        setRequestError(e.response.data)
        setTimeout(() => {
            setRequestError('')
        }, 5000)
    }

    return (
        <>
            {requestError && (
                <div className="popup popup-error">
                    <h2 className="title title-popup">Произошла ошибка!</h2>
                    <p className="text text-popup">
                        {requestError.message}
                    </p>{' '}
                    <div className="popup__container">
                        {' '}
                        <hr className="line" />
                    </div>
                </div>
            )}
            {addSuccess && (
                <div className="popup">
                    <h2 className="title title-popup">
                        {addSuccess.messageTitle}
                    </h2>
                    <p className="text text-popup">
                        {addSuccess
                            ? addSuccess.messageDescription
                            : 'Ошибка в данных, перепроверьте все поля.'}
                    </p>{' '}
                    <div className="popup__container">
                        {' '}
                        <hr className="line" />
                    </div>
                </div>
            )}
            {deleteSuccess && (
                <div className="popup">
                    <h2 className="title title-popup">
                        {deleteSuccess.messageTitle}
                    </h2>
                    <p className="text text-popup">
                        {deleteSuccess.success
                            ? deleteSuccess.messageDescription
                            : 'Случилась ошибка, удаление не произошло.'}
                    </p>{' '}
                    <div className="popup__container">
                        {' '}
                        <hr className="line" />
                    </div>
                </div>
            )}
            <section className="cabinet">
                <h1 className="title title-cabinet">Кабинет администратора</h1>
                <div className="cabinet__container">
                    <div className="cabinet__image">
                        <img
                            src="/src/assets/img/admin.png"
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
                            Разработчик: Mishanya_05@bk.ru
                        </h2>
                    </div>
                </div>
                <hr className="hr" />
                <div className="cabinet__buttons">
                    <button className="GetUsersButton" onClick={getClients}>
                        Заказы клиентов
                    </button>
                    <button className="GetUsersButton" onClick={getUsers}>
                        Все пользователи
                    </button>
                    <button className="GetUsersButton" onClick={getOrders}>
                        Все заказы
                    </button>
                </div>

                <div className="attention">
                    <p className="text text-attention">
                        Внимание! Все изображения новостей отображаются в
                        слайдере. Требуемое разрешение:{' '}
                        <span className="span-bold">1920px</span> x{' '}
                        <span className="span-bold">1080px</span> (16:9).
                        Поддерживаемые форматы изображений:{' '}
                        <span className="span-bold">.jpg</span>,{' '}
                        <span className="span-bold">.jpeg</span>,{' '}
                        <span className="span-bold">.png</span>,{' '}
                        <span className="span-bold">.BMP</span>,{' '}
                        <span className="span-bold">.TIFF</span>.
                    </p>
                </div>
            </section>

            <section className="CRUD">
                <h2 className="title">Изменение контента</h2>
                <div className="CRUD__wrapper">
                    <select
                        name="addSelect"
                        className="formInput"
                        onChange={(e) => setAddSelect(e.target.value)}
                    >
                        <option value="service">Услуги</option>
                        <option value="important">Полезности</option>
                        <option value="vacancies">Вакансии</option>
                        <option value="courses">Курсы</option>
                    </select>

                    {(() => {
                        switch (addSelect) {
                            case 'important':
                                return (
                                    <AdminImportantForm
                                        setAddSuccess={setAddSuccess}
                                        setDeleteSuccess={setDeleteSuccess}
                                        catchErrors={catchErrors}
                                    />
                                )

                            case 'vacancies':
                                return (
                                    <AdminVacancyForm
                                        setAddSuccess={setAddSuccess}
                                        setDeleteSuccess={setDeleteSuccess}
                                        catchErrors={catchErrors}
                                    />
                                )
                            case 'courses':
                                return (
                                    <AdminCourseForm
                                        setAddSuccess={setAddSuccess}
                                        setDeleteSuccess={setDeleteSuccess}
                                        catchErrors={catchErrors}
                                    />
                                )

                            default:
                                return (
                                    <AdminServiceForm
                                        setAddSuccess={setAddSuccess}
                                        setDeleteSuccess={setDeleteSuccess}
                                        catchErrors={catchErrors}
                                    />
                                )
                        }
                    })()}
                </div>
            </section>
        </>
    )
}
