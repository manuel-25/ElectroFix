import React from 'react'
import './SatisfactionModal.css'

const SatisfactionModal = ({ visible, onClose, onSelect }) => {
  if (!visible) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">¿El cliente estára conforme con el servicio?</h3>
        <p>Si no estas seguro seleccione No</p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={() => onSelect(false)}>
            No
          </button>
          <button className="modal-btn confirm" onClick={() => onSelect(true)}>
            Sí
          </button>
        </div>
      </div>
    </div>
  )
}

export default SatisfactionModal
