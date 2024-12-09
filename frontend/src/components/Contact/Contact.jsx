import React, { useState, useRef, useMemo } from 'react'
import './Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faqs } from '../../utils/productsData'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

const libraries = ["places"]
const locations = [
    { lat: -34.6428301, lng: -58.3745474, name: "Electrosafe Service Electrodomesticos (Llamados y Whatsapp)", url: "https://www.google.com.ar/maps/place/Electrosafe+Service+Electrodomesticos+(Llamados+y+Whatsapp)/@-34.6428257,-58.3771277,17z/data=!3m1!4b1!4m6!3m5!1s0x95a32f86a4e7a6f9:0x48efe2a55af0f759!8m2!3d-34.6428301!4d-58.3745474!16s%2Fg%2F11rtm81rkx?hl=es&entry=ttu" },
    { lat: -34.7213736, lng: -58.2693768, name: "Electrosafe Service (Llamadas y Whatsapp)", url: "https://www.google.com.ar/maps/place/Electrosafe+Service+(Llamadas+y+Whatsapp)/@-34.7213736,-58.2693768,17z/data=!3m1!4b1!4m6!3m5!1s0x95a3332dc6e1e2eb:0x91e0a93b10ba873!8m2!3d-34.721378!4d-58.2667965!16s%2Fg%2F1w113c0q?hl=es&entry=ttu" },
]

const Contact = () => {
    const [activeIndex, setActiveIndex] = useState(null)
    const faqRef = useRef(null)

    const handleToggle = index => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    const scrollToFAQ = () => {
        const faqElement = faqRef.current
        const offset = faqElement.getBoundingClientRect().top + window.pageYOffset - 100
        window.scrollTo({ top: offset, behavior: 'smooth' })
    }

    const GoogleMaps = () => {
        const { isLoaded, loadError } = useLoadScript({
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
            libraries,
        })

        const center = useMemo(() => ({ lat: -34.6428301, lng: -58.3745474 }), [])

        if (loadError) return <div>Error loading maps</div>
        if (!isLoaded) return <div>Loading...</div>

        return (
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={center}
                zoom={15}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false
                }}
            >
                {locations.map((location, index) => (
                    <MarkerF
                        key={index}
                        position={{ lat: location.lat, lng: location.lng }}
                        onClick={() => window.open(location.url, '_blank')}
                    />
                ))}
            </GoogleMap>
        )
    }

    return (
        <div className="contact-section">
            <section className="contact-content">
                <h1>¿Tenés alguna duda?</h1>
                <span>¿Necesitas ayuda con tu reparación?</span>
                <p>No dudes en contactarnos. Estamos acá para ayudarte.</p>
                <button className="contact-button" onClick={scrollToFAQ}>Soporte</button>
            </section>
            <section className="frequent-question-container" ref={faqRef}>
                {faqs.map((faq, index) => (
                    <div key={index} className="frequent-question">
                        <div className="question" onClick={() => handleToggle(index)}>
                            <p>{faq.question}</p>
                            <FontAwesomeIcon icon={faChevronDown} className={`rotate ${activeIndex === index ? 'up' : ''}`} />
                        </div>
                        <div className={`answer ${activeIndex === index ? 'active' : ''}`}>{faq.answer}</div>
                    </div>
                ))}
            </section>
            <section className="contact-socials">
                <h3>Contacto y Soporte</h3>
                <span>¿Seguís con dudas? ¡Comunicate!</span>
                <div className="socials-container">
                    <div className="social-item">
                        <p><FontAwesomeIcon icon={faPhone} className="social-icon" /> Llámanos a</p>
                        <div class="phone-numbers">
                            <p><strong>Barracas:</strong> <a href="tel:5491139148766">+54 911 3914-8766</a></p>
                            <p><strong>Quilmes:</strong> <a href="tel:5491178967720">+54 911 7896-7720</a></p>
                        </div>
                    </div>
                    <div className="social-item">
                        <p><FontAwesomeIcon icon={faEnvelope} className="social-icon" /> Envíanos un mail</p>
                        <a href="mailto:electrosafeservice@gmail.com" id='social-email'>electrosafeservice@gmail.com</a>
                    </div>
                    <div className="social-item">
                        <p>Nuestras redes sociales</p>
                        <div className='social-logos'>
                            <a href="https://wa.me/5491139148766" target="_blank" rel="noopener noreferrer">
                                <img src="/images/whatsappLogo.svg" alt="Logotipo de WhatsApp" id='contact-whatsapp'/>
                            </a>
                            <a href="https://www.instagram.com/electrosafeok/" target="_blank" rel="noopener noreferrer">
                                <img src="/images/Instagram.webp" alt="Logotipo de Instagram" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="branch-locations">
                    <h4>Nuestras sucursales</h4>
                    <div className="branch-items-container">
                        <div className="branch-item">
                            <p>Barracas:</p>
                            <span>Rocha 1752</span>
                        </div>
                        <div className="branch-item">
                            <p>Quilmes:</p>
                            <span>Av. Vicente López 770</span>
                        </div>
                    </div>
                </div>
                <div className="map-container">
                    <GoogleMaps />
                </div>
            </section>
        </div>
    )
}

export default Contact
