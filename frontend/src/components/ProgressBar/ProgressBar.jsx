import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({ step, prevStep }) => {
  const createRipple = (event) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ripple = document.createElement("span")
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600) // Duración de la animación en ms (debe coincidir con la duración en CSS)
  }

  const handleBackClick = (e) => {
    createRipple(e)
    if (step === 1) {
      window.history.back()
    } else {
      prevStep()
    }
  }

  return (
    <div className={`progress-container ${step >= 6 ? 'none' : ''}`}>
      <div className="progress-bar">
        <div className={`progress-step ${step >= 1 ? 'completed' : ''}`}>Categoría</div>
        <div className={`progress-step ${step >= 2 ? 'completed' : ''}`}>Marca</div>
        <div className={`progress-step ${step >= 3 ? 'completed' : ''}`}>Modelo</div>
        <div className={`progress-step ${step >= 4 ? 'completed' : ''}`}>Falla</div>
        <div className={`progress-step ${step >= 5 ? 'completed' : ''}`}>Información</div>
      </div>
      <div className={`back-container ${step >= 6 ? 'hide' : ''}`}>
        <button className="back-button" onClick={handleBackClick}>Volver</button>
      </div>
    </div>
  )
}

export default ProgressBar
