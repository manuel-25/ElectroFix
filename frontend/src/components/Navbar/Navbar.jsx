import React, { useState } from 'react';
import './Navbar.css';
import QuoteButton from '../QuoteButton/QuoteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faTimes, faCircleQuestion, faPhone, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
//import MicrowaveIcon from '@mui/icons-material/Microwave';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <div className='navbar'>
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <button className='hamburger-button' onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} className={`hamburger-icon ${isMenuOpen ? 'hidden' : ''}`} />
                        </button>
                        <Link to="/" className="logo-container">
                            <h1 className="logo-left">Electro</h1>
                            <h1 className="logo-right">Fix!</h1>
                        </Link>
                    </div>
                    <nav className="navbar-links">
                        <Link to="/services" className="nav-link">Servicios</Link>
                        <Link to="/about" className="nav-link">Sobre Nosotros</Link>
                        <Link to="/contact" className="nav-link">Contacto</Link>
                    </nav>
                    <div className="navbar-right">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                        <Link to="/services"><QuoteButton text="Cotizar Ahora" /></Link>
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
                <Link to="/services"><QuoteButton text="Cotizar Ahora" /></Link>
                <ul className='sideMenu-links'>
                    <li>
                        <Link to="/services" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faUser} className="icon"/> <span>Ingresar</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faCircleQuestion} className="icon"/> <span>Servicios</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faUserFriends} className="icon"/> <span>Sobre Nosotros</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faPhone} className="icon"/> <span>Contacto</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
