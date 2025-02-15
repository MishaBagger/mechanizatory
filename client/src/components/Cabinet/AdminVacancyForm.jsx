import { useEffect, useState } from 'react'
import AdminService from '../../services/AdminService'
import AdminDeleteOrder from './AdminDeleteOrder'

import { useForm } from 'react-hook-form'

export default function AdminVacancyForm({
    setAddSuccess,
    setDeleteSuccess,
    catchErrors,
}) {
    const [getVacancies, setGetVacancies] = useState([])
    const [vacancyValue, setVacancyValue] = useState()

    const {
        register: createVacancy,
        handleSubmit: handleSubmitVacancy,
        formState: { errors: errorsVacancy },
    } = useForm({ mode: 'onBlur' })

    useEffect(() => {
        getVacanciesData()
    }, [])

    async function getVacanciesData() {
        try {
            const vacancies = await AdminService.getVacancies()
            setGetVacancies(vacancies.data)
        } catch (e) {
            catchErrors(e)
        }
    }

    function addVacancy(data, e) {
        e.preventDefault()
        const formData = new FormData()

        formData.append('vacancyTitle', data.vacancyTitle)
        formData.append('vacancyImage', data.vacancyImage[0])
        formData.append('vacancyLink', data.vacancyLink)

        requestAddVacancy(formData)

        e.target.reset()
    }
    async function requestAddVacancy(formData) {
        try {
            const response = await AdminService.addVacancy(formData)
            setAddSuccess(response.data)
            getVacanciesData()
            setTimeout(() => {
                setAddSuccess('')
            }, 5000)
        } catch (e) {
            catchErrors(e)
        }
    }

    function deleteVacancy(e) {
        e.preventDefault()
        requestDeleteVacancy()
        e.target.reset()
    }

    async function requestDeleteVacancy() {
        try {
            const deleteResponse = await AdminService.deleteVacancy(
                vacancyValue
            )
            setDeleteSuccess(deleteResponse.data)
            getVacanciesData()
            setTimeout(() => {
                setDeleteSuccess('')
            }, 5000)
        } catch (e) {
            catchErrors(e)
        }
    }

    return (
        <div className="CRUD__container">
            <form
                className="formOrder formOrder-admin"
                onSubmit={handleSubmitVacancy(addVacancy)}
                method="post"
                encType="multipart/form-data"
            >
                <h2 className="title title-form">Добавить вакансию</h2>
                <div className="formOrder__container formOrder__container-admin">
                    <input
                        type="text"
                        className="formInput"
                        id="vacancyTitle"
                        name="vacancyTitle"
                        placeholder="Заголовок вакансии*"
                        {...createVacancy('vacancyTitle', {
                            required: true,
                            minLength: 8,
                            maxLength: 30,
                            pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                        })}
                    />
                    {errorsVacancy.vacancyTitle &&
                        errorsVacancy.vacancyTitle.type === 'required' && (
                            <span className="error error-serviceTitle">
                                Необходимо заполнить
                            </span>
                        )}
                    {errorsVacancy.vacancyTitle &&
                        errorsVacancy.vacancyTitle.type === 'minLength' && (
                            <span className="error error-serviceTitle">
                                Минимальная длина 8 символов
                            </span>
                        )}
                    {errorsVacancy.vacancyTitle &&
                        errorsVacancy.vacancyTitle.type === 'maxLength' && (
                            <span className="error error-serviceTitle">
                                Максимальная длина 30 символов
                            </span>
                        )}
                    <input
                        type="file"
                        className="formInput"
                        id="vacancyImage"
                        name="vacancyImage"
                        placeholder="Изображение услуги*"
                        accept=".jpg, .jpeg, .png, .bmp, .tiff"
                        {...createVacancy('vacancyImage', {
                            required: true,
                        })}
                    />
                    {errorsVacancy.vacancyImage &&
                        errorsVacancy.vacancyImage.type === 'required' && (
                            <span className="error error-serviceImage">
                                Необходима фотография
                            </span>
                        )}

                    <input
                        type="text"
                        className="formInput"
                        id="vacancyLink"
                        name="vacancyLink"
                        placeholder="Ссылка на вакансию*"
                        {...createVacancy('vacancyLink', {
                            required: true,
                            minLength: 8,
                            maxLength: 80,
                            pattern:
                                /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                        })}
                    />
                    {errorsVacancy.vacancyLink && (
                        <>
                            {errorsVacancy.vacancyLink.type === 'required' && (
                                <span className="error error-serviceImage">
                                    Необходима ссылка
                                </span>
                            )}
                            {errorsVacancy.vacancyLink.type === 'minLength' && (
                                <span className="error error-serviceImage">
                                    Длина ссылки минимум 8 символов
                                </span>
                            )}
                            {errorsVacancy.vacancyLink.type === 'maxLength' && (
                                <span className="error error-serviceImage">
                                    Длина ссылки максимум 80 символов
                                </span>
                            )}
                            {errorsVacancy.vacancyLink.type === 'pattern' && (
                                <span className="error error-serviceImage">
                                    Неверный формат ссылки (https://)
                                </span>
                            )}
                        </>
                    )}

                    <button className="formButton">Добавить</button>
                </div>
            </form>

            <div className="CRUD__container-right">
                <form
                    className="formOrder formOrder-admin formOrder-delete"
                    onSubmit={deleteVacancy}
                    method="post"
                >
                    <h2 className="title title-form">Удалить вакансию</h2>
                    <select
                        className="formInput"
                        name="selectVacancy"
                        defaultValue={'DEFAULT'}
                        onChange={(e) => setVacancyValue(e.target.value)}
                    >
                        <option value="DEFAULT" disabled>
                            Выберите
                        </option>
                        {getVacancies &&
                            getVacancies.map((vacancy) => (
                                <option key={vacancy.id} value={vacancy.id}>
                                    #{vacancy.id}
                                    {': '}
                                    {vacancy.title}
                                </option>
                            ))}
                    </select>
                    <button className="formButton">Удалить</button>
                </form>
                <AdminDeleteOrder
                    setDeleteSuccess={setDeleteSuccess}
                    catchErrors={catchErrors}
                />
            </div>
        </div>
    )
}
