import React from 'react';
import './FormSubmissionStatus.css';

const FormSubmissionStatus = ({ status, name }) => {
  return (
    <div className="submission-status">
      {status === 'loading' && (
        <div className="loading-icon">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Enviando solicitud...</p>
        </div>
      )}
      {status === 'success' && (
        <div className="success-message">
          <p>¡Gracias {name}!</p>
          <p>Su cotización será enviada en breve.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="error-message">
          <p>El envío de la cotización ha fallado.</p>
          <p>Por favor, inténtelo nuevamente.</p>
        </div>
      )}
      <div className="next-steps">
        <p>Los siguientes pasos a seguir:</p>
        <ol>
          <li>Esperar a ser contactado.</li>
          <li>Coordinar la reparación.</li>
          <li>Reparación.</li>
        </ol>
      </div>
    </div>
  );
};

export default FormSubmissionStatus;
