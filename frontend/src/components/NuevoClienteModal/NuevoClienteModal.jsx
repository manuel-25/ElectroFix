// src/components/NuevoClienteModal.jsx
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { getApiUrl } from '../../config.js'
import Modal from '../Modal/Modal.jsx'
import { AuthContext } from '../../Context/AuthContext'
import './NuevoClienteModal.css'

const NuevoClienteModal = ({ onClose, onClienteCreado }) => {
  const { auth } = useContext(AuthContext)

  const [form, setForm] = useState({
    firstName: '', lastName: '', dniOrCuit: '',
    email: '', phone: '', domicilio: '',
    province: '', municipio: ''
  })
  const [error, setError] = useState(null)             // banner general
  const [fieldErrors, setFieldErrors] = useState({})   // errores por campo

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // si el usuario corrige, limpiamos el error del campo
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    try {
      const last = await axios.get(`${getApiUrl()}/api/client/last-number`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true
      })
      const newCustomerNumber = (last.data?.lastNumber ?? 1000) + 1

      const newClient = { ...form, customerNumber: newCustomerNumber }
      const saved = await axios.post(`${getApiUrl()}/api/client`, newClient, {
        headers: { Authorization: `Bearer ${auth?.token}` },
        withCredentials: true
      })

      onClienteCreado(saved.data)
      onClose()
    } catch (err) {
      const status = err.response?.status
      const data = err.response?.data

      if (status === 401)      setError('Sesión expirada o no autorizada. Iniciá sesión.')
      else if (status === 403) setError('No tenés permisos para crear clientes.')
      else if (status === 400) {
        setError(data?.message || 'Revisá los campos marcados.')
        setFieldErrors(data?.errors || {})
      } else {
        setError('No se pudo crear el cliente.')
      }
      console.error('Error al crear cliente:', data || err)
    }
  }

  // Helper para aplicar estilos de error
  const inputProps = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    className: fieldErrors[name] ? 'invalid' : '',
    'aria-invalid': !!fieldErrors[name]
  })

  return (
    <Modal title="Nuevo Cliente" onClose={onClose}>
      <form onSubmit={handleSubmit} className="cliente-form">
        <label>Nombre</label>
        <input {...inputProps('firstName')} required />
        {fieldErrors.firstName && <div className="field-error">{fieldErrors.firstName}</div>}

        <label>Apellido</label>
        <input {...inputProps('lastName')} required />
        {fieldErrors.lastName && <div className="field-error">{fieldErrors.lastName}</div>}

        <label>DNI o CUIT</label>
        <input {...inputProps('dniOrCuit')} />
        {fieldErrors.dniOrCuit && <div className="field-error">{fieldErrors.dniOrCuit}</div>}

        <label>Email</label>
        <input {...inputProps('email')}/>
        {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}

        <label>Teléfono</label>
        <div className="phone-modal">
          <span className="phone-prefix-modal">+54 9</span>
          <input
            {...inputProps('phone')}
            required
            minLength={10} 
            maxLength={10}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '')
              if (numericValue.length <= 10) {
                setForm(prev => ({ ...prev, phone: numericValue }))
              }
            }}
            placeholder="1123456789"
          />
        </div>
        {fieldErrors.phone && <div className="field-error">{fieldErrors.phone}</div>}

        <label>Domicilio</label>
        <input {...inputProps('domicilio')} placeholder='Calle 123' required />
        {fieldErrors.domicilio && <div className="field-error">{fieldErrors.domicilio}</div>}

        <label>Municipio</label>
        <input {...inputProps('municipio')} placeholder='Municipio / Barrio'/>
        {fieldErrors.municipio && <div className="field-error">{fieldErrors.municipio}</div>}

        <label>Provincia</label>
        <input {...inputProps('province')} placeholder='Buenos Aires / CABA' />
        {fieldErrors.province && <div className="field-error">{fieldErrors.province}</div>}

        {error && <div className="error-message">{error}</div>}

        <div className="modal-footer">
          <button type="submit" className="btn-guardar">Guardar</button>
        </div>
      </form>
    </Modal>
  )
}

export default NuevoClienteModal
