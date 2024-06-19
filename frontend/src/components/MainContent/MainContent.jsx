import React, { useState, useEffect, useRef } from 'react'
import QuoteButton from '../QuoteButton/QuoteButton'
import './MainContent.css'
import { ReactTyped } from "react-typed";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStore, faTruck, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';

function MainContent() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef(null)
    const suggestionsRef = useRef(null)
    const navigate = useNavigate()

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

    const reviews = [
        {
            id: 1,
            name: 'Daniel Petrone',
            rating: 5,
            comment: 'Exelente atencion , muy buen trabajo y rapido, todo perfecto , muy recomendable',
            profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocLZermqMpgm-jmmOuqM5wQXxGtoUSSW0TKFje0IDSdYzZ57HA=w60-h60-p-rp-mo-br100',
            timeAgo: 'Hace un mes',
            url: 'https://www.google.com/maps/contrib/103782907861104787038/reviews/@-37.741386,-64.957331,6z/data=!4m3!8m2!3m1!1e1?hl=es-419&entry=ttu'
        },
        {
            id: 2,
            name: 'Eugenia Andujar',
            rating: 5,
            comment: 'Unos genios!! Arreglaron el ventilador en re poco tiempo y funciona re bien. Nos explicaron cada paso. Son muy amables. Muchas gracias! :)',
            profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKLTtxu6h20QVrZeama3LwfX55guZj3cVMCB8_H-ISt4QCIpg=w60-h60-p-rp-mo-br100',
            timeAgo: 'Hace 4 meses',
            url: 'https://www.google.com/maps/contrib/108126814334509832821?hl=es-419&ved=1t:31294&ictx=111'
        },
        {
            id: 3,
            name: 'Maria Florencia Gianni',
            rating: 5,
            comment: 'Super recomiendo! unos genios los chicos me solucionaron el problema de mi plancha de un dia para otro!',
            profilePic: 'https://lh3.googleusercontent.com/a-/ALV-UjUOuXbNU2y2reksHYdYpFBbB0OUiyqUWRxrLh3zVnrf6RhKqoc=w60-h60-p-rp-mo-br100',
            timeAgo: 'Hace 6 meses',
            url: 'https://www.google.com/maps/contrib/102927586818368431798?hl=es-419&ved=1t:31294&ictx=111'
        },
        {
            id: 4,
            name: 'Liliana Camaron',
            rating: 5,
            comment: 'Excelente atención, muy profesionales y  cumplen con los tiempos de entrega. Muy recomendables',
            profilePic: 'https://lh3.googleusercontent.com/a-/ALV-UjVjqMzU-Y_TdQRckdSy9N7mgcqEVPW476n8rXBd1EYlTu_IKHhNSg=w60-h60-p-rp-mo-br100',
            timeAgo: 'Hace 8 meses',
            url: 'https://www.google.com/maps/contrib/110487861240920629631?hl=es-419&ved=1t:31294&ictx=111'
        },
        {
            id: 5,
            name: 'Lucio Mejias',
            rating: 5,
            comment: 'Muy profesionales! Tenía una cava de vinos que parecía perdida y me la recuperaron! El mejor de service de Quilmes!',
            profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocL9AV7zpVhvbhxxJT3USnJ1YoZwefUGF55cGhVTV3PQP0WvXQ=w60-h60-p-rp-mo-br100',
            timeAgo: 'Hace un año',
            url: 'https://www.google.com/maps/contrib/112499526229381407473?hl=es-419&ved=1t:31294&ictx=111'
        },
        {
            id: 6,
            name: 'Rosana R. Kogan',
            rating: 4,
            comment: 'Pude reparar mi horno eléctrico, lo mejor es que lo retiraron a domicilio!',
            profilePic: 'https://lh3.googleusercontent.com/a-/ALV-UjUZviKLwMreDInY68ixgCsgYgicOf2yEX2YC3r75aaisf87ycM=w60-h60-p-rp-mo-br100',
            timeAgo: 'Hace un año',
            url: 'https://www.google.com/maps/contrib/110740870314712365654?hl=es-419&ved=1t:31294&ictx=111'
        },
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
        inputRef.current.focus()
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

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter') {
            navigate(`/reparacion-electrodomesticos?category=${encodeURIComponent(searchTerm)}`);
        }
    }

    return (
        <div>
            <div className="reparation-container">
                <section className="section-reparation">
                    <div className='reparation-top'>
                        <h1>Reparación de Electrodomésticos</h1>
                        <h3><ReactTyped strings={["¿Se rompió tu equipo? Buscalo"]} typeSpeed={50}></ReactTyped></h3>
                    </div>
                    <div className="reparation-bottom">
                        <input
                            type="text"
                            placeholder="Buscar electrodoméstico"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            ref={inputRef}
                            onKeyDown={handleSearchSubmit}
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
                <h2>Servicios de Reparación</h2>
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
                            <img src={logo.src} alt={logo.alt} className='brand-logo' loading="lazy"/>
                        </div>
                    ))}
                </section>
                <Link to="/reparacion-electrodomesticos">
                    <QuoteButton text="Cotizar Ahora" />
                </Link>
            </article>
            <section className='reviews-section'>
                <div className='title-review-container'>
                    <h2>Opiniones de Nuestros Clientes</h2>
                </div>
                <div className='review-location'>
                    <h2>
                        <span className='icon'></span>
                    </h2>
                    <p>Av. Vicente López 770 B1878, Quilmes, Provincia de Buenos Aires</p>
                </div>
                <p className='rating'>
                    <span className='rating-number'>4.7</span>
                    <span className='stars-container'>
                        <span className='star'></span>
                        <span className='star'></span>
                        <span className='star'></span>
                        <span className='star'></span>
                        <span className='star half'></span>
                    </span>
                    <a href="https://www.google.com/search?q=electrosafe+quilmes&sca_esv=a0e417c138758ffa&hl=es-419&gl=ar&sxsrf=ADLYWIL3yPa3TtrqufPpEYP-tPt-nsSfxQ%3A1718729648775&ei=sLtxZun6LovY1sQPp5eKsAQ&oq=electrosa&gs_lp=Egxnd3Mtd2l6LXNlcnAiCWVsZWN0cm9zYSoCCAAyChAjGIAEGCcYigUyChAjGIAEGCcYigUyExAuGIAEGBQYxwEYhwIYjgUYrwEyBRAAGIAEMgUQABiABDIFEAAYgAQyCxAuGIAEGMcBGK8BMgsQLhiABBjHARivATIFEAAYgAQyBRAAGIAESP0TUABYpQtwAHgBkAEAmAGUAaAB2AeqAQMyLje4AQPIAQD4AQGYAgmgAvMHwgIEECMYJ8ICCxAuGIAEGLEDGIMBwgIREC4YgAQYsQMY0QMYgwEYxwHCAgsQABiABBixAxiDAcICDhAAGIAEGLEDGIMBGIoFwgIIEC4YgAQYsQPCAg4QLhiABBixAxjRAxjHAcICChAAGIAEGEMYigXCAg4QLhiABBixAxiDARjUAsICExAuGIAEGLEDGEMYgwEYyQMYigXCAhMQLhiABBixAxjRAxhDGMcBGIoFwgIOEC4YgAQYsQMYxwEYrwHCAggQABiABBixA8ICFBAuGIAEGLEDGIMBGMcBGI4FGK8BmAMAkgcDMC45oAefeA&sclient=gws-wiz-serp#ip=1&lrd=0x95a3332dc6e1e2eb:0x91e0a93b10ba873,1,,,," target="_blank" rel="noopener noreferrer">115 opiniones</a>
                </p>
                <ul className='review-listing'>
                    {reviews.map(review => (
                        <li key={review.id} className='review-item'>
                            <a href={review.url} target="_blank" rel="noopener noreferrer"><img src={review.profilePic} alt={`${review.name}'s profile`} className='profile-pic' loading="lazy"/></a>
                            <div className='review-name'><a href={review.url} target="_blank" rel="noopener noreferrer">{review.name}</a></div>
                            <div className='review-details'>
                                <div className='review-rating'>
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={`/images/${i < review.rating ? 'star' : 'halfstar'}.svg`}
                                            alt={i < review.rating ? 'Star' : 'Half Star'}
                                            className='star-icon'
                                        />
                                    ))}
                                </div>
                                <div className='review-time'>{review.timeAgo}</div>
                            </div>
                            <p className='review-comment'>{review.comment}</p>
                        </li>
                    ))}
                </ul>
                <p className='attribution'><span className='powered-by-google' title="Powered by Google"></span></p>
            </section>
            <div className='whatsapp-float'>
                <a href="https://wa.me/01178967720" target="_blank" rel="noopener noreferrer">
                    <img src='/images/whatsappLogo.svg' alt='WhatsApp' />
                </a>
            </div>
        </div>
    )
}

export default MainContent
