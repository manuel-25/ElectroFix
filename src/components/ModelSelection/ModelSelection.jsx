import React, { useState } from 'react';
import './ModelSelection.css';

const ModelSelection = ({ nextStep, prevStep, updateFormData }) => {
  const [model, setModel] = useState('');

  const handleModelSelect = (event) => {
    setModel(event.target.value);
  };

  const handleSubmit = () => {
    updateFormData('model', model);
    nextStep();
  };

  return (
    <div className="model-selection-container">
      <h2>Selecciona el modelo</h2>
      <input 
        type="text" 
        value={model} 
        onChange={handleModelSelect} 
        placeholder="Modelo" 
      />
      <button className="back-button" onClick={prevStep}>Volver</button>
      <button onClick={handleSubmit}>Siguiente</button>
    </div>
  );
};

export default ModelSelection;
