import React from 'react';
import './FormSubmissionStatus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const FormSubmissionStatus = ({ status, name }) => {
  return (
    <div className="submission-status">
      {status === 'success' && (
        <div className="success-message">
            <FontAwesomeIcon icon={faCircleCheck} className='success-icon' />
            <span>¡Gracias {name}!</span>
            <span>Su cotizacion fue enviada con éxito, nos pondremos en contacto en la brevedad. </span>
        </div>
      )}
      {status === 'error' && (
        <div className="error-message">
          <span>El envío de la cotización ha fallado.</span>
          <span>Por favor, inténtelo nuevamente.</span>
        </div>
      )}
      <div className="next-steps">
        <span>Los siguientes pasos a seguir:</span>
        <ol>
          <li>Esperar a ser contactado</li>
          <li>Coordinar la reparación</li>
          <li>Recupera tu equipo como nuevo</li>
        </ol>
      </div>
    </div>
  );
};

export default FormSubmissionStatus;
