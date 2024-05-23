import React, { useState } from 'react';
import './FaultSelection.css';

const FaultSelection = ({ selectedCategory, nextStep, prevStep, updateFormData, formData }) => {
  const faultsByCategory = {
    1: ['No enciende', 'No inicia sistema', 'Pantalla rota / dañada', 'Tapa trasera dañada', 'Problemas de batería', 'No carga', 'Problemas de software', 'Falla pantalla táctil', 'Pantalla en negro / con líneas', 'Falla el audio', 'Otra'],
    2: ['No enciende', 'Errores de sistema', 'Problemas con los joystick', 'No lee discos', 'Se congela', 'Sobrecalentamiento', 'Pantalla en negro', 'Falla de almacenamiento', 'Mantenimiento / Limpieza', 'Otra'],
    3: ['No enciende', 'No hay imagen', 'Sin sonido', 'Problemas con el control remoto', 'Imagen distorsionada', 'Problemas con las conexiones HDMI/AV', 'Otra'],
    4: ['No enciende', 'Enciende no calienta', 'Salen chispas', 'Ruidos fuertes', 'Problemas con el temporizador', 'Se apaga solo', 'Otra'],
    5: ['No enciende', 'Enciende no calienta', 'Salen chispas', 'Humo', 'Olor a quemado', 'Problemas con la bomba de agua', 'No muele café', 'Mantenimiento / Limpieza', 'Otra'],
    6: ['No enciende', 'Enciende no calienta', 'Salen chispas', 'Ruidos fuertes', 'Olor a quemado', 'Problemas con el termostato', 'Otra'],
    7: ['No enciende', 'Enciende no calienta', 'Salen chispas', 'Humo', 'Olor a quemado', 'Problemas con el temporizador', 'Otra'],
    8: ['No enciende', 'No calienta', 'Salen chispas', 'Ruidos fuertes', 'Olor a quemado', 'Problemas con el rociador de vapor', 'Base dañada', 'Otra'],
    9: ['No enciende', 'No calienta', 'Ruidos fuertes', 'Olor a quemado', 'Se apaga sola', 'Problemas con el motor', 'Otra'],
    10: ['No enciende', 'No calienta', 'Olor a quemado', 'Problemas con las placas', 'Cable dañado', 'Otra'],
    11: ['No enciende', 'No inicia sistema operativo', 'Bisagras dañadas / rotas', 'Falla del teclado', 'Pantalla rota', 'Pantalla Azul', 'No hay imagen', 'Problemas de teclado', 'No carga / problema con el cargador', 'Batería dura poco / no anda', 'Se sobrecalienta', 'Se apaga', 'Mantenimiento / limpieza', 'Virus', 'Olvidé la contraseña', 'Ingreso líquido / se mojó', 'Otra'],
    12: ['No enciende', 'No enfría', 'Ruidos fuertes', 'Problemas con el termostato', 'Fugas de líquido refrigerante', 'Otra'],
    13: ['No enciende', 'Ruidos fuertes', 'No gira', 'Problemas con el motor', 'Vibración excesiva', 'Otra'],
    14: ['No enciende', 'No calienta', 'Olor a quemado', 'Salta la térmica', 'Problemas con el termostato', 'Se apaga sola', 'Otra']
  };

  const [selectedFaults, setSelectedFaults] = useState([]);

  const categoryFaults = faultsByCategory[selectedCategory.id] || [];

  const handleFaultChange = (fault) => {
    setSelectedFaults(prevState => {
      if (prevState.includes(fault)) {
        return prevState.filter(item => item !== fault);
      } else {
        return [...prevState, fault];
      }
    });
  };

  const handleSubmit = () => {
    updateFormData('faults', selectedFaults);
    nextStep();
  };

  return (
    <div className="selection-container">
      <h2>¿Cuál es el problema con tu {selectedCategory.name}?</h2>
      <div className="selection-list">
        {categoryFaults.map((fault, index) => (
          <label
            key={index}
            className="selection-item"
            htmlFor={`fault-${index}`}
            onClick={() => handleFaultChange(fault)}
          >
            <span>{fault}</span>
            <input
              type="checkbox"
              id={`fault-${index}`}
              name={`fault-${index}`}
              value={fault}
              checked={selectedFaults.includes(fault)}
              onChange={() => handleFaultChange(fault)}
            />
          </label>
        ))}
      </div>
      <div className='nav-buttons'>
        <button className="back-button" onClick={prevStep}>Volver</button>
        <button onClick={handleSubmit}>Siguiente</button>
      </div>
    </div>
  );
};

export default FaultSelection;
