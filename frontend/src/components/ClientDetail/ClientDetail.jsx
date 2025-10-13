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

  const [client, setClient] = useState(undefined)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (authLoading) return

    const fetchClient = async () => {
      setLoading(true)
      try {
        const url = `${getApiUrl()}/api/client/by-customer/${id}`
        const res = await axios.get(url, { withCredentials: true })
        setClient(res.data)
        setFormData(res.data)
      } catch (err) {
        console.error('[ClientDetail] Error al obtener cliente:', err)
        setClient(null)
        setError('No se pudo cargar la información del cliente.')
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [id, authLoading])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await axios.put(`${getApiUrl()}/api/client/${formData._id}`, formData, { withCredentials: true })
      setClient(res.data)
      setEditMode(false)
    } catch (err) {
      console.error('Error al actualizar cliente:', err)
      alert('Error al guardar los cambios.')
    }
  }

  if (authLoading || loading || client === undefined) {
    return (
      <div className="client-detail-wrapper">
        <div className="loading-container" style={{ marginTop: 60 }}>
          <Loading />
        </div>
      </div>
    )
  }

  if (client === null) {
    return (
      <div className="client-detail-wrapper" style={{ marginTop: 60, textAlign: 'center', color: '#bb0c0c' }}>
        <p>{error || 'Cliente no encontrado.'}</p>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="client-detail-wrapper" style={{ marginTop: 60, textAlign: 'center', color: '#bb0c0c' }}>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="client-detail-wrapper">
      <button className="client-detail-back-btn" onClick={() => navigate(-1)}>← Volver</button>
      <h2 className="dashboard-title" style={{ textAlign: 'center' }}>
        Detalle del Cliente #{client.customerNumber}
      </h2>

      <div style={{ margin: '16px 0', textAlign: 'center' }}>
        {!editMode ? (
          <button className="client-detail-btn" onClick={() => setEditMode(true)}>
            ✏️ Editar Cliente
          </button>
        ) : (
          <>
            <button className="client-detail-btn" onClick={handleSave}>
              💾 Guardar Cambios
            </button>
            <button
              className="client-detail-cancel-btn"
              onClick={() => {
                setEditMode(false)
                setFormData(client)
              }}
            >
              Cancelar
            </button>
          </>
        )}
      </div>

      <div className="client-detail-table-wrapper">
        <table className="client-detail-table">
          <thead>
            <tr>
              <th className="client-detail-fixed-col">Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Nombre', name: 'firstName' },
              { label: 'Apellido', name: 'lastName' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Teléfono', name: 'phone' },
              { label: 'Provincia', name: 'province' },
              { label: 'Municipio', name: 'municipio' },
              { label: 'Domicilio', name: 'domicilio' },
              { label: 'DNI o CUIT', name: 'dniOrCuit' }
            ].map(({ label, name, type }) => (
              <tr key={name}>
                <td>{label}</td>
                <td>
                  {editMode ? (
                    <input
                      type={type || 'text'}
                      name={name}
                      value={formData[name] || ''}
                      onChange={handleInputChange}
                    />
                  ) : client[name] || '-'}
                </td>
              </tr>
            ))}

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
