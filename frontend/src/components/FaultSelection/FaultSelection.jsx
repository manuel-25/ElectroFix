import React, { useState, useEffect } from 'react'
import { faultsByCategory } from '../../utils/productsData.jsx'
import './FaultSelection.css'

const FaultSelection = ({ selectedCategory, nextStep, prevStep, updateFormData, formData }) => {
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
      <h3>¿Cuál es el problema con tu {selectedCategory.name}?</h3>
      <div className="selection-list">
        {categoryFaults.map((fault, index) => (
          <label
            key={index}
            className="selection-item checkbox"
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
