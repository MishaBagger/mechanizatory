import { Link } from 'react-router-dom'
import { RouteClick } from '../../assets/js/scroll'

export default function NavLinks({
    children = 'header',
    onClick,
    toggle,
    cabinet,
}) {
    if (children === 'header') {
        return (
            <nav className="nav__links">
                <a href="/#about" className="link link-header">
                    О нас
                </a>
                <a href="/#news" className="link link-header">
                    Услуги
                </a>
                <a href="/#catalog" className="link link-header">
                    Каталог
                </a>
                <a href="/#reviews" className="link link-header">
                    Отзывы
                </a>
                <Link
                    to="/important"
                    className="link link-header"
                    onClick={toggle}
                >
                    Полезно
                </Link>
                <Link
                    to="/info"
                    className="link link-header"
                    onClick={RouteClick}
                >
                    Сведения об УЦ
                </Link>
                <a href="/#contacts" className="link link-header">
                    Контакты
                </a>
                {!cabinet && (
                    <a
                        href="/cabinet"
                        className="link link-header"
                        onClick={onClick}
                    >
                        <img src="/src/assets/img/cabinet.png" alt="cabinet" />
                    </a>
                )}

                <div className="nav__test nav__test-header">
                    {' '}
                    <a href="tel:+79210544011" className="link link-header">
                        <img src="/src/assets/img/phone.png" alt="phone" />
                        +7 (921) 054-40-11
                    </a>
                    <a
                        href="https://yandex.ru/maps?ll=39.93095199999999778128767502%2C59.2042240000000035138327803&mode=routes&rtext=~59.2042240000000035138327803%2C39.93095199999999778128767502&z=17"
                        target="_blank"
                        className="link link-header"
                    >
                        <img src="/src/assets/img/map.png" alt="map" />
                        Советский проспект, 113Б
                    </a>
                </div>
            </nav>
        )
    } else if (children === 'footer') {
        return (
            <nav className="nav__links nav__links-footer">
                <div className="nav__test nav__test-footer">
                    <div className="link__container">
                        <a href="/#about" className="link link-footer">
                            О нас
                        </a>{' '}
                        <a href="/#news" className="link link-footer">
                            Услуги
                        </a>{' '}
                        <a href="/#catalog" className="link link-footer">
                            Каталог
                        </a>{' '}
                        <a href="/#reviews" className="link link-footer">
                            Отзывы
                        </a>{' '}
                        <Link
                            to="/important"
                            className="link link-footer"
                            onClick={toggle}
                        >
                            Полезно
                        </Link>
                        <Link
                            to="/info"
                            className="link link-footer"
                            onClick={RouteClick}
                        >
                            Сведения об УЦ
                        </Link>{' '}
                        <a href="/#contacts" className="link link-footer">
                            Контакты
                        </a>
                    </div>
                </div>
                <div className="nav__test nav__test-footer">
                    <div className="link__container">
                        <a href="tel:+79210544011" className="link link-footer">
                            <img src="/src/assets/img/phone.png" alt="phone" />
                            +7 (921) 054-40-11
                        </a>
                        <a
                            href="mailto:mechanizatory@mail.ru"
                            className="link link-footer"
                            target="_blank"
                        >
                            <img src="/src/assets/img/mail.png" alt="mail" />
                            mechanizatory@mail.ru
                        </a>
                        <a
                            href="https://yandex.ru/maps?ll=39.93095199999999778128767502%2C59.2042240000000035138327803&mode=routes&rtext=~59.2042240000000035138327803%2C39.93095199999999778128767502&z=17"
                            target="_blank"
                            className="link link-footer"
                        >
                            <img src="/src/assets/img/map.png" alt="map" />
                            Советский проспект, 113Б
                        </a>
                        <a
                            href="https://vk.com/mechanizatory"
                            target="_blank"
                            className="link link-footer"
                        >
                            <img src="/src/assets/img/vk.png" alt="vk" />
                            Группа ВКонтакте
                        </a>
                        <a
                            href="https://t.me/+79210544011"
                            target="_blank"
                            className="link link-footer"
                        >
                            <img
                                src="/src/assets/img/telegram.png"
                                alt="telegram"
                            />
                            Чат Телеграм
                        </a>
                    </div>
                </div>{' '}
                <p className="text text-copyright">
                    © ИП Емцов Олег Глебович. 2024 год
                </p>
            </nav>
        )
    } else if (children === 'mobile') {
        return (
            <nav className="nav__links nav__links-mobile">
                <a href="/#about" className="link link-mobile" onClick={toggle}>
                    О нас
                </a>
                <a href="/#news" className="link link-mobile" onClick={toggle}>
                    Услуги
                </a>
                <a
                    href="/#catalog"
                    className="link link-mobile"
                    onClick={toggle}
                >
                    Каталог
                </a>
                <a
                    href="/#reviews"
                    className="link link-mobile"
                    onClick={toggle}
                >
                    Отзывы
                </a>
                <Link
                    to="/important"
                    className="link link-mobile"
                    onClick={toggle}
                >
                    Полезно
                </Link>
                <Link to="/info" className="link link-mobile" onClick={toggle}>
                    Сведения об УЦ
                </Link>
                <a
                    href="/#contacts"
                    className="link link-mobile"
                    onClick={toggle}
                >
                    Контакты
                </a>
                {!cabinet && (
                    <a href="#" className="link link-mobile" onClick={onClick}>
                        Личный кабинет
                    </a>
                )}

                <div className="nav__test nav__test-mobile">
                    {' '}
                    <a href="tel:+79210544011" className="link link-mobile">
                        <img src="/src/assets/img/phone.png" alt="phone" />
                        +7 (921) 054-40-11
                    </a>
                    <a
                        href="mailto:mechanizatory@mail.ru"
                        className="link link-mobile"
                        target="_blank"
                    >
                        <img src="/src/assets/img/mail.png" alt="mail" />
                        mechanizatory@mail.ru
                    </a>
                    <a
                        href="https://yandex.ru/maps?ll=39.93095199999999778128767502%2C59.2042240000000035138327803&mode=routes&rtext=~59.2042240000000035138327803%2C39.93095199999999778128767502&z=17"
                        target="_blank"
                        className="link link-mobile"
                    >
                        <img src="/src/assets/img/map.png" alt="map" />
                        Советский проспект, 113Б
                    </a>
                    <a
                        href="https://vk.com/mechanizatory"
                        target="_blank"
                        className="link link-mobile"
                    >
                        <img src="/src/assets/img/vk.png" alt="vk" />
                        Группа ВКонтакте
                    </a>
                    <a
                        href="https://t.me/+79210544011"
                        target="_blank"
                        className="link link-mobile"
                    >
                        <img
                            src="/src/assets/img/telegram.png"
                            alt="telegram"
                        />
                        Чат Телеграм
                    </a>
                </div>
            </nav>
        )
    }
}
