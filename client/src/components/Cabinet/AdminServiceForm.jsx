import { useEffect, useState } from 'react'
import AdminService from '../../services/AdminService'

import { useForm } from 'react-hook-form'
import AdminDeleteOrder from './AdminDeleteOrder'

export default function AdminServiceForm({ setAddSuccess, setDeleteSuccess, catchErrors }) {
    const [getServices, setGetServices] = useState([])
    const [serviceValue, setServiceValue] = useState()

    const {
        register: createService,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })

    useEffect(() => {
        getServicesData()
    }, [])

    async function getServicesData() {
        try {
            const services = await AdminService.getServices()
            setGetServices(services.data)
        } catch (e) {
            catchErrors(e)
        }
    }

    function addService(data, e) {
        e.preventDefault()
        const formData = new FormData()

        formData.append('serviceTitle', data.serviceTitle)
        formData.append('serviceDescription', data.serviceDescription)
        formData.append('serviceImage', data.serviceImage[0])

        requestService(formData)

        e.target.reset()
    }

    async function requestService(formData) {
        try {
            const response = await AdminService.addService(formData)
            setAddSuccess(response.data)
            getServicesData()
            setTimeout(() => {
                setAddSuccess('')
            }, 5000)
        } catch (e) {
            catchErrors(e)
        }
    }

    function deleteService(e) {
        e.preventDefault()
        requestDeleteService()
        e.target.reset()
    }

    async function requestDeleteService() {
        try {
            const deleteResponse = await AdminService.deleteService(
                serviceValue
            )
            setDeleteSuccess(deleteResponse.data)
            getServicesData()
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
                onSubmit={handleSubmit(addService)}
                method="post"
                encType="multipart/form-data"
            >
                <h2 className="title title-form">Добавить услугу</h2>
                <div className="formOrder__container formOrder__container-admin">
                    <input
                        type="text"
                        className="formInput"
                        id="serviceTitle"
                        name="serviceTitle"
                        placeholder="Заголовок услуги*"
                        {...createService('serviceTitle', {
                            required: true,
                            minLength: 8,
                            maxLength: 80,
                            pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                        })}
                    />
                    {errors.serviceTitle &&
                        errors.serviceTitle.type === 'required' && (
                            <span className="error error-serviceTitle">
                                Необходимо заполнить
                            </span>
                        )}
                    {errors.serviceTitle &&
                        errors.serviceTitle.type === 'minLength' && (
                            <span className="error error-serviceTitle">
                                Минимальная длина 8 символов
                            </span>
                        )}
                    {errors.serviceTitle &&
                        errors.serviceTitle.type === 'maxLength' && (
                            <span className="error error-serviceTitle">
                                Максимальная длина 40 символов
                            </span>
                        )}
                    <textarea
                        type="select"
                        placeholder="Описание услуги*"
                        name="serviceDescription"
                        id="serviceDescription"
                        maxLength={400}
                        className="formInput formInput-comment formInput-comment-serviceDescription"
                        {...createService('serviceDescription', {
                            required: true,
                        })}
                    ></textarea>
                    {errors.serviceDescription && (
                        <span className="error error-serviceDescription">
                            {errors.serviceDescription.type === 'required'
                                ? 'Необходимо заполнить'
                                : errors.serviceDescription.message}
                        </span>
                    )}
                    <input
                        type="file"
                        className="formInput"
                        id="serviceImage"
                        name="serviceImage"
                        placeholder="Изображение полезности*"
                        accept=".jpg, .jpeg, .png, .bmp, .tiff"
                        {...createService('serviceImage', {
                            required: true,
                        })}
                    />
                    {errors.serviceImage &&
                        errors.serviceImage.type === 'required' && (
                            <span className="error error-serviceImage">
                                Необходима фотография
                            </span>
                        )}

                    <button className="formButton">Добавить</button>
                </div>
            </form>

            <div className="CRUD__container-right">
                <form
                    className="formOrder formOrder-admin formOrder-delete"
                    onSubmit={deleteService}
                    method="post"
                >
                    <h2 className="title title-form">Удалить услугу</h2>
                    <select
                        className="formInput"
                        name="selectService"
                        defaultValue={'DEFAULT'}
                        onChange={(e) => setServiceValue(e.target.value)}
                    >
                        <option value="DEFAULT" disabled>
                            Выберите
                        </option>
                        {getServices &&
                            getServices.map((service) => (
                                <option key={service.id} value={service.id}>
                                    #{service.id}
                                    {': '}
                                    {service.title}
                                </option>
                            ))}
                    </select>
                    <button className="formButton">Удалить</button>
                </form>
                        <AdminDeleteOrder setDeleteSuccess={setDeleteSuccess} catchErrors={catchErrors}/>
            </div>
        </div>
    )
}
