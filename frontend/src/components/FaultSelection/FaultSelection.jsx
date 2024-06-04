import React, { useState, useEffect } from 'react'
import './FaultSelection.css'

const FaultSelection = ({ selectedCategory, nextStep, prevStep, updateFormData, formData }) => {
  const faultsByCategory = {
    1: ['No enciende', 'No inicia sistema', 'Pantalla rota / dañada', 'Falla pantalla táctil', 'Pantalla en negro / con líneas', 'No carga', 'Falla el audio', 'Problemas de batería', 'Problemas de software', 'Tapa trasera dañada', 'Otra'],
    2: ['No enciende', 'Errores de sistema', 'No lee discos', 'Problemas con los joystick', 'Pantalla en negro', 'Sobrecalentamiento', 'Se congela', 'Falla de almacenamiento', 'Mantenimiento / Limpieza', 'Otra'],
    3: ['No enciende', 'No hay imagen', 'Sin sonido', 'Imagen distorsionada', 'Problemas con el control remoto', 'Problemas con las conexiones HDMI/AV', 'Otra'],
    4: ['No enciende', 'Enciende no calienta', 'Ruidos fuertes', 'Salen chispas', 'Problemas con el temporizador', 'Se apaga solo', 'Otra'],
    5: ['No enciende', 'Enciende no calienta', 'No muele café', 'Olor a quemado', 'Salen chispas', 'Humo', 'Problemas con la bomba de agua', 'Mantenimiento / Limpieza', 'Otra'],
    6: ['No enciende', 'Enciende no calienta', 'Olor a quemado', 'Salen chispas', 'Ruidos fuertes', 'Problemas con el termostato', 'Otra'],
    7: ['No enciende', 'Enciende no calienta', 'Olor a quemado', 'Salen chispas', 'Humo', 'Problemas con el temporizador', 'Otra'],
    8: ['No enciende', 'No calienta', 'Olor a quemado', 'Salen chispas', 'Ruidos fuertes', 'Problemas con el rociador de vapor', 'Base dañada', 'Otra'],
    9: ['No enciende', 'No calienta', 'Olor a quemado', 'Ruidos fuertes', 'Se apaga sola', 'Problemas con el motor', 'Otra'],
    10: ['No enciende', 'No calienta', 'Olor a quemado', 'Problemas con las placas', 'Cable dañado', 'Otra'],
    11: ['No enciende', 'No inicia sistema operativo', 'Pantalla rota', 'Pantalla Azul', 'No carga / problema con el cargador', 'Falla del teclado', 'Bisagras dañadas / rotas', 'No hay imagen', 'Se sobrecalienta', 'Se apaga', 'Mantenimiento / limpieza', 'Virus', 'Olvidé la contraseña', 'Ingreso líquido / se mojó', 'Batería dura poco / no anda', 'Problemas de teclado', 'Otra'],
    12: ['No enciende', 'No enfría', 'Ruidos fuertes', 'Problemas con el termostato', 'Fugas de líquido refrigerante', 'Otra'],
    13: ['No enciende', 'Ruidos fuertes', 'No gira', 'Problemas con el motor', 'Vibración excesiva', 'Otra'],
    14: ['No enciende', 'No calienta', 'Olor a quemado', 'Salta la térmica', 'Problemas con el termostato', 'Se apaga sola', 'Otra'],
    15: ['No enciende', 'No calienta', 'Olor a quemado', 'Ruidos fuertes', 'Problemas con la puerta', 'Problemas con el temporizador', 'Se apaga sola', 'Otra']
  }

  const [selectedFaults, setSelectedFaults] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const categoryFaults = faultsByCategory[selectedCategory.id] || []

  const handleFaultChange = (fault) => {
    setSelectedFaults(prevState => {
      if (prevState.includes(fault)) {
        return prevState.filter(item => item !== fault)
      } else {
        return [...prevState, fault]
      }
    })
  }

  useEffect(() => {
    setIsButtonDisabled(selectedFaults.length === 0)
  }, [selectedFaults])

  const handleSubmit = () => {
    if (selectedFaults.length > 0) {
      updateFormData('faults', selectedFaults)
      nextStep()
    }
  }

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
      <div className='next-button'>
        <button onClick={handleSubmit} disabled={isButtonDisabled} className={isButtonDisabled ? 'disabled' : ''}>
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default FaultSelection
