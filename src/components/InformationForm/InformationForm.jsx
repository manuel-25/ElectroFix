import React, { useState } from 'react'
import './InformationForm.css' // Asegúrate de tener el archivo CSS para los estilos

const InformationForm = ({ nextStep, prevStep, updateFormData }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [discountCode, setDiscountCode] = useState('')

  // Lista de provincias de Argentina
  const provinces = [
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos',
    'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
    'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
  ]

  const handleProvinceSelect = (event) => {
    setProvince(event.target.value)
  }

  const handleSubmit = () => {
    // Aquí puedes enviar los datos del formulario
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      province,
      discountCode
    }
    // Actualizar los datos del formulario en el componente padre
    updateFormData(formData)
    // Avanzar a la siguiente etapa
    nextStep()
  }

  return (
    <div className="selection-container">
      <h2>Te pedimos tus datos, para compartirte la cotización</h2>
      <div className="form-group">
        <label>Nombre:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Apellido:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Teléfono:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Provincia:</label>
        <select value={province} onChange={handleProvinceSelect}>
          <option value="">Seleccionar</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>{province}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Si tenés un código de descuento, ingrésalo aquí:</label>
        <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
      </div>
      <div className='nav-buttons'>
        <button className="back-button" onClick={prevStep}>Volver</button>
        <button onClick={handleSubmit}>Finalizar</button>
      </div>
    </div>
  )
}

export default InformationForm
