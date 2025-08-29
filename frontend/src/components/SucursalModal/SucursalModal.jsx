import React from 'react'
import './SucursalModal.css'

const SucursalModal = ({ visible, onClose, onConfirm, selectedBranch, setSelectedBranch }) => {
  if (!visible) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">Seleccioná la sucursal</h3>
        <select
          className="modal-select"
          value={selectedBranch}
          onChange={e => setSelectedBranch(e.target.value)}
        >
          <option value="">Elegí una sucursal…</option>
          <option value="Quilmes">Quilmes</option>
          <option value="Barracas">Barracas</option>
        </select>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn confirm" disabled={!selectedBranch} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SucursalModal
