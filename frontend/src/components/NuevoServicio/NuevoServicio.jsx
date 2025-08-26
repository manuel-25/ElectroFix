import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { AuthContext } from '../../Context/AuthContext'
import Select from 'react-select'
import { equipoOptions } from '../../utils/productsData'
import { getApiUrl } from '../../config'
import './NuevoServicio.css'

const NuevoServicio = () => {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  const [clientes, setClientes] = useState([])
  const [cotizaciones, setCotizaciones] = useState([])
  const [formData, setFormData] = useState({
    customerNumber: '',
    quoteReference: '',
    branch: '',
    code: '',
    equipmentType: '',
    brand: '',
    model: '',
    serviceType: 'Reparación',
    approximateValue: '',
    finalValue: 0,
    repuestos: 0,
    warrantyExpiration: 30,
    notes: '',
    userDescription: '',
    description: '',
    receivedAtBranch: ''
  })
  const [previewDescription, setPreviewDescription] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
      axios.get(`${getApiUrl()}/api/client`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true
      })
      .then(res => setClientes(res.data || []))
      .catch(err => console.error('Error al obtener clientes', err))

      axios.get(`${getApiUrl()}/api/quotes`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true
      })
      .then(res => setCotizaciones(res.data || []))
      .catch(err => console.error('Error al obtener cotizaciones', err))
  }, [auth])

  const clienteOptions = [...clientes]
    .sort((a, b) => b.customerNumber - a.customerNumber)
    .map(c => ({
      value: c.customerNumber,
      label: `#${c.customerNumber} - ${c.firstName} ${c.lastName}`
    }))

  const validCot = cotizaciones.filter(q => q.serviceRequestNumber)
  const invalidCot = cotizaciones.filter(q => !q.serviceRequestNumber)

  const cotOptions = [
    ...validCot
      .sort((a, b) => b.serviceRequestNumber - a.serviceRequestNumber)
      .map(q => ({
        value: q.serviceRequestNumber,
        label: `#${q.serviceRequestNumber} - ${q.userData?.firstName || ''} ${q.userData?.lastName || ''}`.trim()
      })),
    ...invalidCot.map(q => ({
      value: null,
      label: `${q.userData?.firstName || ''} ${q.userData?.lastName || ''} (sin número)`
    }))
  ]

  const updatePreview = () => {
    const { code, equipmentType, brand, model, approximateValue, quoteReference, userDescription } = formData
    const base = [code, equipmentType, brand, model].filter(Boolean).join(' ')
    const texto = userDescription.trim() || ''
    const approx = approximateValue ? `Aprox.: ${approximateValue}` : ''
    const cotRef = quoteReference ? ` #${quoteReference}` : ''

    const preview = [base, texto, approx].filter(Boolean).join('. ').trim().concat(cotRef)
    setPreviewDescription(preview)
  }

  useEffect(() => {
    updatePreview()
  }, [
    formData.code,
    formData.equipmentType,
    formData.brand,
    formData.model,
    formData.approximateValue,
    formData.quoteReference,
    formData.userDescription
  ])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSucursalChange = e => {
    const branch = e.target.value
    setFormData(prev => ({ ...prev, branch }))

    axios
      .get(`${getApiUrl()}/api/service/last-code/${branch}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true
      })
      .then(res => {
        const nextCode = res.data?.nextCode || `${branch}1000`
        setFormData(prev => ({ ...prev, code: nextCode }))
      })
      .catch(() => {
        const fallback = `${branch}1000`
        setFormData(prev => ({ ...prev, code: fallback }))
      })
  }

  const handleSubmit = async e => {
  e.preventDefault()
  setError(null)

  const selectedClient = clientes.find(c => c.customerNumber === Number(formData.customerNumber))

    if (!selectedClient) {
    setError('Cliente no encontrado.')
    return
    }

    const finalData = {
      customerNumber: selectedClient.customerNumber,
      userData: {
        firstName: selectedClient.firstName,
        lastName: selectedClient.lastName,
        email: selectedClient.email,
        phone: selectedClient.phone,
        dniOrCuit: selectedClient.dniOrCuit,
        domicilio: selectedClient.domicilio
      },
      quoteReference: formData.quoteReference ? Number(formData.quoteReference) : undefined,
      branch: formData.branch,
      code: formData.code,
      equipmentType: formData.equipmentType,
      brand: formData.brand,
      model: formData.model,
      serviceType: formData.serviceType,
      approximateValue: formData.approximateValue,
      finalValue: formData.finalValue,
      repuestos: Number(formData.repuestos) || 0,
      warrantyExpiration: Number(formData.warrantyExpiration),
      notes: formData.notes,
      description: previewDescription,
      ...(formData.receivedAtBranch && { receivedAtBranch: formData.receivedAtBranch })
    }

  try {
    const res = await axios.post(`${getApiUrl()}/api/service`, finalData, {
      headers: { Authorization: `Bearer ${auth?.token}` },
      withCredentials: true
    })
    navigate(`/servicios`)
  } catch (err) {
    if (err.response?.status === 400 && err.response?.data?.error) {
      setError(err.response.data.error)
    } else {
      setError('Error al crear el servicio.')
    }
    console.error(err)
  }
}


  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <button className="back-button-pro" onClick={() => navigate(-1)}>← Volver</button>
        <h2 className="dashboard-title">➕ Nuevo Servicio</h2>
        <form className="form-elegante" onSubmit={handleSubmit}>
          <div className="form-section">
            <label>Código</label>
            <input name="code" value={formData.code} onChange={handleChange} />
          </div>

          <div className="form-section">
            <label>Cliente*</label>
            <div className="select-wrapper">
              <div style={{ flex: 1 }}>
                <Select
                  classNamePrefix="react-select"
                  placeholder="Buscar cliente..."
                  options={clienteOptions}
                  onChange={sel =>
                    setFormData(prev => ({ ...prev, customerNumber: sel?.value || '' }))
                  }
                  isSearchable
                />
              </div>
              <button
                type="button"
                className="btn-nuevo"
                onClick={() => navigate('/clientes/nuevo')}
              >
                Nuevo
              </button>
            </div>
          </div>

          <div className="form-section">
            <label>Tipo de Equipo*</label>
            <Select
              classNamePrefix="react-select"
              placeholder="Buscar equipo..."
              options={equipoOptions}
              onChange={sel =>
                setFormData(prev => ({ ...prev, equipmentType: sel?.value || '' }))
              }
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
            <textarea
              name="userDescription"
              value={formData.userDescription}
              onChange={handleChange}
              placeholder="Describí el problema, síntomas u observaciones..."
              required
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
              placeholder="$25.000 a $40.000"
            />
          </div>

          <div className="form-section">
            <label>Valor Final ($)</label>
            <input
              type="number"
              name="finalValue"
              value={formData.finalValue}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label>Repuestos ($)</label>
            <input
              type="number"
              name="repuestos"
              value={formData.repuestos}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label>Sucursal*</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleSucursalChange}
              required
            >
              <option value="">--</option>
              <option value="Q">Quilmes</option>
              <option value="B">Barracas</option>
              <option value="W">Web</option>
            </select>
          </div>

          <div className="form-section">
            <label>Referencia Cotización</label>
            <Select
              classNamePrefix="react-select"
              placeholder="Buscar cotización..."
              options={cotOptions}
              onChange={sel =>
                setFormData(prev => ({ ...prev, quoteReference: sel?.value || '' }))
              }
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
            <select
              name="receivedAtBranch"
              value={formData.receivedAtBranch}
              onChange={handleChange}
            >
              <option value="">No recibido</option>
              <option value="Quilmes">Quilmes</option>
              <option value="Barracas">Barracas</option>
            </select>
          </div>

          <div className="form-section full-width">
            <label>Notas del Técnico</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-footer">
            <button type="submit" className="btn-submit">
              Guardar Servicio
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default NuevoServicio;
