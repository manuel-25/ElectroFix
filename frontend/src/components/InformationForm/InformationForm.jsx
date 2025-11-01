import React, { useState, useEffect } from 'react'
import './InformationForm.css'
import { barriosCABA } from '../../utils/productsData.jsx'
import Loading from '../Loading/Loading.jsx'

const TIMEOUT_MS = 15000 // 20 segundos máximo de espera

const InformationForm = ({ nextStep, updateFormData }) => {
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
  const [loading, setLoading] = useState(false)
  const [loadingMunicipios, setLoadingMunicipios] = useState(false)
  const [loadProvinciasError, setLoadProvinciasError] = useState(false)
  const [loadMunicipiosError, setLoadMunicipiosError] = useState(false)

  useEffect(() => {
    fetchProvincias()
  }, [])

  const fetchWithTimeout = async (url, options = {}, timeout = TIMEOUT_MS) => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    try {
      const response = await fetch(url, { ...options, signal: controller.signal })
      clearTimeout(id)
      return response
    } catch (err) {
      clearTimeout(id)
      throw err
    }
  }

  const fetchProvincias = async () => {
    setLoading(true)
    setLoadProvinciasError(false)
    try {
      const response = await fetchWithTimeout('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
      if (!response.ok) throw new Error('Error de respuesta')
      const data = await response.json()
      const provincias = data.provincias.map(p => p.nombre)
      setProvinces(provincias.sort((a, b) => a.localeCompare(b)))
    } catch (error) {
      console.error('Error al obtener las provincias:', error)
      setLoadProvinciasError(true)
    }
    setLoading(false)
  }

  const fetchMunicipios = async (provinciaNombre) => {
    setLoadingMunicipios(true)
    setLoadMunicipiosError(false)
    if (provinciaNombre === 'Ciudad Autónoma de Buenos Aires') {
      setMunicipios([...barriosCABA].sort((a, b) => a.localeCompare(b)))
      setLoadingMunicipios(false)
      return
    }
    try {
      const response = await fetchWithTimeout(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaNombre}&campos=id,nombre&max=100`
      )
      if (!response.ok) throw new Error('Error de respuesta')
      const data = await response.json()
      const municipios = data.municipios.map(m => m.nombre)
      setMunicipios(municipios.sort((a, b) => a.localeCompare(b)))
    } catch (error) {
      console.error('Error al obtener los municipios:', error)
      setLoadMunicipiosError(true)
    }
    setLoadingMunicipios(false)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!firstName.trim()) newErrors.firstName = '*El nombre es requerido'
    if (!lastName.trim()) newErrors.lastName = '*El apellido es requerido'
    if (!email.trim()) {
      newErrors.email = '*El correo electrónico es requerido'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '*El correo electrónico es inválido'
    }
    if (!phone.trim()) {
      newErrors.phone = '*El teléfono es requerido'
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = '*Debe tener 10 dígitos numéricos'
    }
    if (!loadProvinciasError && provinces.length > 0 && !province) {
      newErrors.province = '*La provincia es requerida'
    }
    if (!loadMunicipiosError && municipios.length > 0 && !municipio) {
      newErrors.municipio = '*El municipio es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData('userData', {
        firstName,
        lastName,
        email,
        phone,
        province,
        municipio,
        discountCode,
        additionalDetails
      })
      nextStep()
    }
  }

  return (
    <div className="selection-container">
      <h3>Te pedimos tus datos, para compartirte la cotización</h3>
      <div className="form-group-wrapper">
        <div className="form-group floating-label">
          <input type="text" placeholder="Nombre" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <label>Nombre</label>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group floating-label">
          <input type="text" placeholder="Apellido" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <label>Apellido</label>
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group floating-label">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Email</label>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group floating-label" id="phone-id">
          <div className="phone-container">
            <div className="flag-container">
              <img src="/images/flag-argentina.svg" alt="Bandera Argentina" />+54 9
            </div>
            <input
              type="tel"
              placeholder="000 000 0000"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              required
              style={{
                borderColor: phone.length === 0 ? 'initial' : phone.length < 11 ? (errors.phone ? 'red' : 'green') : 'red',
                borderWidth: phone.length > 0 ? '2px' : '1px'
              }}
            />
          </div>
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* PROVINCIA */}
        <div className="form-group floating-label">
          <div className={`select-container ${loading ? 'loading' : ''}`}>
            <select
              value={province}
              onChange={e => { setProvince(e.target.value); fetchMunicipios(e.target.value) }}
              disabled={loadProvinciasError}
            >
              <option value="">Provincia</option>
              {provinces.map((prov, idx) => <option key={idx} value={prov}>{prov}</option>)}
            </select>
            {loading ? <div className="spinner-container"><Loading /></div> : <div className="custom-arrow" />}
          </div>
          <label>Provincia</label>
          {loadProvinciasError && (
            <p className="error" style={{ color: '#c0392b', fontWeight: 'bold', marginTop: '5px' }}>
              ⚠️ No se pudo cargar la lista de provincias y municipios. Podés continuar sin seleccionarla.
            </p>
          )}
          {provinces.length > 0 && errors.province && <p className="error">{errors.province}</p>}
        </div>

        {/* MUNICIPIO */}
        <div className="form-group floating-label">
          <div className={`select-container ${loadingMunicipios ? 'loading' : ''}`}>
            <select
              value={municipio}
              onChange={e => setMunicipio(e.target.value)}
              disabled={loadMunicipiosError}
            >
              <option value="">Municipio</option>
              {municipios.map((muni, idx) => <option key={idx} value={muni}>{muni}</option>)}
            </select>
            {loadingMunicipios ? <div className="spinner-container"><Loading /></div> : <div className="custom-arrow" />}
          </div>
          <label>Municipio</label>
          {loadMunicipiosError && (
            <p className="error" style={{ color: '#c0392b', fontWeight: 'bold', marginTop: '5px' }}>
              ⚠️ No se pudo cargar la lista de municipios en el tiempo esperado. Podés continuar sin seleccionarlo.
            </p>
          )}
          {municipios.length > 0 && errors.municipio && <p className="error">{errors.municipio}</p>}
        </div>

        <div className="form-group floating-label">
          <textarea
            value={additionalDetails}
            onChange={e => setAdditionalDetails(e.target.value)}
            required
            placeholder="Especifique detalles adicionales como marca, modelo o la falla"
          />
          <label>Detalles adicionales</label>
          {errors.additionalDetails && <p className="error">{errors.additionalDetails}</p>}
        </div>
      </div>

      <div className="form-group floating-label" id="form-discount">
        <span id="form-discount-span">Si tenés un código de descuento, ingrésalo aquí:</span>
        <input type="text" placeholder="Código de descuento" value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
      </div>

      <div className="blank-space"></div>
      <div className="next-button">
        <button onClick={handleSubmit}>Siguiente</button>
      </div>
    </div>
  )
}

export default InformationForm
