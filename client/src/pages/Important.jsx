import Slider from '../components/Slider/Slider'
import Vacancy from '../components/Important/Vacancy'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { useState, useEffect } from 'react'
import UserService from '../services/UserService'

export default function Important() {
    const [vacancies, setVacancies] = useState()

    useEffect(() => {
        async function getVacancies() {
            try {
                const response = await UserService.getVacancies()
                setVacancies(response.data)
                console.log(response.data)
            } catch (error) {
                throw new Error(error)
            }
        }
        getVacancies()
    }, [])
    return (
        <>
            <Header />
            <main className="main">
                <section className="news">
                    <h1 className="title">Полезно знать</h1>
                    <div className="news__container">
                        <Slider>Important</Slider>
                    </div>
                </section>
                <section className="vacancy">
                    <h2 className="title">Возможные вакансии</h2>
                    {vacancies && vacancies.length > 0 ? (
                        <Vacancy vacancies={vacancies} />
                    ) : (
                        <p className="text">
                            Здесь будут возможные вакансии для обучающихся.
                        </p>
                    )}
                </section>
            </main>

            <Footer />
        </>
    )
}
