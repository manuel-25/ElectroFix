import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../config.js';
import './SearchClient.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SearchClient = ({ setError }) => {
  const [customerNumber, setCustomerNumber] = useState('');
  const [clientData, setClientData] = useState(null);
  const [error, setErrorState] = useState(null); // Estado para mostrar el error
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);

  const handleSearchClient = async () => {
    if (!customerNumber) {
      setErrorState('Por favor ingrese un número de cliente.');
      return;
    }

    try {
      const response = await axios.get(`${getApiUrl()}/api/client/${customerNumber}`);
      const foundClient = response.data;
      if (foundClient) {
        setClientData(foundClient);
        setErrorState(null);
      } else {
        setErrorState('Cliente no encontrado.');
      }
    } catch (err) {
      setErrorState('Error al buscar el cliente');
    }
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div className="search-client-section">
      <h2 className="search-client-title">Buscar Cliente</h2>
      <div className="search-client-input-button-wrapper">
        <input
          type="text"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          placeholder="Número de Cliente"
          className="search-input"
        />
        <button onClick={handleSearchClient} className="search-client-button">
          Buscar Cliente
        </button>
      </div>

      {/* Mostrar el mensaje de error si existe */}
      {error && <div className="error-message">{error}</div>}

      {/* Mostrar datos del cliente encontrado */}
      {clientData && (
        <div className="client-details">
          <div className="client-header">
            <h3 className="details-title">Datos del Cliente</h3>
            <button className={`toggle-button ${isDetailsVisible ? 'active' : ''}`} onClick={toggleDetailsVisibility}>
                <FontAwesomeIcon icon={isDetailsVisible ? faChevronUp : faChevronDown} />
            </button>
          </div>

          {isDetailsVisible && (
            <table className="client-table">
              <tbody>
                <tr>
                  <td><strong>Nombre</strong></td>
                  <td>{clientData.firstName || "No disponible"} {clientData.lastName || "No disponible"}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>{clientData.email || "No disponible"}</td>
                </tr>
                <tr>
                  <td><strong>Teléfono</strong></td>
                  <td>{clientData.phone || "No disponible"}</td>
                </tr>
                <tr>
                  <td><strong>Provincia</strong></td>
                  <td>{clientData.province || "No disponible"}</td>
                </tr>
                <tr>
                  <td><strong>Municipio</strong></td>
                  <td>{clientData.municipio || "No disponible"}</td>
                </tr>
                <tr>
                  <td><strong>Fecha de Creación</strong></td>
                  <td>{new Date(clientData.createdAt).toLocaleDateString() || "No disponible"}</td>
                </tr>
                <tr>
                  <td><strong>Solicitudes de Servicio</strong></td>
                  <td>{clientData.serviceRequestNumbers.length > 0 ? clientData.serviceRequestNumbers.join(', ') : "No disponible"}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchClient;
