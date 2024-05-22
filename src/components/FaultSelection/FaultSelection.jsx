import React, { useState } from 'react'
import './FaultSelection.css'

const FaultSelection = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [fault, setFault] = useState('')

  const handleFaultSelect = (event) => {
    setFault(event.target.value)
  }

  const handleSubmit = () => {
    updateFormData('fault', fault)
    nextStep()
  }

  return (
    <div className="fault-selection-container">
      <h2>Describe la falla</h2>
      <textarea 
        value={fault} 
        onChange={handleFaultSelect} 
        placeholder="Descripción de la falla"
      ></textarea>
      <button className="back-button" onClick={prevStep}>Volver</button>
      <button onClick={handleSubmit}>Siguiente</button>
    </div>
  )
}

export default FaultSelection
