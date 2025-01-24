import React, { useState, useEffect } from 'react';
import './FormSubmissionStatus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const FormSubmissionStatus = ({ status, name, customerNumber, serviceRequestNumber }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'pending') {
      setIsLoaded(true);
    }
  }, [status]);

  if (!isLoaded) {
    return (
      <div className="loading-container">
        <img src={'/images/Rolling@1x-1.0s-200px-200px.gif'} alt="Cargando..." className="loading-image" />
      </div>
    );
  }

  const onBackToMenu = () => {
    navigate('/');
  }

  return (
    <div className="submission-status">
      {status === 'success' && (
        <div className="status-message success-message">
          <FontAwesomeIcon icon={faCircleCheck} className='status-icon' />
          <h3 className="message-header">¡Gracias por su envío, {name}!</h3>
          <p className="message-body">Su cotización ha sido enviada con éxito.</p>
          <p className="message-body">Nos pondremos en contacto en breve para coordinar los próximos pasos. Recuerde su número de solicitud.</p>
          <div className="next-steps">
            <h4 className="next-steps-header">Pasos a seguir:</h4>
            <ol className="steps-list">
              <li className="step-item">Esperar a ser contactado por nuestro equipo</li>
              <li className="step-item">Coordinar la reparación con uno de nuestros técnicos</li>
              <li className="step-item">Recuperar su equipo reparado</li>
            </ol>
          </div>
          <div className="request-numbers">
            <p className="number-detail">
              Número de Solicitud: <strong>{serviceRequestNumber}</strong> | Número de Cliente: <strong>{customerNumber}</strong>
            </p>
          </div>
          <div><img className='logo-electrosafe' src="./ELECTROSAFE.svg" alt="Electrosafe logo" /></div>
        </div>
      )}
      {status === 'error' && (
        <div className="status-message error-message">
          <FontAwesomeIcon icon={faTimesCircle} className='status-icon' />
          <h3 className="message-header">Lo sentimos, ha ocurrido un error.</h3>
          <p className="message-body">El envío de su cotización no pudo ser procesado.</p>
          <p className="message-body">Por favor, inténtelo nuevamente más tarde.</p>
          <div className='contact-title'>Contáctanos por:</div>
          <div className='contact-info'>
            <a href="https://wa.me/5491139148766" target="_blank" rel="noopener noreferrer" className='whatsapp-link'>
              <img src="/images/whatsappLogo.svg" alt="Logotipo de WhatsApp" className="whatsapp-icon" />
              <strong>+54 911 3914-8766</strong>
            </a>
            <a href="mailto:electrosafeservice@gmail.com" className="email-link">
              <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
              electrosafeservice@gmail.com
            </a>
          </div>
          <button className="errorBack-button" onClick={onBackToMenu}>
            Volver
          </button>
        </div>
      )}
    </div>
  );
};

export default FormSubmissionStatus;
