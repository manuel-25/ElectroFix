import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { getApiUrl } from '../../config'
import Loading from '../Loading/Loading'
import './ClientDetail.css'

const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', { 
    year: 'numeric', month: '2-digit', day: '2-digit'
  }) + ' ' + date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const ClientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [client, setClient] = useState(undefined)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchClient = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${getApiUrl()}/api/client/by-customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setClient(res.data)
    } catch (err) {
      setClient(null)
      setError('No se pudo cargar la información del cliente.')
    }
    setLoading(false)
  }

  fetchClient()
}, [id, token])


  if (error) return <p className="error">{error}</p>
  if (loading || client === undefined) {
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
      <h2 className="dashboard-title" style={{textAlign:'center'}}>Detalle del Cliente #{client.serviceRequestNumber}</h2>

      {/* Cuadro CLIENTE */}
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

export default ClientDetail
