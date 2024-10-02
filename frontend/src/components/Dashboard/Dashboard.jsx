import React, { useEffect, useState, useContext } from 'react';
import Loading from '../Loading/Loading.jsx';
import axios from 'axios';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getApiUrl } from '../../config.js';
import { AuthContext } from '../../Context/AuthContext.jsx';
import SearchClient from '../SearchClient/SearchClient.jsx';
import SearchQuote from '../SearchQuote/SearchQuote.jsx';

const Dashboard = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTableContentVisible, setIsTableContentVisible] = useState(true);
  const [customerNumber, setCustomerNumber] = useState(''); // Para buscar cliente
  const [clientData, setClientData] = useState(null); // Para mostrar datos del cliente
  const [quoteNumber, setQuoteNumber] = useState('');

  const { auth } = useContext(AuthContext);

  console.log('auth: ', auth);

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await axios.get(`${getApiUrl()}/api/quotes`);
        const sortedCotizaciones = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setCotizaciones(sortedCotizaciones);
      } catch (err) {
        setError('Error al cargar las cotizaciones');
      } finally {
        setLoading(false);
      }
    };
    fetchCotizaciones();
  }, []);

  const handleStatusChange = async (serviceRequestNumber, newStatus) => {
    try {
      await axios.put(`${getApiUrl()}/api/quotes/${serviceRequestNumber}`, { status: newStatus });
      setCotizaciones(cotizaciones.map(cotizacion =>
        cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, status: newStatus } : cotizacion
      ));
    } catch (err) {
      setError('Error al actualizar el estado');
    }
  };

  const handleReviewChange = (serviceRequestNumber, newReview) => {
    setCotizaciones(cotizaciones.map(cotizacion =>
      cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, review: newReview } : cotizacion
    ));
  };

  const handleReviewEdit = async (serviceRequestNumber, review) => {
    try {
      await axios.put(`${getApiUrl()}/api/quotes/${serviceRequestNumber}`, { review });
      setCotizaciones(cotizaciones.map(cotizacion =>
        cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, review } : cotizacion
      ));
    } catch (err) {
      setError('Error al actualizar la revisión');
    }
  };

  const toggleTableContentVisibility = () => {
    setIsTableContentVisible(prev => !prev);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'En revisión':
        return 'row-in-review';
      case 'Presupuesto Enviado':
        return 'row-budget-sent';
      case 'Aprobada':
        return 'row-approved';
      case 'Rechazada':
        return 'row-rejected';
      case 'Listo para devolución':
        return 'row-ready-for-return';
      default:
        return '';
    }
  };

  const handleSearchClient = async () => {
    if (!customerNumber) {
      setError('Por favor ingrese un número de cliente.');
      return
    }
  
    if (!/^\d+$/.test(customerNumber)) { // Verifica si el número es solo dígitos
      setError('El número de cliente debe ser un valor numérico válido.')
      return
    }
  
    try {
      const response = await axios.get(`${getApiUrl()}/api/client/${customerNumber}`)
      
      setClientData(response.data)
      setError(null)
  
    } catch (err) {
      setClientData(null);
      setError('Cliente no encontrado');
    }
  }  

  const handleSearchQuote = async () => {
    if (!quoteNumber) {
      setError('Por favor ingrese un número de cotización.');
      return;
    }
  
    try {
      const response = await axios.get(`${getApiUrl()}/api/quotes/${quoteNumber}`);
      const foundQuote = response.data;
      if (foundQuote) {
        setCotizaciones([foundQuote]);  // Solo muestra la cotización encontrada
        setError(null);
      } else {
        setError('Cotización no encontrada.');
      }
    } catch (err) {
      setError('Error al buscar la cotización');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Electro Dashboard</h1>
      <p>Esta es una sección protegida y solo puede ser vista por usuarios autenticados. No compartir la información.</p>

      {/* Componentes de búsqueda de cliente y cotización */}
      <div className="search-section">
        <SearchClient setError={setError} />
        <SearchQuote setError={setError} />
      </div>

      {/* Agrupamos botón y tabla */}
      <div className="cotizaciones-section">
        <button className="toggle-cotizaciones-button" onClick={toggleTableContentVisibility}>
          {isTableContentVisible ? 'Ocultar Cotizaciones' : 'Mostrar Cotizaciones'}
        </button>

        {isTableContentVisible && (
          <table className="cotizaciones-table">
            <thead>
              <tr>
                <th className="smaller-column"># Solicitud</th>
                <th className="smaller-column"># Cliente</th>
                <th className="smaller-column">Fecha</th>
                <th className="appliance-column">Electrodoméstico</th>
                <th className="status-column">Estado</th>
                <th className="details-column">Detalles</th>
                <th className="faults-column">Fallas</th>
                <th className="location-column">Ubicación</th>
                <th className="review-column">Revisión</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((cotizacion) => (
                <tr key={cotizacion.serviceRequestNumber} className={getStatusClass(cotizacion.status)}>
                  <td className="smaller-column">{cotizacion.serviceRequestNumber || 'Null'}</td>
                  <td className="smaller-column">{cotizacion.customerNumber || 'Null'}</td>
                  <td className="smaller-column">{new Date(cotizacion.date).toLocaleDateString()}</td>
                  <td className="appliance-column">{`${cotizacion.category.name}, ${cotizacion.brand}, ${cotizacion.model || 'N/A'}`}</td>
                  <td className="status-column">
                    <select
                      value={cotizacion.status}
                      onChange={(e) => handleStatusChange(cotizacion.serviceRequestNumber, e.target.value)}
                      className={`status-select ${getStatusClass(cotizacion.status)}`}
                    >
                      {['En revisión', 'Presupuesto Enviado', 'Aprobada', 'Rechazada', 'Listo para devolución'].map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="details-column">{cotizacion.userData?.additionalDetails || 'N/A'}</td>
                  <td className="faults-column">{cotizacion.faults ? cotizacion.faults.join(', ') : 'N/A'}</td>
                  <td className="location-column">{`${cotizacion.userData.municipio || 'N/A'}, ${cotizacion.userData.province || 'N/A'}`}</td>
                  <td className="review-cell">
                    <textarea
                      value={cotizacion.review || ''}
                      onChange={(e) => handleReviewChange(cotizacion.serviceRequestNumber, e.target.value)}
                      placeholder="Escribe tu revisión"
                      className="review-textarea"
                    />
                    <button
                      className="edit-review-button"
                      onClick={() => handleReviewEdit(cotizacion.serviceRequestNumber, cotizacion.review)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
