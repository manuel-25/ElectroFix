import React from 'react'
import './ProgressBar.css'
import { TiTick } from 'react-icons/ti'
import { steps } from '../../utils/productsData'

const ProgressBar = ({ step, handlePrevStep }) => {

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
    }, 600)
  }

  const handleBackClick = (e) => {
    createRipple(e)
    if (step === 1) {
      window.history.back()
    } else {
      handlePrevStep()
    }
  }

  return (
    <div className={`progress-container ${step >= steps.length ? 'none' : ''}`}>
      <div className="progress-bar">
        {steps.map((stepName, index) => (
          <div key={index} className={`progress-step ${step > index ? 'completed' : ''} ${step === index + 1 ? 'current' : ''}`}>
            <div className="step-container">
              <div className="step-icon">
                {step > index ? <TiTick size={24} /> : index + 1}
              </div>
            </div>
            <div className={`connector-line ${step > index ? 'completed' : ''}`} />
            <p>{stepName}</p>
          </div>
        ))}
      </div>
      <div className={`back-container ${(step === 1 || step >= steps.length + 1) ? 'hide' : ''}`}>
        <button className="back-button" onClick={handleBackClick}>Volver</button>
      </div>
    </div>
  )
}

export default ProgressBar
