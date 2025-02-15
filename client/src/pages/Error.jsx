import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт navigate из react-router-dom
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Error({ title ='Error'}) {
    const navigate = useNavigate(); // Инициализируем navigate


    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // '/' на нужный URL для редиректа
        }, 5000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <Header/>
            <main className="main">
                <section className="error_component">
                    {title == 'Error' ? (<h1 className="title">Ой, кажется такой страницы не существует</h1>) : <h1 className="title">Ой, кажется вы не авторизовались</h1> }
                    <h2 className="subtitle">Перенаправление через 5 секунд...</h2>
                    <img className="error_component-image" src="/src/assets/img/error.png" alt="error" />
                </section>
            </main>
            <Footer/>
        </>
    );
}
