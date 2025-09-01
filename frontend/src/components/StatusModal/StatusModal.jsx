import React from 'react'
import './StatusModal.css'

const StatusModal = ({
  visible,
  type, // 'branch' | 'satisfaction'
  onClose,

  // branch mode
  branches = ['Quilmes', 'Barracas'],
  selectedBranch = '',
  setSelectedBranch = () => {},
  onConfirmBranch = () => {},

  // satisfaction mode
  onConfirmSatisfaction = () => {},
}) => {
  if (!visible) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {type === 'branch' ? (
          <>
            <h3 className="modal-title">Seleccioná la sucursal</h3>
            <select
              className="modal-select"
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
            >
              <option value="">Elegí una sucursal…</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
              <button
                className="modal-btn confirm"
                disabled={!selectedBranch}
                onClick={onConfirmBranch}
              >
                Confirmar
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="modal-title">¿Recomendarías pedirle una reseña en Google?</h3>
            <p>Si el cliente quedó conforme, podemos invitarlo a dejar una evaluación positiva. Si tenés dudas, seleccioná <b>No</b>.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => onConfirmSatisfaction(false)}>No</button>
              <button className="modal-btn confirm" onClick={() => onConfirmSatisfaction(true)}>Sí</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StatusModal
