import { useState, useEffect } from 'react'
import NavLinks from './NavLinks'

export default function MobileMenu({ onClick, cabinet }) {
    const [isOpen, setIsOpen] = useState(false)

    function toggleMenu() {
        setIsOpen((prev) => !prev)
        // Добавляет к body класс mobile при открытии меню, убирает при закрытии (Х)
    }

    function hideMenu() {
        setIsOpen(false)
    }

    useEffect(() => {
        document.body.classList.toggle('mobile', isOpen)
    }, [toggleMenu, hideMenu])

    return (
        <div className="mobileMenu" id="mobileMenu">
            <input
                type="checkbox"
                id="burger-toggle"
                checked={isOpen}
                readOnly
            />
            <label
                htmlFor="burger-toggle"
                className={`burger__label`}
                id="burger__label"
                onClick={toggleMenu}
            >
                <span></span>
            </label>
            <div id="test" className={isOpen === true ? 'open' : ''}>
                {/* Если isOpen равно true, то className будет 'open', иначе — пустая строка ''. */}

                <NavLinks onClick={onClick} toggle={hideMenu} cabinet={cabinet}>
                    mobile
                </NavLinks>
            </div>
        </div>
    )
}
