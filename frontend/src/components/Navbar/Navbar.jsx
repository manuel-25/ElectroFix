import React, { useContext, useState } from 'react'
import './Navbar.css'
import QuoteButton from '../QuoteButton/QuoteButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faTimes, faCircleQuestion, faPhone, faUserFriends, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext' // Importar el contexto de autenticación

function Navbar() {
    const { auth, logout } = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const handleQuoteClick = () => {
        closeMenu()
    }

    return (
        <header>
            <div className='navbar'>
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <button className='hamburger-button' onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} className={`hamburger-icon ${isMenuOpen ? 'hidden' : ''}`} />
                        </button>
                        <Link to="/" className="logo-container">
                            <img className='logo' src="/ELECTROSAFEblack.svg" alt="Electrosafe" />
                        </Link>
                    </div>
                    <nav className="navbar-links">
                        <Link to="/reparacion-electrodomesticos" className="nav-link">Servicios</Link>
                        <Link to="/nosotros" className="nav-link">Sobre Nosotros</Link>
                        <Link to="/contacto" className="nav-link">Contacto</Link>
                    </nav>
                    <div className="navbar-right">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                        <Link to="/reparacion-electrodomesticos">
                            <QuoteButton text="Cotizar Ahora" onClick={handleQuoteClick} />
                        </Link>
                        {auth?.token && (
                            <Link to="/" className="nav-link logout-link" onClick={() => { closeMenu(); logout(); }}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </Link>
                        )}
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
                <Link to="/reparacion-electrodomesticos">
                    <QuoteButton text="Cotizar Ahora" onClick={handleQuoteClick} />
                </Link>
                <ul className='sideMenu-links'>
                    { /*<li>
                        <Link to="/reparacion-electrodomesticos" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faUser} className="icon"/> <span>Ingresar</span>
                        </Link>
                    </li>*/ }
                    <li>
                        <Link to="/reparacion-electrodomesticos" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faCircleQuestion} className="icon"/> <span>Servicios</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/nosotros" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faUserFriends} className="icon"/> <span>Sobre Nosotros</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacto" className="nav-link" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faPhone} className="icon"/> <span>Contacto</span>
                        </Link>
                    </li>
                    {auth?.token && ( // Mostrar el botón de "Cerrar sesión" en el menú lateral solo si hay un token
                        <li>
                            <Link to="/" className="nav-link logout-link" onClick={() => { closeMenu(); logout(); }}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> <span>Cerrar Sesión</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    )
}

export default Navbar
