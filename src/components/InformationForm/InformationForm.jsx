import React, { useState, useEffect } from 'react'
import './InformationForm.css'

const InformationForm = ({ nextStep, prevStep, updateFormData }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [provinces, setProvinces] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [discountCode, setDiscountCode] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchProvincias()
  }, [])

  const fetchProvincias = async () => {
    try {
      const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
      const data = await response.json()
      const provincias = data.provincias.map(provincia => provincia.nombre)
      const sortedProvincias = provincias.sort((a, b) => a.localeCompare(b))
      setProvinces(sortedProvincias)
    } catch (error) {
      console.error('Error al obtener las provincias:', error)
    }
  }

  const fetchMunicipios = async (provinciaNombre) => {
    try {
      const response = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaNombre}&campos=id,nombre&max=100`)
      const data = await response.json()
      const municipios = data.municipios.map(municipio => municipio.nombre)
      setMunicipios(municipios)
    } catch (error) {
      console.error('Error al obtener los municipios:', error)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!firstName.trim()) newErrors.firstName = 'Nombre es requerido'
    if (!lastName.trim()) newErrors.lastName = 'Apellido es requerido'

    if (!email.trim()) {
      newErrors.email = 'Email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email es inválido'
    }

    if (!phone.trim()) {
      newErrors.phone = 'Teléfono es requerido'
    } else if (!/^\d{1,11}$/.test(phone)) {
      newErrors.phone = 'Teléfono debe contener solo números y tener máximo 11 caracteres'
    }

    if (!province) newErrors.province = 'Provincia es requerida'
    if (!municipio) newErrors.municipio = 'Municipio es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        province,
        municipio,
        discountCode,
        additionalDetails
      }
      updateFormData('userData', userData)
      nextStep()
    }
  }

  return (
    <div className="selection-container">
      <h2>Te pedimos tus datos, para compartirte la cotización</h2>
      <div className="form-group-wrapper">
        <div className="form-group floating-label">
          <input type="text" placeholder='Nombre' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <label>Nombre</label>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="form-group floating-label">
          <input type="text" placeholder='Apellido' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <label>Apellido</label>
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="form-group floating-label">
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Email</label>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group floating-label">
          <input type="tel" placeholder='Teléfono' value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <label>Teléfono</label>
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group floating-label">
          <select id='select-provincia' value={province} onChange={(e) => {
            setProvince(e.target.value)
            fetchMunicipios(e.target.value)
          }} required>
            <option value="">Provincia</option>
            {provinces.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))}
          </select>
          <label>Provincia</label>
          {errors.province && <p className="error">{errors.province}</p>}
        </div>
        <div className="form-group floating-label">
          <select id='select-municipio' value={municipio} onChange={(e) => setMunicipio(e.target.value)} required>
            <option value="">Municipio</option>
            {municipios.map((municipio, index) => (
              <option key={index} value={municipio}>{municipio}</option>
            ))}
          </select>
          <label>Municipio</label>
          {errors.municipio && <p className="error">{errors.municipio}</p>}
        </div>
        <div className="form-group floating-label">
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            required
            placeholder="Especifique detalles adicionales como marca, modelo o falla"
          />
          <label>Detalles adicionales</label>
          {errors.additionalDetails && <p className="error">{errors.additionalDetails}</p>}
        </div>
      </div>
      <div className="form-group floating-label" id='form-discount'>
        <span id='form-discount-span'>Si tenés un código de descuento, ingrésalo aquí:</span>
        <input type="text" placeholder='Codigo de descuento' value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
      </div>
      <div className='next-button'>
        <button onClick={handleSubmit}>Finalizar</button>
      </div>
    </div>
  )
}

export default InformationForm
