import React, { useState } from 'react'
import './Navbar.css'
import QuoteButton from '../QuoteButton/QuoteButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faTimes, faCircleQuestion, faTools, faPhone, faUserFriends } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header>
            <div className='navbar'>
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <button className='hamburger-button' onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} className={`hamburger-icon ${isMenuOpen ? 'hidden' : ''}`} />
                        </button>
                        <div className="logo-container">
                            <h1 className="logo-left">Electro</h1>
                            <h1 className="logo-right">Fix!</h1>
                        </div>
                    </div>
                    <nav className="navbar-links">
                        <a href="#services" className="nav-link">Servicios</a>
                        <a href="#about" className="nav-link">Sobre Nosotros</a>
                        <a href="#contact" className="nav-link">Contacto</a>
                    </nav>
                    <div className="navbar-right">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                        <QuoteButton text="Cotizar Ahora" className="quote-button" />
                    </div>
                    <FontAwesomeIcon 
                        icon={faTimes} 
                        onClick={closeMenu} 
                        className={`close-icon ${isMenuOpen ? 'show' : ''}`} 
                    />
                </div>
            </div>
            {isMenuOpen && <div className="menu-overlay open" onClick={closeMenu}></div>}
            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                <QuoteButton text="Cotizar Ahora" className="quote-button" />
                <ul className='sideMenu-links'>
                    <li><a href="#services" className="nav-link" onClick={closeMenu}><FontAwesomeIcon icon={faCircleQuestion} className="icon"/> <span>Servicios</span></a></li>
                    <li><a href="#about" className="nav-link" onClick={closeMenu}><FontAwesomeIcon icon={faUserFriends} className="icon"/> <span>Sobre Nosotros</span></a></li>
                    <li><a href="#contact" className="nav-link" onClick={closeMenu}><FontAwesomeIcon icon={faPhone} className="icon"/> <span>Contacto</span></a></li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar
