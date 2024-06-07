import React, { useState, useEffect, useRef } from 'react'
import QuoteButton from '../QuoteButton/QuoteButton'
import './MainContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

function MainContent() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef(null)

    const categoriesAndBrands = [
        'Smartphone', 'Consola', 'Televisor', 'Horno Eléctrico', 'Cafetera',
        'Pava Eléctrica', 'Tostadora', 'Plancha', 'Secadora de Pelo', 'Planchita de Pelo',
        'Notebook', 'Cava de Vino', 'Ventilador', 'Estufa', 'Microondas'
    ]

    const filteredItems = categoriesAndBrands
        .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 6) // Limitar a 6 resultados

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        if (event.target.value.length > 0) {
            setShowSuggestions(true)
        } else {
            setShowSuggestions(false)
        }
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
            console.log('event.target', event.target)
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [inputRef])

    return (
        <div>
            <div className="reparation-container">
                <section className="section-reparation">
                    <div className='reparation-top'>
                        <h1>¡Reparamos tu equipo!</h1>
                        <p>¿Se rompió tu equipo?</p>
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
                            <div className="suggestions-container">
                                {filteredItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => {
                                            console.log("Suggestion clicked:", item);
                                            handleSuggestionClick(item);
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link to="/services"><QuoteButton text="Cotizar Ahora" /></Link>
                    </div>
                </section>
            </div>
            <section className='features-container'>
                <ul className='features-list'>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Envios en</span>
                            <span className='feature-bold'>Todo el país</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Cuotas</span>
                            <span className='feature-bold'>Sin interés</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Garantía</span>
                            <span className='feature-bold'>Por 6 meses</span>
                        </div>
                    </li>
                    <li className='feature'>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <div className='feature-text'>
                            <span className='feature-light'>Diagnóstico</span>
                            <span className='feature-bold'>Bonificado</span>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default MainContent
