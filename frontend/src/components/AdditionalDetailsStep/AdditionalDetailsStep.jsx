import React, { useState } from 'react'
import { additionalDetailsConfig } from '../../utils/productsData.jsx'
import './AdditionalDetailsStep.css'

const AdditionalDetailsStep = ({ onConfirm, categoryId, updateFormData }) => {
  // Filtramos las preguntas basadas en la categoría seleccionada
  const categoryQuestions = additionalDetailsConfig.filter(
    question => question.categoryId === categoryId
  )

  const [details, setDetails] = useState({})

  const handleDetailSelect = (questionLabel, value) => {
    setDetails( () => ({
      [questionLabel]: value
    }))
  }

  const handleConfirm = () => {
    const detailsString = Object.entries(details)
      .map(([question, answer]) => `${question} ${answer}`)
      .join(', ')
    
    updateFormData('details', detailsString)
    onConfirm(detailsString)
  }

  return (
    <div className="additional-container">
      <h3>Algunas preguntas adicionales</h3>

      {/* Renderizamos dinámicamente las preguntas adicionales */}
      {categoryQuestions.map((question, index) => (
        <div key={index} className="additional-question">
          <h4>{question.label}</h4> {/* Título secundario más pequeño */}
          <div className="option-list">
            {question.options.map(option => (
              <div
                key={option.value}
                className={`additional-item ${details[question.label] === option.value ? 'selected' : ''}`}
                onClick={() => handleDetailSelect(question.label, option.value)}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className='next-button'>
        <button onClick={handleConfirm} >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default AdditionalDetailsStep
