import React, { useState, useEffect } from "react"
import { faultsByCategory, alertConfig } from "../../utils/productsData.jsx"
import AlertMessage from "../AlertMessage/AlertMessage.jsx"
import "./FaultSelection.css"

const FaultSelection = ({ selectedCategory, nextStep, updateFormData }) => {
  let [selectedFaults, setSelectedFaults] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [currentAlert, setCurrentAlert] = useState(null)

  // Validación de selectedCategory para evitar errores
  if (!selectedCategory || !selectedCategory.id || !selectedCategory.name) {
    console.error("selectedCategory está mal definido:", selectedCategory)
  }

  // Obtener los faults de la categoría seleccionada
  const categoryFaults = Array.isArray(faultsByCategory[selectedCategory?.id])
    ? faultsByCategory[selectedCategory.id]
    : []

  const handleFaultChange = (fault) => {
    setSelectedFaults((prevState) =>
      prevState.includes(fault)
        ? prevState.filter((item) => item !== fault)
        : [...prevState, fault]
    )
  }

  useEffect(() => {
    // Habilitar o deshabilitar el botón según la selección
    setIsButtonDisabled(selectedFaults.length === 0)
  }, [selectedFaults])

  const handleAlertAction = (action) => {
    if (action === "continue") {
      console.log('selectedFaults: ', selectedFaults)
      updateFormData("faults", selectedFaults)
      setCurrentAlert(null)
      nextStep()
    } else if (action === "restart") {
      setCurrentAlert(null)
      window.location.href = "/reparacion-electrodomesticos" // Redirigir a la URL deseada
    }
  }

  const handleSubmit = () => {
    // Validar que selectedFaults sea un array y tenga al menos un elemento
    if (!Array.isArray(selectedFaults) || selectedFaults.length === 0) {
      console.error("selectedFaults no es válido o está vacío:", selectedFaults)
      selectedFaults = ["Error, no encontrado"] // Asignar valor predeterminado
    }

    const matchingAlert = alertConfig.find(
      (alert) =>
        alert.category === selectedCategory.name &&
        selectedFaults.includes(alert.fault)
    )

    if (matchingAlert) {
      setCurrentAlert(matchingAlert)
    } else {
      updateFormData("faults", selectedFaults)
      nextStep()
    }
  }

  return (
    <div className="selection-container">
      <h3>¿Cuál es el problema con tu {selectedCategory?.name || "dispositivo"}?</h3>
      <AlertMessage alert={currentAlert} onAction={handleAlertAction} />
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
      <div className="next-button">
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className={isButtonDisabled ? "disabled" : ""}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default FaultSelection
