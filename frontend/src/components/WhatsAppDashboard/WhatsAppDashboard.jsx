// WhatsAppDashboard.js
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

  const getWaitingMinutes = (date) => {
    if (!date) return 0;
    const diff = Date.now() - new Date(date).getTime();
    return Math.floor(diff / 60000);
  };

  const getPriorityClass = (conv) => {
    const minutes = getWaitingMinutes(conv.humanRequestedAt);
    if (conv.status === 'in_progress') return 'in-progress-row';
    if (minutes >= 60) return 'critical-row'; // prioridad roja
    if (conv.pendingHuman) return 'pending-row'; // amarillo
    if (!conv.pendingHuman && conv.status === 'resolved') return 'resolved-row'; // celeste
    return '';
  };

  const fetchConversations = async () => {
    if (!auth) return;
    try {
      const res = await axios.get(`${getApiUrl()}/api/conversations`, { withCredentials: true });
      setConversations(res.data || []);
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

  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      const aMinutes = getWaitingMinutes(a.humanRequestedAt);
      const bMinutes = getWaitingMinutes(b.humanRequestedAt);

      const aPriority = aMinutes >= 60;
      const bPriority = bMinutes >= 60;

      if (aPriority && !bPriority) return -1;
      if (!aPriority && bPriority) return 1;

      if (a.pendingHuman && b.pendingHuman) return new Date(a.humanRequestedAt) - new Date(b.humanRequestedAt);
      if (a.pendingHuman) return -1;
      if (b.pendingHuman) return 1;

      return new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0);
    });
  }, [conversations]);

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
              // Normalizar teléfono
              const cleanPhone = conv.phone?.replace('@c.us', '') || '';
              const waPhone = cleanPhone.replace(/\D/g, '');

              // Normalizar assignedTo para mostrar solo la parte antes del @
              const assignedShort = conv.assignedTo ? conv.assignedTo.split('@')[0] : '-';
              const rowClass = getPriorityClass(conv);

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
                    ) : conv.pendingHuman && minutes >= 60 ? (
                      <span className="status critical">Prioridad</span>
                    ) : conv.pendingHuman ? (
                      <span className="status waiting">Esperando asesor</span>
                    ) : (
                      <span className="status resolved">Finalizado</span>
                    )}
                  </td>
                  <td>{assignedShort}</td>
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
          {renderTable(sortedConversations.filter(c => getWaitingMinutes(c.humanRequestedAt) >= 60 && c.pendingHuman))}

          <h3>🟡 Pendientes</h3>
          {renderTable(sortedConversations.filter(c => c.pendingHuman && getWaitingMinutes(c.humanRequestedAt) < 60 && c.status !== 'in_progress'))}

          <h3>⚪ En gestión</h3>
          {renderTable(sortedConversations.filter(c => c.status === 'in_progress'))}

          <h3>✅ Finalizados</h3>
          {renderTable(sortedConversations.filter(c => !c.pendingHuman && c.status === 'resolved'))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default WhatsAppDashboard;