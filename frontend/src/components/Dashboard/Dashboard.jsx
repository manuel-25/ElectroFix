import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading.jsx'
import axios from 'axios'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const [cotizaciones, setCotizaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isTableContentVisible, setIsTableContentVisible] = useState(true)

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/quotes')
        const sortedCotizaciones = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setCotizaciones(sortedCotizaciones)
      } catch (err) {
        setError('Error al cargar las cotizaciones')
      } finally {
        setLoading(false)
      }
    }

    fetchCotizaciones()
  }, [])

  const handleStatusChange = async (serviceRequestNumber, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/quotes/${serviceRequestNumber}`, { status: newStatus })
      setCotizaciones(cotizaciones.map(cotizacion =>
        cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, status: newStatus } : cotizacion
      ))
    } catch (err) {
      setError('Error al actualizar el estado')
    }
  }

  const handleReviewChange = (serviceRequestNumber, newReview) => {
    setCotizaciones(cotizaciones.map(cotizacion =>
      cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, review: newReview } : cotizacion
    ))
  }

  const handleReviewEdit = async (serviceRequestNumber, review) => {
    try {
      await axios.put(`http://localhost:8000/api/quotes/${serviceRequestNumber}`, { review })
      // Actualiza el estado de cotizaciones para reflejar la revisión editada
      setCotizaciones(cotizaciones.map(cotizacion =>
        cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, review } : cotizacion
      ))
    } catch (err) {
      setError('Error al actualizar la revisión')
    }
  }

  const toggleTableContentVisibility = () => {
    setIsTableContentVisible(prev => !prev)
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'En revisión':
        return 'row-in-review'
      case 'Presupuesto Enviado':
        return 'row-budget-sent'
      case 'Aprobada':
        return 'row-approved'
      case 'Rechazada':
        return 'row-rejected'
      case 'Listo para devolución':
        return 'row-ready-for-return'
      default:
        return ''
    }
  }

  if (loading) return <Loading />
  if (error) return <p>{error}</p>

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <p>Esta es una sección protegida y solo puede ser vista por usuarios autenticados. No compartir la información.</p>

      <button className="toggle-cotizaciones-button" onClick={toggleTableContentVisibility}>
        {isTableContentVisible ? 'Ocultar Cotizaciones' : 'Mostrar Cotizaciones'}
      </button>

      <table className="cotizaciones-table">
        <thead>
          <tr>
            <th className="small-column">Número de Solicitud</th>
            <th className="small-column">Número de Cliente</th>
            <th className="small-column">Fecha</th>
            <th className="appliance-column">Electrodoméstico</th>
            <th className="status-column">Estado</th>
            <th className="details-column">Detalles Adicionales</th>
            <th className="review-column">Revisión</th>
          </tr>
        </thead>
        {isTableContentVisible && (
          <tbody>
            {cotizaciones.map((cotizacion) => (
              <tr key={cotizacion.serviceRequestNumber} className={getStatusClass(cotizacion.status)}>
                <td className="small-column">{cotizacion.serviceRequestNumber || 'Null'}</td>
                <td className="small-column">{cotizacion.customerNumber || 'Null'}</td>
                <td className="small-column">{new Date(cotizacion.date).toLocaleDateString()}</td>
                <td className="appliance-column">{`${cotizacion.category.name}, ${cotizacion.brand}, ${cotizacion.model || 'N/A'}`}</td>
                <td className="status-column">
                  <select
                    value={cotizacion.status}
                    onChange={(e) => handleStatusChange(cotizacion.serviceRequestNumber, e.target.value)}
                    className={`status-select ${getStatusClass(cotizacion.status)}`}
                  >
                    {['En revisión', 'Presupuesto Enviado', 'Aprobada', 'Rechazada', 'Listo para devolución'].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="details-column">{cotizacion.userData?.additionalDetails || 'N/A'}</td>
                <td className="review-cell">
                  <input
                    type="text"
                    value={cotizacion.review || ''}
                    onChange={(e) => handleReviewChange(cotizacion.serviceRequestNumber, e.target.value)}
                    placeholder="Escribe tu revisión"
                    className="review-input"
                  />
                  <button
                    className="edit-review-button"
                    onClick={() => handleReviewEdit(cotizacion.serviceRequestNumber, cotizacion.review)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  )
}

export default Dashboard
