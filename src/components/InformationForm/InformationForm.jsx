import React, { useState } from 'react';
import './InformationForm.css'; // Asegúrate de tener el archivo CSS para los estilos

const InformationForm = ({ nextStep, prevStep, updateFormData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const provinces = [
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos',
    'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
    'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
  ];

  const handleProvinceSelect = (event) => {
    setProvince(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      province,
      discountCode,
      additionalDetails
    };
    updateFormData(formData);
    nextStep();
  };

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
          <select id='select-provincia' value={province} onChange={handleProvinceSelect} required>
            <option value="">Provincia</option>
            {provinces.map((province, index) => (
              <option key={index} value={province}>{province}</option>
            ))}
          </select>
          <label>Provincia</label>
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
  );
};

export default InformationForm;
