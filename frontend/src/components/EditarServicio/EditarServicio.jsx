// EditarServicio.jsx
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { AuthContext } from '../../Context/AuthContext'
import Select from 'react-select'
import { equipoOptions } from '../../utils/productsData'
import { getApiUrl } from '../../config'
import { formatCurrency } from '../../utils/currency'
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
          axios.get(`${getApiUrl()}/api/client`, { withCredentials: true }),
          axios.get(`${getApiUrl()}/api/quotes`, { withCredentials: true }),
          axios.get(`${getApiUrl()}/api/service/code/${code}`, { withCredentials: true })
        ])
        setClientes(clientesRes.data || [])
        setCotizaciones(cotRes.data || [])
        setFormData({
          ...servicioRes.data,
          receivedAtBranch: servicioRes.data.receivedAtBranch || 'No recibido',
          budgetItems: servicioRes.data.budgetItems || []
        })
      } catch (err) {
        console.error('Error cargando datos:', err)
        setError('Error al cargar el servicio')
      }
    }
    fetchData()
  }, [auth, code])

  useEffect(() => {
    if (!formData) return
    const { code, equipmentType, brand, model, approximateValue, quoteReference, userDescription } = formData
    const base = [code, equipmentType, brand, model].filter(Boolean).join(' ')
    const texto = (userDescription || '').trim()
    const approx = approximateValue ? `Aprox.: ${approximateValue}` : ''
    const cotRef = quoteReference ? ` #${quoteReference}` : ''
    setPreviewDescription([base, texto, approx].filter(Boolean).join('. ').trim().concat(cotRef))
  }, [formData])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index, field, value) => {
    const items = [...formData.budgetItems]
    items[index][field] = field === 'cantidad' || field === 'precioUnitario' ? parseFloat(value) || 0 : value
    setFormData(prev => ({ ...prev, budgetItems: items }))
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      budgetItems: [...(prev.budgetItems || []), { cantidad: 1, descripcion: '', precioUnitario: 0 }]
    }))
  }

  const removeItem = index => {
    const items = [...formData.budgetItems]
    items.splice(index, 1)
    setFormData(prev => ({ ...prev, budgetItems: items }))
  }

  const calcularValorFinal = () => {
    return (formData.budgetItems || []).reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0).toFixed(2)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      formData.description = previewDescription
      formData.finalValue = parseFloat(calcularValorFinal())

      if (formData.code !== code) {
        const res = await axios.get(`${getApiUrl()}/api/service/code/${formData.code}`, { withCredentials: true })
        if (res.data && res.data.code !== code) {
          setError('Ya existe un servicio con ese código.')
          return
        }
      }

      await axios.put(`${getApiUrl()}/api/service/${formData._id}`, formData, { withCredentials: true })
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

  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <button className="back-button-pro" onClick={() => navigate(-1)}>← Volver</button>
        <h2 className="editservice-title">✏️ Editar Servicio</h2>

        <form className="form-elegante editar-servicio-form" onSubmit={handleSubmit}>
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
            <textarea name="userDescription" value={formData.userDescription} onChange={handleChange} />
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
            <input name="approximateValue" value={formData.approximateValue} onChange={handleChange} />
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
            <input type="number" name="warrantyExpiration" value={formData.warrantyExpiration} onChange={handleChange} />
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
            <label>Notas del Técnico  *Uso Interno*</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} />
          </div>

          <div className="form-section full-width">
            <label>Diagnóstico Técnico</label>
            <textarea name="diagnosticoTecnico" value={formData.diagnosticoTecnico} onChange={handleChange} />
          </div>

          <div className="form-section full-width">
            <label>Notas para la Orden</label>
            <textarea name="workOrderNotes" value={formData.workOrderNotes} onChange={handleChange} />
          </div>

          <div className="form-section full-width">
            <label>Ítems del Presupuesto</label>
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Cant.</th>
                  <th>Descripción</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(formData.budgetItems || []).map((item, i) => (
                  <tr key={i}>
                    <td><input type="number" value={item.cantidad} onChange={e => handleItemChange(i, 'cantidad', e.target.value)} /></td>
                    <td><input type="text" value={item.descripcion} onChange={e => handleItemChange(i, 'descripcion', e.target.value)} /></td>
                    <td><input type="number" value={item.precioUnitario} onChange={e => handleItemChange(i, 'precioUnitario', e.target.value)} /></td>
                    <td>{formatCurrency(item.cantidad * item.precioUnitario)}</td>
                    <td><button type="button" onClick={() => removeItem(i)} className="remove-item">🗑</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={addItem} className="add-item-btn">➕ Agregar Ítem</button>
          </div>
          <div className="valor-final-linea-dos-columnas full-width">
            <span>Total:</span>
            <strong>{formatCurrency(parseFloat(calcularValorFinal()))}</strong>
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
