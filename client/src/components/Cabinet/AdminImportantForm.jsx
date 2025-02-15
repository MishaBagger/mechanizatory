import { useEffect, useState } from 'react'
import AdminService from '../../services/AdminService'
import AdminDeleteOrder from './AdminDeleteOrder'

import { useForm } from 'react-hook-form'

export default function AdminImportantForm({
    setAddSuccess,
    setDeleteSuccess,
    catchErrors,
}) {
    const [getImportants, setGetImportants] = useState([])
    const [importantValue, setImportantValue] = useState()

    const {
        register: createImportant,
        handleSubmit: handleSubmitImportant,
        formState: { errors: errorsImportant },
    } = useForm({ mode: 'onBlur' })

    useEffect(() => {
        getImportantsData()
    }, [])

    async function getImportantsData() {
        try {
            const importants = await AdminService.getImportants()
            setGetImportants(importants.data)
        } catch (error) {
            console.log(error)
        }
    }

    function addImportant(data, e) {
        e.preventDefault()
        const formData = new FormData()

        formData.append('importantTitle', data.importantTitle)
        formData.append('importantDescription', data.importantDescription)
        formData.append('importantImage', data.importantImage[0])
        formData.append('importantLink', data.importantLink)

        requestAddImportant(formData)

        e.target.reset()
    }

    function deleteImportant(e) {
        e.preventDefault()
        requestDeleteImportant()
        e.target.reset()
    }

    async function requestAddImportant(formData) {
        try {
            const response = await AdminService.addImportant(formData)
            setAddSuccess(response.data)
            getImportantsData()
            setTimeout(() => {
                setAddSuccess('')
            }, 5000)
        } catch (e) {
            catchErrors(e)
        }
    }

    async function requestDeleteImportant() {
        try {
            const deleteResponse = await AdminService.deleteImportant(
                importantValue
            )
            setDeleteSuccess(deleteResponse.data)
            getImportantsData()
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
                onSubmit={handleSubmitImportant(addImportant)}
                method="post"
                encType="multipart/form-data"
            >
                <h2 className="title title-form">Добавить полезность</h2>
                <div className="formOrder__container formOrder__container-admin">
                    <input
                        type="text"
                        className="formInput"
                        id="importantTitle"
                        name="importantTitle"
                        placeholder="Заголовок полезности*"
                        {...createImportant('importantTitle', {
                            required: true,
                            minLength: 8,
                            maxLength: 80,
                            pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                        })}
                    />
                    {errorsImportant.importantTitle &&
                        errorsImportant.importantTitle.type === 'required' && (
                            <span className="error error-serviceTitle">
                                Необходимо заполнить
                            </span>
                        )}
                    {errorsImportant.importantTitle &&
                        errorsImportant.importantTitle.type === 'minLength' && (
                            <span className="error error-serviceTitle">
                                Минимальная длина 8 символов
                            </span>
                        )}
                    {errorsImportant.importantTitle &&
                        errorsImportant.importantTitle.type === 'maxLength' && (
                            <span className="error error-serviceTitle">
                                Максимальная длина 40 символов
                            </span>
                        )}
                    <textarea
                        type="select"
                        placeholder="Описание полезности*"
                        name="importantDescription"
                        id="importantDescription"
                        maxLength={400}
                        className="formInput formInput-comment formInput-comment-serviceDescription"
                        {...createImportant('importantDescription', {
                            required: true,
                        })}
                    ></textarea>
                    {errorsImportant.importantDescription && (
                        <span className="error error-serviceDescription">
                            {errorsImportant.importantDescription.type ===
                            'required'
                                ? 'Необходимо заполнить'
                                : errorsImportant.importantDescription.message}
                        </span>
                    )}
                    <input
                        type="file"
                        className="formInput"
                        id="importantImage"
                        name="importantImage"
                        placeholder="Изображение услуги*"
                        accept=".jpg, .jpeg, .png, .bmp, .tiff"
                        {...createImportant('importantImage', {
                            required: true,
                        })}
                    />
                    {errorsImportant.importantImage &&
                        errorsImportant.importantImage.type === 'required' && (
                            <span className="error error-serviceImage">
                                Необходима фотография
                            </span>
                        )}

                    <input
                        type="text"
                        className="formInput"
                        id="importantLink"
                        name="importantLink"
                        placeholder="Ссылка на полезность*"
                        {...createImportant('importantLink', {
                            required: true,
                            minLength: 8,
                            maxLength: 80,
                            pattern:
                                /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                        })}
                    />
                    {errorsImportant.importantLink && (
                        <>
                            {errorsImportant.importantLink.type ===
                                'required' && (
                                <span className="error error-serviceImage">
                                    Необходима ссылка
                                </span>
                            )}
                            {errorsImportant.importantLink.type ===
                                'minLength' && (
                                <span className="error error-serviceImage">
                                    Длина ссылки минимум 8 символов
                                </span>
                            )}
                            {errorsImportant.importantLink.type ===
                                'maxLength' && (
                                <span className="error error-serviceImage">
                                    Длина ссылки максимум 80 символов
                                </span>
                            )}
                            {errorsImportant.importantLink.type ===
                                'pattern' && (
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
                    onSubmit={deleteImportant}
                    method="post"
                >
                    <h2 className="title title-form">Удалить полезность</h2>
                    <select
                        className="formInput"
                        name="selectImportant"
                        defaultValue={'DEFAULT'}
                        onChange={(e) => setImportantValue(e.target.value)}
                    >
                        <option value="DEFAULT" disabled>
                            Выберите
                        </option>
                        {getImportants &&
                            getImportants.map((important) => (
                                <option key={important.id} value={important.id}>
                                    #{important.id}
                                    {': '}
                                    {important.title}
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
