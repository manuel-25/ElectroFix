import React, { useState, useEffect, useRef } from 'react'
import QuoteButton from '../QuoteButton/QuoteButton'
import './MainContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStore, faTruck, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function MainContent() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef(null)
    const suggestionsRef = useRef(null)

    const categories = [
        'Smartphone', 'Consola', 'Televisor', 'Horno Eléctrico', 'Cafetera',
        'Pava Eléctrica', 'Tostadora', 'Plancha', 'Secadora de Pelo', 'Planchita de Pelo',
        'Notebook', 'Cava de Vino', 'Ventilador', 'Estufa', 'Microondas'
    ]

    const brandLogos = [
        { src: '/brands/apple.png', alt: 'Apple' },
        { src: '/brands/Samsung.png', alt: 'Samsung' },
        { src: '/brands/Microsoft.png', alt: 'Microsoft' },
        { src: '/brands/Sony_Log.png', alt: 'Sony' },
        { src: '/brands/HP.png', alt: 'HP' },
        { src: '/brands/Dell.png', alt: 'Dell' },
        { src: '/brands/LG.png', alt: 'LG' },
        { src: '/brands/Lenovo.png', alt: 'Lenovo' },
        { src: '/brands/Nintendo.png', alt: 'Nintendo' },
        { src: '/brands/Huawei.png', alt: 'Huawei' },
        { src: '/brands/Motorola.png', alt: 'Motorola' },
        { src: '/brands/Asus.png', alt: 'Asus' },
        { src: '/brands/Acer.png', alt: 'Acer' },
        { src: '/brands/Xbox.png', alt: 'Xbox' },
        { src: '/brands/Philips.png', alt: 'Philips' },
        { src: '/brands/TCL.png', alt: 'TCL' },
        { src: '/brands/HIsense.png', alt: 'Hisense' },
        { src: '/brands/BGH.png', alt: 'BGH' },
        { src: '/brands/Bangho.png', alt: 'Bangho' },
        { src: '/brands/Alcatel.png', alt: 'Alcatel' },
    ]

    let filteredItems = categories
        .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 6)

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setShowSuggestions(event.target.value.length > 0)
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion)
        setShowSuggestions(false)
    }

    const handleFocus = () => {
        if (searchTerm.length > 0) {
            setShowSuggestions(true)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current && !inputRef.current.contains(event.target) &&
                suggestionsRef.current && !suggestionsRef.current.contains(event.target)
            ) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [inputRef, suggestionsRef])

    return (
        <div>
            <div className="reparation-container">
                <section className="section-reparation">
                    <div className='reparation-top'>
                        <h1>¡Reparamos tu equipo!</h1>
                        <p>¿Se rompió tu equipo? Buscalo</p>
                    </div>
                    <div className="reparation-bottom">
                        <input
                            type="text"
                            placeholder="Buscar electrodoméstico"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            ref={inputRef}
                        />
                        {showSuggestions && (
                            <div className="suggestions-container" ref={suggestionsRef}>
                                {filteredItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link to={`/reparacion-electrodomesticos?category=${encodeURIComponent(searchTerm)}`}>
                            <QuoteButton text="Cotizar Ahora" />
                        </Link>
                    </div>
                </section>
            </div>
            <section className='features-container'>
                <ul className='features-list'>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} className='feature-icon' />
                        <div className='feature-text'>
                            <span className='feature-light'>Envios en</span>
                            <span className='feature-bold'>Todo el país</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} className='feature-icon' />
                        <div className='feature-text'>
                            <span className='feature-light'>Cuotas</span>
                            <span className='feature-bold'>Sin interés</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} className='feature-icon' />
                        <div className='feature-text'>
                            <span className='feature-light'>Garantía</span>
                            <span className='feature-bold'>Por 6 meses</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} className='feature-icon' />
                        <div className='feature-text'>
                            <span className='feature-light'>Diagnóstico</span>
                            <span className='feature-bold'>Gratis</span>
                        </div>
                    </li>
                </ul>
            </section>
            <article className='services-container'>
                <h2>Nuestros servicios</h2>
                <section className='services-card-container'>
                    <div className='service-item'>
                        <FontAwesomeIcon icon={faStore} size="3x" className='service-icon'/>
                        <h3>Visítanos</h3>
                        <p>Trae tu electrodoméstico a nuestro local.</p>
                    </div>
                    <div className='service-item'>
                        <FontAwesomeIcon icon={faTruck} size="3x" className='service-icon' />
                        <h3>Envialo</h3>
                        <p>Envía tu equipo por correo a nuestra dirección por Andreani o Correo Argentino</p>
                    </div>
                    <div className='service-item'>
                        <FontAwesomeIcon icon={faHome} size="3x" className='service-icon'/>
                        <h3>Nosotros lo buscamos</h3>
                        <p>Pasamos a buscar el equipo por tu casa (Sujeto a ubicación)</p>
                    </div>
                </section>
            </article>
            <article className='brands-container'>
                <h2>Trabajamos con todas las marcas</h2>
                <h3>Las mejores marcas a tu servicio</h3>
                <section className='brands-logo-container'>
                    {brandLogos.map((logo, index) => (
                        <div key={index} className='brand-logo-item'>
                            <img src={logo.src} alt={logo.alt} className='brand-logo' />
                        </div>
                    ))}
                </section>
                <Link to="/reparacion-electrodomesticos">
                    <QuoteButton text="Cotizar Ahora" />
                </Link>
            </article>
            <a href="https://wa.me/5491136106124" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <img src="/images/whatsappLogo.svg" alt="WhatsApp" />
            </a>
        </div>
    )
}

export default MainContent
