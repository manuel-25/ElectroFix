import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../config.js';
import './SearchQuote.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SearchQuote = ({ setError }) => {
  const [quoteNumber, setQuoteNumber] = useState('');
  const [quoteData, setQuoteData] = useState(null);
  const [error, setErrorState] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(true); // Estado para mostrar/ocultar detalles

  const handleSearchQuote = async () => {
    if (!quoteNumber) {
      setErrorState('Por favor ingrese un número de cotización.');
      return;
    }

    try {
      const response = await axios.get(`${getApiUrl()}/api/quotes/${quoteNumber}`);
      const foundQuote = response.data;
      if (foundQuote) {
        setQuoteData(foundQuote);
        setErrorState(null);
      } else {
        setErrorState('Cotización no encontrada.');
      }
    } catch (err) {
      setErrorState('Error al buscar la cotización');
    }
  };

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div className="search-quote-section">
      <h2 className="search-quote-title">Buscar Cotización</h2>
      <div className="search-client-input-button-wrapper">
        <input
          type="text"
          value={quoteNumber}
          onChange={(e) => setQuoteNumber(e.target.value)}
          placeholder="Número de Cotización"
          className="search-input"
        />
        <button onClick={handleSearchQuote} className="search-client-button">
          Buscar Cotización
        </button>
      </div>

      {/* Mostrar los detalles de la cotización si se encuentra */}
      {quoteData && (
        <div className="quote-details">
          <div className="client-header">
            <h3 className="details-title">Detalles de la Cotización</h3>
            <button className={`toggle-button ${isDetailsVisible ? 'active' : ''}`} onClick={toggleDetailsVisibility}>
              <FontAwesomeIcon icon={isDetailsVisible ? faChevronUp : faChevronDown} />
            </button>
          </div>

          {isDetailsVisible && (
            <table className="quote-table">
              <tbody>
                <tr>
                  <td><strong># Solicitud</strong></td>
                  <td>{quoteData.serviceRequestNumber}</td>
                </tr>
                <tr>
                  <td><strong>Cliente</strong></td>
                  <td>{quoteData.customerNumber}</td>
                </tr>
                <tr>
                  <td><strong>Electrodoméstico</strong></td>
                  <td>{`${quoteData.category.name}, ${quoteData.brand}`}</td>
                </tr>
                <tr>
                  <td><strong>Fecha</strong></td>
                  <td>{new Date(quoteData.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td><strong>Estado</strong></td>
                  <td>{quoteData.status}</td>
                </tr>
                <tr>
                  <td><strong>Revisión</strong></td>
                  <td>{quoteData.review || 'No disponible'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchQuote;
