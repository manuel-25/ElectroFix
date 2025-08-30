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
  const { auth, loading: authLoading } = useContext(AuthContext)
  const token = auth?.token

  const [client, setClient] = useState(undefined)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading || !token) return

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
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id, token, authLoading])

  if (authLoading || loading || client === undefined) {
    return (
      <div className="quote-detail-centered">
        <div className="loading-container" style={{ marginTop: 60 }}>
          <Loading />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="quote-detail-centered" style={{ marginTop: 60, textAlign: 'center', color: '#bb0c0c' }}>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="quote-detail-centered">
      <button className="back-button-pro" onClick={() => navigate(-1)}>← Volver</button>
      <h2 className="dashboard-title" style={{ textAlign: 'center' }}>
        Detalle del Cliente #{client.customerNumber}
      </h2>
      <div className="table-wrapper" style={{ margin: '0 auto', marginTop: 16, maxWidth: 900 }}>
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
              <td><strong>{client.firstName} {client.lastName}</strong></td>
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
      </div>
    </div>
  )
}

export default ClientDetail
