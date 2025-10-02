import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import './Modal.css'

const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const originalBody = document.body.style.overflow
    const originalHtml = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalBody
      document.documentElement.style.overflow = originalHtml
    }
  }, [])

  const handleBackdropClick = (e) => {
    // Si clickeó en el fondo (backdrop), cerramos
    if (e.target.classList.contains('modal-backdrop')) {
      onClose()
    }
  }

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal
