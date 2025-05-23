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

  const onBackToMenu = () => {
    navigate('/');
  };

  if (!isLoaded) {
    return (
      <div className="loading-container">
        <img src="/images/Rolling@1x-1.0s-200px-200px.gif" alt="Cargando..." className="loading-image" />
      </div>
    );
  }

  return (
    <div className="submission-status">
      {status === 'success' && (
        <div className="status-message success-message">
          <FontAwesomeIcon icon={faCircleCheck} className="status-icon" />
          <h3 className="message-header">¡Gracias por tu solicitud, {name}!</h3>
          <p className="message-body">Recibimos tu cotización con éxito.</p>
          <p className="message-body">
            En breve, uno de nuestros especialistas se pondrá en contacto para avanzar con el proceso.
            A continuación, te dejamos una guía para que todo sea más ágil:
          </p>

          <div className="next-steps">
            <h4 className="next-steps-header">¿Qué hacer?</h4>
            <ol className="steps-list">
              <li className="step-item">Tené a mano fotos o videos del equipo, donde se vea la etiqueta del modelo y la falla.</li>
              <li className="step-item">Esperá nuestro mensaje por Whatsapp.</li>
              <li className="step-item">Coordiná la reparación con el técnico asignado.</li>
              <li className="step-item">Recibí tu equipo reparado.</li>
            </ol>
          </div>

          <div className="request-numbers">
            <p className="number-detail">
              Número de Solicitud: <strong>{serviceRequestNumber}</strong> | Número de Cliente: <strong>{customerNumber}</strong>
            </p>
          </div>

          <div>
            <img className="logo-electrosafe" src="./ELECTROSAFE.svg" alt="Electrosafe logo" />
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="status-message error-message">
          <FontAwesomeIcon icon={faTimesCircle} className="status-icon" />
          <h3 className="message-header">Ocurrió un inconveniente</h3>
          <p className="message-body">No pudimos procesar tu solicitud de cotización.</p>
          <p className="message-body">Por favor, volvé a intentarlo en unos minutos o comunicate con nosotros:</p>

          <div className="contact-title">¿Necesitás ayuda?</div>
          <div className="contact-info">
            <a
              href="https://wa.me/5491139148766"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
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
