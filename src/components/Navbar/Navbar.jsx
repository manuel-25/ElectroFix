import React, { useState } from 'react';
import './Navbar.css'
import QuoteButton from '../QuoteButton/QuoteButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className={`hamburger-icon ${isMenuOpen ? 'hide' : ''}`} />
                    <div className='logo-container'>
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
                    <FontAwesomeIcon icon={faTimes} onClick={toggleMenu} className="close-icon" />
                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                    <QuoteButton text="Cotizar Ahora" />
                </div>
            </div>
        </header>
    )
}

export default Navbar