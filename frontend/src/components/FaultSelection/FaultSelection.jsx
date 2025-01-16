import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { faultsByCategory } from "../../utils/productsData.jsx";
import { alertConfig } from "../../utils/productsData.jsx";
import AlertMessage from "../AlertMessage/AlertMessage.jsx";
import "./FaultSelection.css";

const FaultSelection = ({ selectedCategory, nextStep, updateFormData }) => {
  const [selectedFaults, setSelectedFaults] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(null);
  const navigate = useNavigate(); // Hook para navegación

  const categoryFaults = faultsByCategory[selectedCategory.id] || [];

  const handleFaultChange = (fault) => {
    setSelectedFaults((prevState) =>
      prevState.includes(fault)
        ? prevState.filter((item) => item !== fault)
        : [...prevState, fault]
    );
  };

  useEffect(() => {
    setIsButtonDisabled(selectedFaults.length === 0);
  }, [selectedFaults]);

  const handleAlertAction = (action) => {
    if (action === "continue") {
      setCurrentAlert(null);
      nextStep();
    } else if (action === "restart") {
      setCurrentAlert(null);
      window.location.href = "/reparacion-electrodomesticos"; // Redirigir a la URL deseada
    }
  };

  const handleSubmit = () => {
    if (selectedFaults.length > 0) {
      const matchingAlert = alertConfig.find(
        (alert) =>
          alert.category === selectedCategory.name &&
          selectedFaults.includes(alert.fault)
      );

      if (matchingAlert) {
        setCurrentAlert(matchingAlert);
      } else {
        updateFormData("faults", selectedFaults);
        nextStep();
      }
    }
  };

  return (
    <div className="selection-container">
      <h3>¿Cuál es el problema con tu {selectedCategory.name}?</h3>
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
  );
};

export default FaultSelection;
