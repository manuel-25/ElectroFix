import React, { useState, useEffect, useRef } from 'react'
import QuoteButton from '../QuoteButton/QuoteButton'
import './MainContent.css'
import { ReactTyped } from 'react-typed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStore, faTruck, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { brandLogos, reviews, detailedBrandsByCategory } from '../../utils/productsData'

function MainContent() {
  /* SEARCH BAR */
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)
  const navigate = useNavigate()

  // Función para filtrar items según el término de búsqueda
  const filteredItems = Object.values(detailedBrandsByCategory).flatMap(category => {
    // Limpiar el término de búsqueda y dividirlo en palabras clave
    const searchTerms = searchTerm.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');
  
    const matchingBrands = Object.entries(category.brands).flatMap(([brand, models]) => {
      const matchingModels = models
        .filter(model =>
          searchTerms.every(term => model.toLowerCase().includes(term))
        )
        .map(model => ({ category: category.name, brand, model }));
  
      // Verifica si todas las palabras clave coinciden con la marca o sus modelos
      if (searchTerms.every(term => brand.toLowerCase().includes(term)) || matchingModels.length > 0) {
        return matchingModels.length > 0
          ? matchingModels
          : [{ category: category.name, brand, model: '' }];
      }
  
      return [];
    });
  
    // Verifica si todas las palabras clave coinciden con la categoría
    if (matchingBrands.length === 0 && searchTerms.every(term => category.name.toLowerCase().includes(term))) {
      return Object.keys(category.brands).map(brand => ({
        category: category.name,
        brand,
        model: ''
      }));
    }
  
    return matchingBrands.length > 0 ? matchingBrands : [];
  }).slice(0, 6);
  
  
  
  

  const handleSearchChange = (event) => {
    const inputKeywords = event.target.value
    setSearchTerm(inputKeywords)
    setShowSuggestions(inputKeywords.length > 0)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion) => {
    const { category, brand, model } = suggestion
    navigate(`/reparacion-electrodomesticos?category=${encodeURIComponent(category || '')}&brand=${encodeURIComponent(brand || '')}&model=${encodeURIComponent(model || '')}`)
    setSearchTerm('')
    setShowSuggestions(false)
    inputRef.current.focus()
  }

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1))
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex(prevIndex => (prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
        handleSuggestionClick(filteredItems[selectedIndex])
      } else if (searchTerm) {
        const searchTermParts = searchTerm.split(' ')
        const model = searchTermParts.pop() // Último elemento es el modelo
        const brand = searchTermParts.pop() // Penúltimo elemento es la marca
        const category = searchTermParts.join(' ') // El resto es la categoría
        const categoryParam = encodeURIComponent(category || '')
        const brandParam = encodeURIComponent(brand || '')
        const modelParam = encodeURIComponent(model || '')
        navigate(`/reparacion-electrodomesticos?category=${categoryParam}&brand=${brandParam}&model=${modelParam}`)
      } else {
        navigate(`/reparacion-electrodomesticos`)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, filteredItems, searchTerm])

  const handleQuoteButtonClick = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
      handleSuggestionClick(filteredItems[selectedIndex])
    } else if (searchTerm) {
      const searchTermParts = searchTerm.split(' ')
      const model = searchTermParts.pop() // Último elemento es el modelo
      const brand = searchTermParts.pop() // Penúltimo elemento es la marca
      const category = searchTermParts.join(' ') // El resto es la categoría
      const categoryParam = encodeURIComponent(category || '')
      const brandParam = encodeURIComponent(brand || '')
      const modelParam = encodeURIComponent(model || '')
      navigate(`/reparacion-electrodomesticos?category=${categoryParam}&brand=${brandParam}&model=${modelParam}`)
    } else {
      navigate(`/reparacion-electrodomesticos`)
    }
  }

  // Animaciones de elementos
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    return (rect.top <= windowHeight * 0.75)
  }

  function handleScroll() {
    const elements = document.querySelectorAll('.animated-element')
    elements.forEach(element => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      if (isElementInViewport(element)) {
        element.classList.add('visible')
      } else if (rect.top < windowHeight) {
        element.classList.remove('visible')
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <div className="reparation-container">
        <section className="section-reparation">
          <div className='reparation-top'>
            <h1>Reparación de Electrodomésticos</h1>
            <h3>
              <ReactTyped strings={["¿Se rompió tu equipo? Búscalo"]} typeSpeed={50} />
            </h3>
          </div>
          <div className="reparation-bottom">
            <input
              type="text"
              placeholder="Buscar por categoría, marca o modelo"
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
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {`${item.category} ${item.brand} ${item.model}`}
                  </div>
                ))}
              </div>
            )}
            <QuoteButton text="Cotizar Ahora!" onClick={handleQuoteButtonClick} />
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
              <span className='feature-bold'>Por 90 días</span>
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
            <p>Trae tu electrodoméstico a nuestro local para un servicio más rápido.</p>
          </div>
          <div className='service-item'>
            <FontAwesomeIcon icon={faTruck} size="3x" className='service-icon' />
            <h3>Envialo por Correo</h3>
            <p>Envía tu equipo por correo a nuestra dirección por Andreani o Correo Argentino</p>
          </div>
          <div className='service-item'>
            <FontAwesomeIcon icon={faHome} size="3x" className='service-icon' />
            <h3>Retiro a Domicilio</h3>
            <p>Podemos recoger el equipo en tu domicilio, sujeto a disponibilidad según tu ubicación.
            </p>
          </div>
        </section>
      </article>
      <article className='brands-container animated-element vertical-animation'>
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
            <section className='reviews-section animated-element horizontal-animation'>
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
                    <a href="https://www.google.com/search?q=electrosafe+quilmes&sca_esv=a0e417c138758ffa&hl=es-419&gl=ar&sxsrf=ADLYWIL3yPa3TtrqufPpEYP-tPt-nsSfxQ%3A1718729648775&ei=sLtxZun6LovY1sQPp5eKsAQ&oq=electrosa&gs_lp=Egxnd3Mtd2l6LXNlcnAiCWVsZWN0cm9zYSoCCAAyChAjGIAEGCcYigUyChAjGIAEGCcYigUyExAuGIAEGBQYxwEYhwIYjgUYrwEyBRAAGIAEMgUQABiABDIFEAAYgAQyCxAuGIAEGMcBGK8BMgsQLhiABBjHARivATIFEAAYgAQyBRAAGIAESP0TUABYpQtwAHgBkAEAmAGUAaAB2AeqAQMyLje4AQPIAQD4AQGYAgmgAvMHwgIEECMYJ8ICCxAuGIAEGLEDGIMBwgIREC4YgAQYsQMY0QMYgwEYxwHCAgsQABiABBixAxiDAcICDhAAGIAEGLEDGIMBGIoFwgIIEC4YgAQYsQMYxwEYrwHCAggQABiABBixA8ICFBAuGIAEGLEDGIMBGMcBGI4FGK8BmAMAkgcDMC45oAefeA&sclient=gws-wiz-serp#ip=1&lrd=0x95a3332dc6e1e2eb:0x91e0a93b10ba873,1,,,," target="_blank" rel="noopener noreferrer">115 opiniones</a>
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
                <a href="https://wa.me/5491178967720" target="_blank" rel="noopener noreferrer">
                    <img src='/images/whatsappLogo.svg' alt='WhatsApp' />
                </a>
            </div>
        </div>
    )
}

export default MainContent