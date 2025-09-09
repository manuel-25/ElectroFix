import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { getApiUrl } from '../../config'
import Loading from '../Loading/Loading'
import { formatDate } from '../../utils/formatDate'
import './ClientDetail.css'

const ClientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { auth, loading: authLoading } = useContext(AuthContext)
  const token = auth?.token

  const [client, setClient] = useState(undefined)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (authLoading || !token) return

    const fetchClient = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${getApiUrl()}/api/client/by-customer/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setClient(res.data)
        setFormData(res.data)
      } catch (err) {
        setClient(null)
        setError('No se pudo cargar la información del cliente.')
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id, token, authLoading])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await axios.put(`${getApiUrl()}/api/client/${formData._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setClient(res.data)
      setEditMode(false)
    } catch (err) {
      console.error('Error al actualizar cliente:', err)
      alert('Error al guardar los cambios.')
    }
  }

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

      <div style={{ margin: '16px 0', textAlign: 'center' }}>
        {!editMode ? (
          <button className="btn-submit" onClick={() => setEditMode(true)}>
            ✏️ Editar Cliente
          </button>
        ) : (
          <>
            <button className="btn-submit" onClick={handleSave}>
              💾 Guardar Cambios
            </button>
            <button
              className="btn-cancelar"
              onClick={() => {
                setEditMode(false)
                setFormData(client)
              }}
              style={{ marginLeft: 12 }}
            >
              Cancelar
            </button>
          </>
        )}
      </div>

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
              <td>
                {editMode ? (
                  <input
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                  />
                ) : client.firstName}
              </td>
            </tr>
            <tr>
              <td>Apellido</td>
              <td>
                {editMode ? (
                  <input
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                  />
                ) : client.lastName}
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                  />
                ) : client.email}
              </td>
            </tr>

            <tr>
              <td>Teléfono</td>
              <td>
                {editMode ? (
                  <input
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                  />
                ) : client.phone || 'No registrado'}
              </td>
            </tr>

            <tr>
              <td>Provincia</td>
              <td>
                {editMode ? (
                  <input
                    name="province"
                    value={formData.province || ''}
                    onChange={handleInputChange}
                  />
                ) : client.province}
              </td>
            </tr>

            <tr>
              <td>Municipio</td>
              <td>
                {editMode ? (
                  <input
                    name="municipio"
                    value={formData.municipio || ''}
                    onChange={handleInputChange}
                  />
                ) : client.municipio}
              </td>
            </tr>

            <tr>
              <td>Domicilio</td>
              <td>
                {editMode ? (
                  <input
                    name="domicilio"
                    value={formData.domicilio || ''}
                    onChange={handleInputChange}
                  />
                ) : client.domicilio || '-'}
              </td>
            </tr>

            <tr>
              <td>DNI o CUIT</td>
              <td>
                {editMode ? (
                  <input
                    name="dniOrCuit"
                    value={formData.dniOrCuit || ''}
                    onChange={handleInputChange}
                  />
                ) : client.dniOrCuit || '-'}
              </td>
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
              <td>{formatDate(client.updatedAt, true)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClientDetail
