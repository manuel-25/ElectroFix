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

  useEffect(() => {
    fetchProvincias()
  }, [])

  const fetchProvincias = async () => {
    try {
      const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
      const data = await response.json()
      const provincias = data.provincias.map(provincia => provincia.nombre)
      // Ordenar las provincias alfabéticamente
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

  const handleSubmit = () => {
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

  return (
    <div className="selection-container">
      <h2>Te pedimos tus datos, para compartirte la cotización</h2>
      <div className="form-group-wrapper">
        <div className="form-group floating-label">
          <input type="text" placeholder='Nombre' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <label>Nombre</label>
        </div>
        <div className="form-group floating-label">
          <input type="text" placeholder='Apellido' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <label>Apellido</label>
        </div>
        <div className="form-group floating-label">
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Email</label>
        </div>
        <div className="form-group floating-label">
          <input type="tel" placeholder='Teléfono' value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <label>Teléfono</label>
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
        </div>
        <div className="form-group floating-label">
          <select id='select-municipio' value={municipio} onChange={(e) => setMunicipio(e.target.value)} required>
            <option value="">Municipio</option>
            {municipios.map((municipio, index) => (
              <option key={index} value={municipio}>{municipio}</option>
            ))}
          </select>
          <label>Municipio</label>
        </div>
        <div className="form-group floating-label">
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            required
            placeholder="Especifique detalles adicionales como marca o modelo"
          />
          <label>Detalles adicionales</label>
        </div>
      </div>
      <div className="form-group floating-label" id='form-discount'>
        <span id='form-discount-span'>Si tenés un código de descuento, ingrésalo aquí:</span>
        <input type="text" placeholder='Codigo de descuento' value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
      </div>
      <div className='nav-buttons'>
        <button className="back-button" onClick={prevStep}>Volver</button>
        <button onClick={handleSubmit}>Finalizar</button>
      </div>
    </div>
  )
}

export default InformationForm
