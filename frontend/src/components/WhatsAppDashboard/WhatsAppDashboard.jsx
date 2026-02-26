import { useEffect, useState, useContext, useMemo } from 'react';
import axios from 'axios';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { getApiUrl } from '../../config';
import { AuthContext } from '../../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faHandPaper, faCheck } from '@fortawesome/free-solid-svg-icons';
import './WhatsAppDashboard.css';

function WhatsAppDashboard() {
  const { auth } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  // 🔹 Calcula minutos de espera desde humanRequestedAt
  const getWaitingMinutes = (date) => {
    if (!date) return 0;
    const diff = Date.now() - new Date(date).getTime();
    return Math.floor(diff / 60000);
  };

  // 🔹 Clase visual según prioridad / tiempo
  const getPriorityClass = (minutes, status) => {
    if (status === 'in_progress') return 'in-progress-row'; // gris clarito
    if (minutes >= 60) return 'critical';
    if (minutes >= 30) return 'warning';
    return 'normal';
  };

  // 🔹 Fetch de conversaciones desde backend
  const fetchConversations = async () => {
    if (!auth) return;
    try {
      const res = await axios.get(`${getApiUrl()}/api/conversations`, { withCredentials: true });
      setConversations(res.data || []);
      console.log('🛠 Debug conversaciones:', res.data);
    } catch (err) {
      console.error('❌ Error cargando conversaciones', err);
    }
  };

  useEffect(() => {
    if (!auth) return;
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, [auth]);

  // 🔹 Ordenar conversaciones
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      // Pendientes humano primero
      if (a.pendingHuman && b.pendingHuman) return new Date(a.humanRequestedAt) - new Date(b.humanRequestedAt);
      if (a.pendingHuman) return -1;
      if (b.pendingHuman) return 1;

      // Prioridad luego
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;

      // Últimos mensajes finalmente
      return new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0);
    });
  }, [conversations]);

  // 🔹 Acciones de conversación
  const resolveConversation = async (phone) => {
    try {
      await axios.post(`${getApiUrl()}/api/conversations/${phone}/resolve`, {}, { withCredentials: true });
      fetchConversations();
    } catch (err) {
      console.error('❌ Error resolviendo conversación', err);
    }
  };

  const takeConversation = async (phone) => {
    try {
      await axios.post(`${getApiUrl()}/api/conversations/${phone}/take`, {}, { withCredentials: true });
      fetchConversations();
    } catch (err) {
      console.error('❌ Error tomando conversación', err);
    }
  };

  // 🔹 Separar por tipo de conversación
  const priorityConvs = sortedConversations.filter(c => c.priority);
  const pendingConvs = sortedConversations.filter(c => c.pendingHuman && c.status !== 'in_progress');
  const inProgressConvs = sortedConversations.filter(c => c.pendingHuman && c.status === 'in_progress');
  const resolvedConvs = sortedConversations.filter(c => !c.pendingHuman && c.status === 'resolved');

  // 🔹 Render tabla
  const renderTable = (data) => (
    <div className="whatsapp-card">
      <div className="table-responsive">
        <table className="whatsapp-table">
          <thead>
            <tr>
              <th>Teléfono</th>
              <th>Último mensaje</th>
              <th>Espera</th>
              <th>No leídos</th>
              <th>Estado</th>
              <th>Asignado a</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-row">No hay conversaciones</td>
              </tr>
            )}
            {data.map(conv => {
              const minutes = getWaitingMinutes(conv.humanRequestedAt);
              const cleanPhone = conv.phone?.replace('@c.us', '');
              const waPhone = cleanPhone?.replace(/\D/g, '');
              const rowClass = getPriorityClass(minutes, conv.status);

              return (
                <tr key={cleanPhone} className={rowClass}>
                  <td>
                    {cleanPhone}
                    {conv.contactName && <div className="contact-name">{conv.contactName}</div>}
                  </td>
                  <td className="last-message">{conv.lastCustomerMessage || '-'}</td>
                  <td>{conv.pendingHuman ? <span className={`wait-badge ${rowClass}`}>{minutes}m</span> : '-'}</td>
                  <td>{conv.unreadCount > 0 ? <span className="unread-badge">{conv.unreadCount}</span> : '0'}</td>
                  <td>
                    {conv.status === 'in_progress' ? (
                      <span className="status in-progress">En gestión</span>
                    ) : conv.pendingHuman ? (
                      <span className="status waiting">Esperando asesor</span>
                    ) : (
                      <span className="status resolved">Finalizado</span>
                    )}
                  </td>
                  <td>{conv.assignedTo?.firstName || '-'}</td>
                  <td className="col-actions">
                    {conv.status !== 'in_progress' && conv.pendingHuman && (
                      <button
                        className="icon-btn assign-btn"
                        title="Tomar conversación"
                        onClick={() => takeConversation(conv.phone)}
                      >
                        <FontAwesomeIcon icon={faHandPaper} />
                      </button>
                    )}
                    {conv.pendingHuman || conv.status === 'in_progress' ? (
                      <button
                        className="icon-btn resolve-btn"
                        title="Marcar como resuelto"
                        onClick={() => resolveConversation(conv.phone)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    ) : null}
                    <a
                      href={`https://wa.me/${waPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn btn-whatsapp"
                      title="Abrir en WhatsApp"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="whatsapp-dashboard-wrapper">
        <div className="whatsapp-dashboard-container">
          <h2 className="dashboard-title">📱 WhatsApp Dashboard</h2>

          <h3>🔴 Prioridad</h3>
          {renderTable(priorityConvs)}

          <h3>🟡 Pendientes</h3>
          {renderTable(pendingConvs)}

          <h3>⚪ En gestión</h3>
          {renderTable(inProgressConvs)}

          <h3>✅ Finalizados</h3>
          {renderTable(resolvedConvs)}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default WhatsAppDashboard;