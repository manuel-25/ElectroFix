import React, { useState } from 'react';
import './Navbar.css';
import QuoteButton from '../QuoteButton/QuoteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faTimes, faCircleQuestion, faPhone, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleQuoteClick = () => {
        closeMenu();
    };

    return (
        <header>
            <div className="navbar">
                <div className="navbar-container">
                    {/* Logo y botón de menú hamburguesa */}
                    <div className="navbar-logo">
                        <button
                            className="hamburger-button"
                            onClick={toggleMenu}
                            aria-label="Abrir menú"
                            aria-expanded={isMenuOpen}
                            aria-controls="side-menu"
                        >
                            <FontAwesomeIcon icon={faBars} className={`hamburger-icon ${isMenuOpen ? 'hidden' : ''}`} />
                        </button>
                        <Link to="/" className="logo-container" onClick={closeMenu}>
                            <img className="logo" src="/ELECTROSAFEblack.svg" alt="Electrosafe" />
                        </Link>
                    </div>

                    {/* Enlaces de navegación principal */}
                    <nav className="navbar-links" aria-label="Navegación principal">
                        <NavLink to="/reparacion-electrodomesticos" text="Servicios" />
                        <NavLink to="/nosotros" text="Sobre Nosotros" />
                        <NavLink to="/contacto" text="Contacto" />
                    </nav>

                    {/* Elementos de la derecha en la barra de navegación */}
                    <div className="navbar-right">
                        <FontAwesomeIcon icon={faUser} className="user-icon" aria-label="Perfil de usuario" />
                        <Link to="/reparacion-electrodomesticos">
                            <QuoteButton text="Cotizar Ahora" onClick={handleQuoteClick} />
                        </Link>
                    </div>

                    {/* Ícono de cerrar menú */}
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={closeMenu}
                        className={`close-icon ${isMenuOpen ? 'show' : ''}`}
                        role="button"
                        aria-label="Cerrar menú"
                    />
                </div>
            </div>

            {/* Overlay de menú para móviles */}
            {isMenuOpen && <div className="menu-overlay open" onClick={closeMenu} aria-hidden="true"></div>}

            {/* Menú lateral para navegación en móviles */}
            <nav id="side-menu" className={`side-menu ${isMenuOpen ? 'open' : ''}`} aria-label="Menú lateral">
                <Link to="/reparacion-electrodomesticos">
                    <QuoteButton text="Cotizar Ahora" onClick={handleQuoteClick} />
                </Link>
                <ul className="sideMenu-links">
                    <SideMenuLink to="/reparacion-electrodomesticos" text="Ingresar" icon={faUser} closeMenu={closeMenu} />
                    <SideMenuLink to="/reparacion-electrodomesticos" text="Servicios" icon={faCircleQuestion} closeMenu={closeMenu} />
                    <SideMenuLink to="/nosotros" text="Sobre Nosotros" icon={faUserFriends} closeMenu={closeMenu} />
                    <SideMenuLink to="/contacto" text="Contacto" icon={faPhone} closeMenu={closeMenu} />
                </ul>
            </nav>
        </header>
    );
};

const NavLink = ({ to, text }) => (
    <Link to={to} className="nav-link">
        {text}
    </Link>
);

const SideMenuLink = ({ to, text, icon, closeMenu }) => (
    <li>
        <Link to={to} className="nav-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={icon} className="icon" /> <span>{text}</span>
        </Link>
    </li>
);

export default Navbar;
