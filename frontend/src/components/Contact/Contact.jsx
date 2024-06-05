import React, { useState, useRef } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importar icono de WhatsApp correctamente

const faqs = [
    {
        question: "¿Cómo funciona nuestro servicio?",
        answer: "Nuestro servicio es sencillo. Usted nos envía su electrodoméstico mediante correo, lo revisamos y le enviamos una cotización parcial. Una vez aprobado, realizamos la reparación y se lo devolvemos."
    },
    {
        question: "¿Cómo es el proceso de cotización?",
        answer: "La cotización es parcial y se realiza una vez que recibimos y revisamos su electrodoméstico. Un técnico especializado evaluará el daño y le enviaremos un presupuesto detallado."
    },
    {
        question: "¿Qué opciones tengo para realizar el envío?",
        answer: "Puede enviar su electrodoméstico a través de Correo Argentino o Andreani. Ambas opciones garantizan una entrega segura y rastreable."
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
        answer: "Si no está satisfecho con la reparación, contáctenos para resolver el problema. Ofrecemos garantía por nuestro trabajo."
    },
    {
        question: "¿Se puede realizar seguimiento?",
        answer: "Sí, puede hacer seguimiento del estado de su reparación a través de nuestro sitio web o contactándonos directamente."
    },
    {
        question: "¿Qué métodos de pago se aceptan?",
        answer: "Aceptamos diversos métodos de pago, incluyendo tarjetas de crédito, débito y transferencias bancarias."
    },
    {
        question: "¿Por qué confiar en nosotros?",
        answer: "Contamos con años de experiencia y técnicos altamente calificados. Nuestro compromiso es ofrecer un servicio de alta calidad y satisfacción garantizada."
    }
];

const Contact = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqRef = useRef(null);

    const handleToggle = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const scrollToFAQ = () => {
        const faqElement = faqRef.current;
        const offset = faqElement.getBoundingClientRect().top + window.pageYOffset - 100; // Se puede ajustar
        window.scrollTo({ top: offset, behavior: 'smooth' });
    };

    return (
        <div className="contact-section">
            <section className="contact-content">
                <h3>¿Tenés alguna duda?</h3>
                <span>¿Necesitas ayuda con tu reparación?</span>
                <p>No dudes en contactarnos. Estamos aquí para ayudarte.</p>
                <button className="contact-button" onClick={scrollToFAQ}>Soporte</button>
            </section>
            <section className="frequent-question-container" ref={faqRef}>
                {faqs.map((faq, index) => (
                    <div key={index} className="frequent-question">
                        <div className="question" onClick={() => handleToggle(index)}>
                            <span>{faq.question}</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`rotate ${activeIndex === index ? 'up' : ''}`} />
                        </div>
                        <div className={`answer ${activeIndex === index ? 'active' : ''}`}>{faq.answer}</div>
                    </div>
                ))}
            </section>
            <section className="contact-socials">
                <span>¿Seguis con dudas? Comunicate!</span>
                <div className="socials-container">
                    <div className="social-item">
                        <p>Llamanos al </p>
                        <a href="tel:01178967720">011 7896-7720</a>
                    </div>
                    <div className="social-item">
                        <p>Envianos un mail</p>
                        <a href="mailto:electrofix@gmail.com"><FontAwesomeIcon icon={faEnvelope} className="social-icon" />electrofix@gmail.com</a>
                    </div>
                    <div className="social-item">
                        <p>Contactanos por </p>
                        <a href="https://wa.me/01178967720" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} className="social-icon" /> WhatsApp</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
