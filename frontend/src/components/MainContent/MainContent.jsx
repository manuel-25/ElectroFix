import React, { lazy, Suspense, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import './MainContent.css'
import { ReactTyped } from 'react-typed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faStore, faTruck, faHome, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { brandLogos, reviews, detailedBrandsByCategory } from '../../utils/productsData'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'
import _ from 'lodash'

const QuoteButton = lazy(() => import('../QuoteButton/QuoteButton'))
const MiniBanner = lazy(() => import('../MiniBanner/MiniBanner'))

function MainContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Memoizar el filtrado de items para evitar recálculos en cada renderizado
  const filteredItems = useMemo(() => {
    const searchTerms = searchTerm.toLowerCase().replace(/\s+/g, ' ').trim().split(' ')
    return Object.values(detailedBrandsByCategory)
      .flatMap(category => {
        const matchingBrands = Object.entries(category.brands).flatMap(([brand, models]) => {
          const matchingModels = models
            .filter(model => searchTerms.every(term => model.toLowerCase().includes(term)))
            .map(model => ({ category: category.name, brand, model }))
          if (searchTerms.every(term => brand.toLowerCase().includes(term)) || matchingModels.length > 0) {
            return matchingModels.length > 0
              ? matchingModels
              : [{ category: category.name, brand, model: '' }]
          }
          return []
        })
        if (matchingBrands.length === 0 && searchTerms.every(term => category.name.toLowerCase().includes(term))) {
          return Object.keys(category.brands).map(brand => ({
            category: category.name,
            brand,
            model: ''
          }))
        }
        return matchingBrands.length > 0 ? matchingBrands : []
      })
      .slice(0, 6)
  }, [searchTerm])

  const handleSearchChange = (event) => {
    const inputKeywords = event.target.value
    setSearchTerm(inputKeywords)
    setShowSuggestions(inputKeywords.length > 0)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = useCallback((suggestion) => {
    const { category, brand, model } = suggestion
    navigate(`/reparacion-electrodomesticos?category=${encodeURIComponent(category || '')}&brand=${encodeURIComponent(brand || '')}&model=${encodeURIComponent(model || '')}`)
    setSearchTerm('')
    setShowSuggestions(false)
    inputRef.current.focus()
  }, [navigate])

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex(prevIndex => {
        const newIndex = event.key === 'ArrowUp' ? (prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1)
          : (prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0)
        return newIndex
      })
    } else if (event.key === 'Enter' && selectedIndex >= 0 && selectedIndex < filteredItems.length) {
      handleSuggestionClick(filteredItems[selectedIndex])
    }
  }, [selectedIndex, filteredItems, handleSuggestionClick])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleScroll = useCallback(_.throttle(() => {
    const elements = document.querySelectorAll('.animated-element')
    elements.forEach(element => {
      const rect = element.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.75) {
        element.classList.add('visible')
      } else if (rect.top < window.innerHeight) {
        element.classList.remove('visible')
      }
    })
  }, 200), [])

  // Reviews Expand
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const [expandedReviews, setExpandedReviews] = useState({})

  const toggleExpand = (id) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  
  //Loading Section
  useEffect(() => {
    const handleLoad = () => setIsLoading(false)
    if (document.readyState === 'complete') {
      setIsLoading(false)
    } else {
      window.addEventListener('load', handleLoad)
    }
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Service de Electrodomésticos | Cotizá Online</title>
        <meta name="description" content="Reparamos Televisores, Heladeras, Microondas, Aspiradoras y más en Quilmes. Cotizá online y recibí diagnóstico sin cargo. Servicio técnico con retiro a domicilio." />
        
        {/* Open Graph para compartir en redes */}
        <meta property="og:title" content="Electrosafe | Service de Electrodomésticos" />
        <meta property="og:description" content="Solicitá tu cotización online para reparación de electrodomésticos. Garantía, calidad y atención personalizada." />
        <meta property="og:image" content="https://electrosafeweb.com/logo.png" />
        <meta property="og:url" content="https://electrosafeweb.com/reparacion-electrodomesticos" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servuce de Electrodomésticos | Electrosafe" />
        <meta name="twitter:description" content="Cotizá online tu reparación. Rápido, seguro y con garantía." />
        <meta name="twitter:image" content="https://electrosafeweb.com/logo.png" />

        {/* SEO técnico */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://electrosafeweb.com/" />
      </Helmet>
      <div className='mainContent-container'>
        <Suspense fallback={<Loading />}>
          <MiniBanner />
        </Suspense>
        <div className="reparation-container">
          <div className="reparation-bg-wrapper">
            <img
              src="/images/bannerPicture.webp"
              alt=""
              className="reparation-bg-img"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </div>
          <section className="section-reparation-glass">
            <div className='reparation-top'>
              <h1>Service de Electrodomésticos</h1>
              <h3 className="reparation-subtitle">
                <ReactTyped strings={["¿Se rompió tu equipo? Búscalo"]} typeSpeed={50} />
              </h3>
            </div>
            <div className="reparation-bottom">
              <input
                type="text"
                placeholder="Buscar por categoría, marca o modelo"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm && setShowSuggestions(true)}
                ref={inputRef}
              />
              {showSuggestions && (
                <div className="suggestions-container">
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
              <Suspense fallback={<Loading />}>
                <QuoteButton text="Cotizar Ahora!" onClick={() => handleSuggestionClick(filteredItems[selectedIndex] || {})} />
              </Suspense>
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
                <span className='feature-bold'>Por 30 días</span>
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
          <h2>Nuestros Servicios</h2>
          <section className='services-card-container'>
            <div className='service-item'>
              <FontAwesomeIcon icon={faStore} size="3x" className='service-icon'/>
              <h3>Visítanos</h3>
              <p>Trae tu electrodoméstico a nuestro local para un servicio más rápido.</p>
            </div>
            <div className='service-item'>
              <FontAwesomeIcon icon={faTruck} size="3x" className='service-icon' />
              <h3>Envialo</h3>
              <p>Envía tu equipo por correo a nuestra dirección por correo o UberFlash</p>
            </div>
            <div className='service-item'>
              <FontAwesomeIcon icon={faHome} size="3x" className='service-icon' />
              <h3>Retiro a Domicilio</h3>
              <p>Podemos recoger el equipo en tu domicilio, sujeto a disponibilidad según tu ubicación.
              </p>
            </div>
            <div className='service-item'>
              <FontAwesomeIcon icon={faHandHoldingDollar} size="3x" className='service-icon' />
              <h3>Presupuestos Membretados</h3>
              <p>Presupuestos con Membrete para presentar a quien corresponda.</p>
            </div>
          </section>
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
            <span className='rating-number'>5.0</span>
            <span className='stars-container'>
              <span className='star'></span>
              <span className='star'></span>
              <span className='star'></span>
              <span className='star'></span>
              <span className='star'></span>
            </span>
            <a href="https://www.google.com/search?q=electrosafe+quilmes&sca_esv=a0e417c138758ffa&hl=es-419&gl=ar&sxsrf=ADLYWIL3yPa3TtrqufPpEYP-tPt-nsSfxQ%3A1718729648775&ei=sLtxZun6LovY1sQPp5eKsAQ&oq=electrosa&gs_lp=Egxnd3Mtd2l6LXNlcnAiCWVsZWN0cm9zYSoCCAAyChAjGIAEGCcYigUyChAjGIAEGCcYigUyExAuGIAEGBQYxwEYhwIYjgUYrwEyBRAAGIAEMgUQABiABDIFEAAYgAQyCxAuGIAEGMcBGK8BMgsQLhiABBjHARivATIFEAAYgAQyBRAAGIAESP0TUABYpQtwAHgBkAEAmAGUAaAB2AeqAQMyLje4AQPIAQD4AQGYAgmgAvMHwgIEECMYJ8ICCxAuGIAEGLEDGIMBwgIREC4YgAQYsQMY0QMYgwEYxwHCAgsQABiABBixAxiDAcICDhAAGIAEGLEDGIMBGIoFwgIIEC4YgAQYsQMYxwEYrwHCAggQABiABBixA8ICFBAuGIAEGLEDGIMBGMcBGI4FGK8BmAMAkgcDMC45oAefeA&sclient=gws-wiz-serp#ip=1&lrd=0x95a3332dc6e1e2eb:0x91e0a93b10ba873,1,,,," target="_blank" rel="noopener noreferrer">122 opiniones</a>
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
                <p className={`review-comment ${expandedReviews[review.id] ? 'expanded' : 'collapsed'}`}>
                  {review.comment}
                </p>
                {review.comment.length > 200 && (
                  <button onClick={() => toggleExpand(review.id)} className="toggle-comment">
                    {expandedReviews[review.id] ? 'Ver menos' : 'Ver más'}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className='attribution'><span className='powered-by-google' title="Powered by Google"></span></p>
        </section>
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
            <div className='whatsapp-float'>
              <a 
                href="https://wa.me/5491170664306?text=Hola,%20me%20comunico%20desde%20la%20web%20de%20Electrosafe%20para%20recibir%20la%20mejor%20cotización." 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-16673611004/49hxCIfl_aUbEPy5zI4-'
                    })
                  }
                }}
              >
                <img src='/images/whatsappLogo.svg' alt='WhatsApp' />
              </a>
            </div>
      </div>
    </>
  )
}

export default React.memo(MainContent)
