import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ step }) => {
  return (
    <div className="progress-bar">
      <div className={`progress-step ${step >= 1 ? 'completed' : ''}`}>Categoría</div>
      <div className={`progress-step ${step >= 2 ? 'completed' : ''}`}>Marca</div>
      <div className={`progress-step ${step >= 3 ? 'completed' : ''}`}>Modelo</div>
      <div className={`progress-step ${step >= 4 ? 'completed' : ''}`}>Falla</div>
      <div className={`progress-step ${step >= 5 ? 'completed' : ''}`}>Información</div>
    </div>
  );
};

export default ProgressBar;
