import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { getApiUrl } from '../../config'
import Loading from '../Loading/Loading'
import './QuoteDetail.css'

const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', { 
    year: 'numeric', month: '2-digit', day: '2-digit'
  }) + ' ' + date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const QuoteDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [quote, setQuote] = useState(null)
  const [client, setClient] = useState(undefined)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${getApiUrl()}/api/quotes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setQuote(res.data)

        // Intentar buscar cliente asociado en la base
        const customerNumber = res.data.customerNumber
        if (customerNumber) {
          try {
            const clientRes = await axios.get(`${getApiUrl()}/api/client/by-customer/${customerNumber}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            setClient(clientRes.data)
          } catch (clientErr) {
            setClient(null)
          }
        } else {
          setClient(null)
        }
      } catch (err) {
        setError('No se pudo cargar la información.')
      }
      setLoading(false)
    }
    fetchQuote()
  }, [id, token])

  if (error) return <p className="error">{error}</p>
  if (loading || !quote) {
    return (
      <div className="quote-detail-centered">
        <div className="loading-container" style={{marginTop:60}}>
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div className="quote-detail-centered">
      <button className="back-button-pro" onClick={() => navigate(-1)}>← Volver</button>
      <h2 className="dashboard-title" style={{textAlign:'center'}}>Detalle de Cotización #{quote.serviceRequestNumber}</h2>
      <div className="table-wrapper" style={{margin:'0 auto', marginTop: 24, maxWidth: 900}}>
        <table className="styled-table">
          <thead className="table-head">
            <tr>
              <th className="fixed-col">Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>N° Solicitud</td>
              <td>{quote.serviceRequestNumber}</td>
            </tr>
            <tr>
              <td>N° Cliente</td>
              <td>
                {quote.customerNumber}
                {client === undefined ? (
                  <span className="client-check loading-text" style={{marginLeft: 8}}>
                    <Loading size={18} inline={true} /> {/* Spinner mini para cliente */}
                  </span>
                ) : client === null ? (
                  <span className="client-check not-found" style={{marginLeft: 8}}>No registrado</span>
                ) : (
                  <span className="client-check found" style={{marginLeft: 8}}>
                    {client.firstName} {client.lastName}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td>Fecha de creación</td>
              <td>{formatDateTime(quote.createdAt)}</td>
            </tr>
            <tr>
              <td>Última actualización</td>
              <td>{formatDateTime(quote.updatedAt)}</td>
            </tr>
            <tr>
              <td>Categoría</td>
              <td>{quote.category?.name} (ID: {quote.category?.id})</td>
            </tr>
            <tr>
              <td>Marca</td>
              <td>{quote.brand}</td>
            </tr>
            <tr>
              <td>Modelo</td>
              <td>{quote.model || 'N/D'}</td>
            </tr>
            <tr>
              <td>Fallas</td>
              <td>{quote.faults?.join(', ') || 'No especificadas'}</td>
            </tr>
            <tr>
              <td>Descripción</td>
              <td className="details-cell">{quote.details}</td>
            </tr>
            <tr>
              <td>Detalles adicionales usuario</td>
              <td className="details-cell">{quote.userData?.additionalDetails || 'N/A'}</td>
            </tr>
            <tr>
              <td>Estado</td>
              <td>{quote.status}</td>
            </tr>
            <tr>
              <td>Sucursal</td>
              <td>{quote.branch}</td>
            </tr>
            <tr>
              <td>Ubicación</td>
              <td>{quote.userData?.municipio} ({quote.userData?.province})</td>
            </tr>
            <tr>
              <td>Revisión</td>
              <td>{quote.review || 'Sin observaciones'}</td>
            </tr>
            <tr>
              <td>Nombre usuario</td>
              <td>{quote.userData?.firstName} {quote.userData?.lastName}</td>
            </tr>
            <tr>
              <td>Email usuario</td>
              <td>{quote.userData?.email}</td>
            </tr>
            <tr>
              <td>Teléfono usuario</td>
              <td>{quote.userData?.phone || 'No registrado'}</td>
            </tr>
            <tr>
              <td>Código de descuento</td>
              <td>{quote.userData?.discountCode || 'Ninguno'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cuadro CLIENTE DE BASE, debajo */}
      <h2 className="dashboard-title" style={{marginTop: 40, textAlign:'center'}}>Datos del Cliente Registrado</h2>
      <div className="table-wrapper" style={{margin:'0 auto', marginTop: 16, maxWidth: 900}}>
        {client === undefined ? (
          <div style={{padding: 32, textAlign:'center'}}>
            <Loading size={32} />
          </div>
        ) : client === null ? (
          <div style={{padding: 20, color:'#bb0c0c', textAlign:'center', fontWeight:600, fontSize:18}}>
            Cliente no registrado en la base de datos.
          </div>
        ) : (
          <table className="styled-table">
            <thead className="table-head">
              <tr>
                <th className="fixed-col">Campo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre</td>
                <td>{client.firstName} {client.lastName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{client.email}</td>
              </tr>
              <tr>
                <td>Teléfono</td>
                <td>{client.phone || 'No registrado'}</td>
              </tr>
              <tr>
                <td>Provincia</td>
                <td>{client.province}</td>
              </tr>
              <tr>
                <td>Municipio</td>
                <td>{client.municipio}</td>
              </tr>
              <tr>
                <td>N° Cliente</td>
                <td>{client.customerNumber}</td>
              </tr>
              <tr>
                <td>Solicitudes</td>
                <td>{client.serviceRequestNumbers?.join(', ')}</td>
              </tr>
              <tr>
                <td>Fecha creación</td>
                <td>{client.createdAt}</td>
              </tr>
              <tr>
                <td>Última actualización</td>
                <td>{formatDateTime(client.updatedAt)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default QuoteDetail
