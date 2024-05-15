import React from 'react'
import './Navbar.css'
import QuoteButton from '../QuoteButton/QuoteButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1>
                        <span className="logo-left">Electro</span>
                        <span className="logo-right">Fix!</span>
                    </h1>
                </div>
                <nav className="navbar-links">
                    <a href="#services" className="nav-link">Servicios</a>
                    <a href="#about" className="nav-link">Sobre Nosotros</a>
                    <a href="#contact" className="nav-link">Contacto</a>
                </nav>
                <div className="navbar-right">
                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                    <QuoteButton text="Cotizar Ahora" />
                </div>
            </div>
        </header>
    )
}

export default Navbar