import React, { useState } from 'react'
import './ModelSelection.css'

const ModelSelection = ({ brand, selectedCategory, nextStep, prevStep, updateFormData }) => {
  const [model, setModel] = useState('')

  const handleModelSelect = (event) => {
    setModel(event.target.value)
  }

  const handleSubmit = () => {
    updateFormData('model', model)
    nextStep()
  }

  return (
    <div className="selection-container">
      <h2>¿Qué modelo es tu {brand === 'Otros' ? selectedCategory.name : brand || selectedCategory.name}?</h2>
      <input 
        type="text" 
        value={model} 
        onChange={handleModelSelect} 
        placeholder="Modelo" 
        className='model-input'
      />
      <div className='nav-buttons'>
        <button className="back-button" onClick={prevStep}>Volver</button>
        <button onClick={handleSubmit}>Siguiente</button>
      </div>
    </div>
  )
}

export default ModelSelection
