import React, { useEffect, useState } from 'react'

export default function Contacts() {
    const [mobileMap, setMobileMap] = useState(false)
    useEffect(() => {
        const fixedMap = () => {
            setMobileMap(window.innerWidth <= 768);
        };
    
        // Вызываем функцию сразу при монтировании
        fixedMap();
    
        window.addEventListener('resize', fixedMap);
    
        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', fixedMap);
        };
    }, []);
    return (
        <section className="contacts" id="contacts">
            <h2 className="title">Контакты</h2>
            <p className="text text-contacts">
                Вологда, Советский проспект, 113Б
            </p>
            <div className="contacts__container">
                <a
                    href="https://vk.com/mechanizatory"
                    className="contacts__button"
                    target="_blank"
                >
                    Подписаться на VK
                </a>
                <a
                    href="tel:+79210544011"
                    className="contacts__button"
                    target="_blank"
                >
                    +7 (921) 054-40-11
                </a>
                <a
                    href="https://yandex.ru/maps?ll=39.93095199999999778128767502%2C59.2042240000000035138327803&mode=routes&rtext=~59.2042240000000035138327803%2C39.93095199999999778128767502&z=17"
                    className="contacts__button"
                    target="_blank"
                >
                    Как доехать
                </a>
                <a href="#FormOrder" className="contacts__button">
                    Написать
                </a>
                <a
                    href="https://wa.me/+79210544011"
                    className="contacts__button"
                    target="_blank"
                >
                    WhatsApp
                </a>
            </div>

            <div className="contacts__map">
                {mobileMap ? (
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A03b8cb8ccc8751efada6f91c54ef4ee051cbcb2ed7f6dd0e12273fb7eca33d6b&amp;source=constructor"
                        width="400"
                        height="300"
                        frameBorder="0"
                    ></iframe>
                ) : (
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A03b8cb8ccc8751efada6f91c54ef4ee051cbcb2ed7f6dd0e12273fb7eca33d6b&amp;source=constructor"
                        width="1280"
                        height="450"
                        frameBorder="0"
                    ></iframe>
                )}
            </div>
        </section>
    )
}
