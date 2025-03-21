import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTruckFast, faHouse } from "@fortawesome/free-solid-svg-icons";
import "./ServiceSelection.css";

const ALLOWED_CATEGORIES = [5, 15, 18, 17, 8];

const ServiceSelection = ({ selectedProvince, selectedMunicipio, selectedCategory, nextStep, updateFormData }) => {
  const [selectedBranch, setSelectedBranch] = useState("");

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSubmit = () => {
    const branchToSubmit = selectedBranch || "No estoy seguro";
    updateFormData("branch", branchToSubmit);
    nextStep();
  };

  const isProvinceAllowed = 
    selectedProvince === "Buenos Aires" || selectedProvince === "Ciudad Autónoma de Buenos Aires";

  const showRetiroEntrega = isProvinceAllowed && ALLOWED_CATEGORIES.includes(selectedCategory);

  return (
    <div className="selection-container">
      <h3>¿Qué servicio preferís?</h3>
      <p className="optional-text">Recordá que no tenés que pagar ahora. Te enviaremos un presupuesto aproximado.</p>
      
      <div className="branch-cards">
        {isProvinceAllowed && (
          <>
            {/* Sucursal Barracas */}
            <div
              className={`branch-card ${selectedBranch === "Barracas" ? "selected" : ""}`}
              onClick={() => handleBranchSelect("Barracas")}
            >
              <img src="/logo.png" alt="Logo Electrosafe" className="branch-icon" />
              <div className="branch-text">
                <h4>Sucursal Barracas</h4>
                <p>📍 Rocha 175</p>
              </div>
            </div>

            {/* Sucursal Quilmes */}
            <div
              className={`branch-card ${selectedBranch === "Quilmes" ? "selected" : ""}`}
              onClick={() => handleBranchSelect("Quilmes")}
            >
              <img src="/logo.png" alt="Logo Electrosafe" className="branch-icon" />
              <div className="branch-text">
                <h4>Sucursal Quilmes</h4>
                <p>📍 Av. Vicente López 770</p>
              </div>
            </div>

            {/* Retiro y Entrega a Domicilio */}
            {showRetiroEntrega && (
              <div
                className={`branch-card ${selectedBranch === "Retiro y Entrega" ? "selected" : ""}`}
                onClick={() => handleBranchSelect("Retiro y Entrega")}
              >
                <FontAwesomeIcon icon={faTruckFast} className="branch-icon" id="retiroyentrega" />
                <div className="branch-text">
                  <h4>Retiro y Entrega</h4>
                  <p>Retiro y entrega a domicilio</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Envío por correo */}
        {!isProvinceAllowed && (
          <div
            className={`branch-card ${selectedBranch === "Envío por correo" ? "selected" : ""}`}
            onClick={() => handleBranchSelect("Envío por correo")}
          >
            <FontAwesomeIcon icon={faTruckFast} className="branch-mail" />
            <div className="branch-text">
              <h4>Envío por correo</h4>
              <p>Envialo a una sucursal de Correo Argentino cercana</p>
            </div>
          </div>
        )}

        {/* No estoy seguro */}
        <div
          className={`branch-card ${selectedBranch === "No estoy seguro" ? "selected" : ""}`}
          onClick={() => handleBranchSelect("No estoy seguro")}
        >
          <FontAwesomeIcon icon={faLocationDot} className="branch-icon" />
          <div className="branch-text">
            <h4>No estoy seguro</h4>
            <p>Podés decidir más tarde</p>
          </div>
        </div>
      </div>
      <div className="blank-space"></div>
      {/* Botón siguiente */}
      <div className="next-button">
        <button onClick={handleSubmit} className={selectedBranch ? "" : "disabled"}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
