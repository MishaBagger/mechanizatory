import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import ModalMenu from '../Modal/ModalMenu'
import { RouteClick } from '../../assets/js/scroll'

export default function Header({ cabinet }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1300)

    const [isModal, setIsModal] = useState(false)

    function showModal(event) {
        event.preventDefault()
        setIsModal((prev) => !prev)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1300)
        }

        window.addEventListener('resize', handleResize)

        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        document.body.classList.toggle('modal', isModal === true)
    }, [showModal])

    return (
        <>
            {isModal && <ModalMenu onClick={showModal}/>}
            {/* onClick={showModal} ЭТО КРЕСТИК */}
            {isMobile && <MobileMenu onClick={showModal} cabinet={cabinet}/>}
            {/* Открытие модального окна из мобильного меню */}

            <header className='header' id="header">
                <div className="header__container">
                    <div className="header__logo">
                        <Link to="/" onClick={RouteClick}>
                            <img
                                className="logo"
                                src="/src/assets/img/Logo_TZ.png"
                                alt="logo"
                            />
                        </Link>
                    </div>

                    {!isMobile && (
                        <NavLinks onClick={showModal} cabinet={cabinet}>header</NavLinks>
                    )}
                </div>
            </header>
        </>
    )
}
