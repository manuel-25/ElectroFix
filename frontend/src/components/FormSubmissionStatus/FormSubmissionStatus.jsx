import React, { useState, useEffect } from 'react'
import './FormSubmissionStatus.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const FormSubmissionStatus = ({ status, name }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Establecer isLoaded a true cuando status no esté pendiente
    if (status !== 'pending') {
      setIsLoaded(true)
    }
  }, [status])

  if (!isLoaded) {
    return (
      <div className="loading-container">
        <img src={'/images/Rolling@1x-1.0s-200px-200px.gif'} alt="Cargando..." className="loading-image" />
      </div>
    )
  }

  return (
    <div className="submission-status">
      {status === 'success' && (
        <div className="status-message success-message">
          <FontAwesomeIcon icon={faCircleCheck} className='status-icon' />
          <h3 className="message-header">¡Gracias {name}!</h3>
          <p className="message-body">Su cotización fue enviada con éxito. Nos pondremos en contacto en breve.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="status-message error-message">
          <FontAwesomeIcon icon={faTimesCircle} className='status-icon' />
          <h3 className="message-header">Error</h3>
          <p className="message-body">El envío de la cotización ha fallado. Por favor, inténtelo nuevamente.</p>
        </div>
      )}
      <div className="next-steps">
        <h4 className="next-steps-header">Los siguientes pasos a seguir:</h4>
        <ol className="steps-list">
          <li className="step-item">Esperar a ser contactado</li>
          <li className="step-item">Coordinar la reparación</li>
          <li className="step-item">Recuperar tu equipo como nuevo</li>
        </ol>
      </div>
    </div>
  )
}

export default FormSubmissionStatus
