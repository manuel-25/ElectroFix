import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Asegúrate de crear estilos para la tabla

const Dashboard = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/quotes'); // Ajusta la URL a tu API
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

  const handleDelete = async (serviceRequestNumber) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cotización?')) {
      try {
        await axios.delete(`http://localhost:8000/api/quotes/${serviceRequestNumber}`);
        setCotizaciones(cotizaciones.filter(cotizacion => cotizacion.serviceRequestNumber !== serviceRequestNumber));
      } catch (err) {
        setError('Error al eliminar la cotización');
      }
    }
  };

  const handleStatusChange = async (serviceRequestNumber, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/quotes/${serviceRequestNumber}`, { status: newStatus });
      setCotizaciones(cotizaciones.map(cotizacion =>
        cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, status: newStatus } : cotizacion
      ));
    } catch (err) {
      setError('Error al actualizar el estado');
    }
  };

  const handleReviewChange = async (serviceRequestNumber, newReview) => {
    try {
      await axios.put(`http://localhost:8000/api/quotes/${serviceRequestNumber}`, { review: newReview });
      setCotizaciones(cotizaciones.map(cotizacion =>
        cotizacion.serviceRequestNumber === serviceRequestNumber ? { ...cotizacion, review: newReview } : cotizacion
      ));
    } catch (err) {
      setError('Error al actualizar la revisión');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <p>Esta es una sección protegida y solo puede ser vista por usuarios autenticados.</p>

      <table className="cotizaciones-table">
        <thead>
          <tr>
            <th>Número de Solicitud</th>
            <th>Número de Cliente</th>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Fallas</th>
            <th>Estado</th>
            <th>Detalles Adicionales</th>
            <th>Revisión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map((cotizacion) => (
            <tr key={cotizacion.serviceRequestNumber}>
              <td>{cotizacion.serviceRequestNumber || 'Null'}</td>
              <td>{cotizacion.customerNumber || 'Null'}</td>
              <td>{new Date(cotizacion.date).toLocaleDateString()}</td>
              <td>{cotizacion.category.name}</td>
              <td>{cotizacion.brand}</td>
              <td>{cotizacion.model || 'N/A'}</td>
              <td>{cotizacion.faults && cotizacion.faults.length > 0 ? cotizacion.faults.join(', ') : 'N/A'}</td>
              <td>
                <select
                  value={cotizacion.status}
                  onChange={(e) => handleStatusChange(cotizacion.serviceRequestNumber, e.target.value)}
                >
                  {['En revisión', 'Presupuesto Enviado', 'Aprobada', 'Rechazada', 'Listo para devolución'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>{cotizacion.userData?.additionalDetails || 'N/A'}</td>
              <td>
                <input
                  type="text"
                  value={cotizacion.review || ''}
                  onChange={(e) => handleReviewChange(cotizacion.serviceRequestNumber, e.target.value)}
                  placeholder="Escribe tu revisión"
                />
              </td>
              <td className="action-buttons">
                <button className="edit-button" onClick={() => console.log(`Editar cotización ${cotizacion.serviceRequestNumber}`)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(cotizacion.serviceRequestNumber)}>
                  <i className="fas fa-times"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
