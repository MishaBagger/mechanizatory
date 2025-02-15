import { useEffect, useState } from 'react'
import AdminService from '../../services/AdminService'
import AdminDeleteOrder from './AdminDeleteOrder'

import { useForm } from 'react-hook-form'

export default function AdminCourseForm({
    setAddSuccess,
    setDeleteSuccess,
    catchErrors,
}) {
    const [getCourses, setGetCourses] = useState([])
    const [courseValue, setCourseValue] = useState()

    const {
        register: createCourse,
        handleSubmit: handleSubmitCourse,
        formState: { errors: errorsCourse },
    } = useForm({ mode: 'onBlur' })

    useEffect(() => {
        getCoursesData()
    }, [])

    async function getCoursesData() {
        try {
            const courses = await AdminService.getCourses()
            setGetCourses(courses.data)
        } catch (e) {
            catchErrors(e)
        }
    }

    function addCourse(data, e) {
        e.preventDefault()
        const formData = new FormData()

        formData.append('courseTitle', data.courseTitle)
        formData.append('courseFile', data.courseFile[0])

        requestAddCourse(formData)

        e.target.reset()
    }
    async function requestAddCourse(formData) {
        try {
            const response = await AdminService.addCourse(formData)
            setAddSuccess(response.data)
            getCoursesData()
            setTimeout(() => {
                setAddSuccess('')
            }, 5000)
        } catch (e) {
            catchErrors(e)
        }
    }

    function deleteCourse(e) {
        e.preventDefault()
        requestDeleteCourse()
        e.target.reset()
    }

    async function requestDeleteCourse() {
        try {
            const deleteResponse = await AdminService.deleteCourse(
                courseValue
            )
            setDeleteSuccess(deleteResponse.data)
            getCoursesData()
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
                onSubmit={handleSubmitCourse(addCourse)}
                method="post"
                encType="multipart/form-data"
            >
                <h2 className="title title-form">Добавить курсы</h2>
                <div className="formOrder__container formOrder__container-admin">
                    <input
                        type="text"
                        className="formInput"
                        id="courseTitle"
                        name="courseTitle"
                        placeholder="Название курса*"
                        {...createCourse('courseTitle', {
                            required: true,
                            minLength: 8,
                            maxLength: 20,
                            pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                        })}
                    />
                    {errorsCourse.courseTitle &&
                        errorsCourse.courseTitle.type === 'required' && (
                            <span className="error error-serviceTitle">
                                Необходимо заполнить
                            </span>
                        )}
                    {errorsCourse.courseTitle &&
                        errorsCourse.courseTitle.type === 'minLength' && (
                            <span className="error error-serviceTitle">
                                Минимальная длина 8 символов
                            </span>
                        )}
                    {errorsCourse.courseTitle &&
                        errorsCourse.courseTitle.type === 'maxLength' && (
                            <span className="error error-serviceTitle">
                                Максимальная длина 20 символов
                            </span>
                        )}
                    <input
                        type="file"
                        className="formInput"
                        id="courseFile"
                        name="courseFile"
                        placeholder="Файл курса*"
                        accept=".jpg, .jpeg, .png, .bmp, .tiff, .docx, .odt, .rtf, .pdf, .pptx, .odp, .xlsx, .ods, .mp4, .mov, .wmi, .avi, .mp3, .wav, .m4a"
                        {...createCourse('courseFile', {
                            required: true,
                        })}
                    />
                    {errorsCourse.courseFile &&
                        errorsCourse.courseFile.type === 'required' && (
                            <span className="error error-serviceImage">
                                Необходим файл
                            </span>
                        )}


                    <button className="formButton">Добавить</button>
                </div>
            </form>

            <div className="CRUD__container-right">
                <form
                    className="formOrder formOrder-admin formOrder-delete"
                    onSubmit={deleteCourse}
                    method="post"
                >
                    <h2 className="title title-form">Удалить курсы</h2>
                    <select
                        className="formInput"
                        name="selectVacancy"
                        defaultValue={'DEFAULT'}
                        onChange={(e) => setCourseValue(e.target.value)}
                    >
                        <option value="DEFAULT" disabled>
                            Выберите
                        </option>
                        {getCourses &&
                            getCourses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    #{course.id}
                                    {': '}
                                    {course.title}
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
