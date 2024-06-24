import React, { useState, useRef } from 'react'
import './Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

const faqs = [
    {
        question: "¿Cómo funciona nuestro servicio?",
        answer: "Nuestro servicio es sencillo. Usted realiza la cotización de su equipo en nuestra web y luego nos envía su electrodoméstico mediante correo, lo revisamos y le enviamos una cotización final. Una vez aprobado, realizamos la reparación, lo probamos y se lo devolvemos."
    },
    {
        question: "¿Cómo es el proceso de cotización?",
        answer: "La cotización web es estimada y se realizara una vez que recibimos y revisamos su electrodoméstico. Un técnico especializado evaluará el daño y le enviaremos un presupuesto detallado."
    },
    {
        question: "¿Qué opciones tengo para realizar el envío?",
        answer: "Puede enviar su electrodoméstico a través de Correo Argentino o Andreani."
    },
    {
        question: "¿Cómo se lleva a cabo la revisión del equipo?",
        answer: "Un técnico especializado revisará su electrodoméstico para identificar el problema y determinar las reparaciones necesarias."
    },
    {
        question: "¿Cuánto tardaré en recibir la cotización del producto?",
        answer: "Una vez que recibimos su electrodoméstico, el tiempo estimado para enviarle la cotización es de 2 a 3 días hábiles."
    },
    {
        question: "¿Hay distintas opciones de reparación?",
        answer: "Sí, ofrecemos varias opciones de reparación según el tipo de daño y el costo. Le proporcionaremos todas las opciones disponibles en la cotización."
    },
    {
        question: "¿Cómo se devuelve el equipo reparado?",
        answer: "Una vez reparado, le enviaremos su electrodoméstico a través del mismo servicio de mensajería que utilizó para enviarlo."
    },
    {
        question: "¿Mis datos están seguros?",
        answer: "Sí, tomamos la seguridad de sus datos muy en serio y utilizamos protocolos de seguridad para proteger su información personal."
    },
    {
        question: "¿Qué sucede si no estoy satisfecho con la reparación?",
        answer: "Si no está satisfecho con la reparación, contáctenos para resolver el problema. Ofrecemos garantía de hasta 6 meses."
    },
    {
        question: "¿Se puede realizar seguimiento?",
        answer: "Sí, puede hacer seguimiento del estado de su reparación a través de nuestro sitio web o contactándonos directamente."
    },
    {
        question: "¿Qué métodos de pago se aceptan?",
        answer: "Aceptamos tarjetas de crédito, débito, transferencias bancarias y mercado pago."
    },
    {
        question: "¿Por qué confiar en nosotros?",
        answer: "Contamos con años de experiencia y técnicos altamente calificados. Nuestro compromiso es ofrecer un servicio de alta calidad y rapidez."
    }
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
                        <p>Llámanos al</p>
                        <a href="tel:5491178967720"><FontAwesomeIcon icon={faPhone} className="social-icon" /> +54 911 7896-7720</a>
                    </div>
                    <div className="social-item">
                        <p>Envíanos un mail</p>
                        <a href="mailto:electrosafeservice@gmail.com"><FontAwesomeIcon icon={faEnvelope} className="social-icon" /> electrosafeservice@gmail.com</a>
                    </div>
                    <div className="social-item">
                        <p>Contactanos por</p>
                        <div className='social-logos'>
                            <a href="https://wa.me/5491178967720" target="_blank" rel="noopener noreferrer"><img src="/images/whatsappLogo.svg" alt="Logotipo de WhatsApp" /></a>
                            <a href="https://www.instagram.com/electrosafeok/" target="_blank" rel="noopener noreferrer"><img src="/images/Instagram.webp" alt="Logotipo de Instagram" /></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
