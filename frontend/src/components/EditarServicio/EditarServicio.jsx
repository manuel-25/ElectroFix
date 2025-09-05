// EditarServicio.jsx
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { AuthContext } from '../../Context/AuthContext'
import Select from 'react-select'
import { equipoOptions } from '../../utils/productsData'
import { getApiUrl } from '../../config'
import Loading from '../Loading/Loading'
import './EditarServicio.css'

const EditarServicio = () => {
  const { code } = useParams()
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  const [clientes, setClientes] = useState([])
  const [cotizaciones, setCotizaciones] = useState([])
  const [formData, setFormData] = useState(null)
  const [previewDescription, setPreviewDescription] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, cotRes, servicioRes] = await Promise.all([
          axios.get(`${getApiUrl()}/api/client`, {
            headers: { Authorization: `Bearer ${auth?.token}` },
            withCredentials: true
          }),
          axios.get(`${getApiUrl()}/api/quotes`, {
            headers: { Authorization: `Bearer ${auth?.token}` },
            withCredentials: true
          }),
          axios.get(`${getApiUrl()}/api/service/code/${code}`, {
            headers: { Authorization: `Bearer ${auth?.token}` },
            withCredentials: true
          })
        ])
        setClientes(clientesRes.data || [])
        setCotizaciones(cotRes.data || [])
        setFormData({
          ...servicioRes.data,
          receivedAtBranch: servicioRes.data.receivedAtBranch || 'No recibido'
        })
      } catch (err) {
        console.error('Error cargando datos:', err)
        setError('Error al cargar el servicio')
      }
    }
    fetchData()
  }, [auth, code])

  //borrar despues log 
  useEffect(() => {
  if (formData) {
    console.group('Datos del servicio')
    console.log('ID:', formData._id)
    console.log('Código:', formData.code)
    console.log('Cliente:', formData.customerNumber)
    console.log('Marca:', formData.brand)
    console.log('Modelo:', formData.model)
    console.log('Tipo:', formData.equipmentType)
    console.groupEnd()
  }
}, [formData])

  const clienteOptions = clientes.map(c => ({
    value: c.customerNumber,
    label: `#${c.customerNumber} - ${c.firstName} ${c.lastName}`
  }))

    const validCot = cotizaciones.filter(q => q.serviceRequestNumber)
    const invalidCot = cotizaciones.filter(q => !q.serviceRequestNumber)

    const cotOptions = [
    ...validCot.sort((a, b) => b.serviceRequestNumber - a.serviceRequestNumber).map(q => ({
        value: q.serviceRequestNumber,
        label: `#${q.serviceRequestNumber} - ${q.userData?.firstName || ''} ${q.userData?.lastName || ''}`.trim()
    })),
    ...invalidCot.map(q => ({
        value: null,
        label: `${q.userData?.firstName || ''} ${q.userData?.lastName || ''} (sin número)`
    }))
    ]

  const updatePreview = () => {
    if (!formData) return
    const { code, equipmentType, brand, model, approximateValue, quoteReference, userDescription } = formData
    const base = [code, equipmentType, brand, model].filter(Boolean).join(' ')
    const texto = (userDescription || '').trim()
    const approx = approximateValue ? `Aprox.: ${approximateValue}` : ''
    const cotRef = quoteReference ? ` #${quoteReference}` : ''
    setPreviewDescription([base, texto, approx].filter(Boolean).join('. ').trim().concat(cotRef))
  }

  useEffect(() => {
    updatePreview()
  }, [formData])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            formData.description = previewDescription

            // Validar código duplicado si fue modificado
            if (formData.code !== code) {
            const res = await axios.get(`${getApiUrl()}/api/service/code/${formData.code}`, {
                headers: { Authorization: `Bearer ${auth?.token}` },
                withCredentials: true
            })
            if (res.data && res.data.code !== code) {
                setError('Ya existe un servicio con ese código.')
                return
            }
            }

            await axios.put(`${getApiUrl()}/api/service/${formData._id}`, formData, {
              headers: { Authorization: `Bearer ${auth?.token}` },
              withCredentials: true
            })
            navigate(`/servicios`)
        } catch (err) {
            setError(err.response?.data?.error || 'Error al actualizar el servicio.')
            console.error(err)
        }
    }

  if (!formData) {
    return (
      <DashboardLayout>
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <button className="back-button-pro" onClick={() => navigate(-1)}>← Volver</button>
        <h2 className="editservice-title">✏️ Editar Servicio</h2>

        <form className="form-elegante" onSubmit={handleSubmit}>
          <div className="form-section">
            <label>Código</label>
            <input name="code" value={formData.code} onChange={handleChange} />
          </div>

          <div className="form-section">
            <label>Cliente</label>
            <Select
              classNamePrefix="react-select"
              options={clienteOptions}
              value={clienteOptions.find(c => c.value === formData.customerNumber)}
              onChange={sel => setFormData(prev => ({ ...prev, customerNumber: sel?.value || '' }))}
              isSearchable
            />
          </div>

          <div className="form-section">
            <label>Tipo de Equipo</label>
            <Select
              classNamePrefix="react-select"
              options={equipoOptions}
              value={equipoOptions.find(e => e.value === formData.equipmentType)}
              onChange={sel => setFormData(prev => ({ ...prev, equipmentType: sel?.value || '' }))}
              isSearchable
            />
          </div>

          <div className="form-section">
            <label>Marca</label>
            <input name="brand" value={formData.brand} onChange={handleChange} />
          </div>

          <div className="form-section">
            <label>Modelo</label>
            <input name="model" value={formData.model} onChange={handleChange} />
          </div>

          <div className="form-section full-width">
            <label>Descripción*</label>
            {console.log('formDatA: ', formData)}
            <textarea
              name="userDescription"
              value={formData.userDescription}
              onChange={handleChange}
            />
          </div>

          <div className="form-section full-width">
            <label>Vista previa</label>
            <textarea readOnly value={previewDescription} />
          </div>

          <div className="form-section">
            <label>Tipo de Servicio</label>
            <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
              <option value="Reparación">Reparación</option>
              <option value="Garantía">Garantía</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>

          <div className="form-section">
            <label>Valor Aproximado ($)</label>
            <input
              name="approximateValue"
              value={formData.approximateValue}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label>Valor Final ($)</label>
            <input type="number" name="finalValue" value={formData.finalValue} onChange={handleChange} />
          </div>

          <div className="form-section">
            <label>Repuestos ($)</label>
            <input type="number" name="repuestos" value={formData.repuestos} onChange={handleChange} />
          </div>

          <div className="form-section">
            <label>Referencia Cotización</label>
            <Select
              classNamePrefix="react-select"
              options={cotOptions}
              value={cotOptions.find(q => q.value === formData.quoteReference)}
              onChange={sel => setFormData(prev => ({ ...prev, quoteReference: sel?.value || '' }))}
              isSearchable
            />
          </div>

          <div className="form-section">
            <label>Garantía (días)</label>
            <input
              type="number"
              name="warrantyExpiration"
              value={formData.warrantyExpiration}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label>Recibido En</label>
            <select name="receivedAtBranch" value={formData.receivedAtBranch || ''} onChange={handleChange}>
              <option value="No recibido">No recibido</option>
              <option value="Quilmes">Quilmes</option>
              <option value="Barracas">Barracas</option>
            </select>
          </div>

          <div className="form-section">
            <label>Metodo de Envio</label>
            <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange}>
              <option value="Presencial">Presencial</option>
              <option value="UberFlash">UberFlash</option>
              <option value="Retiro y Entrega">Retiro y Entrega</option>
              <option value="Envío Correo">Envío Correo</option>
            </select>
          </div>

          <div className="form-section full-width">
            <label>Notas del Técnico</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-footer">
            <button type="submit" className="btn-submit">Actualizar Servicio</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default EditarServicio
