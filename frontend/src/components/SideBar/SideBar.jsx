import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { FaClipboardList, FaPlusCircle, FaUsers, FaChartBar, FaWhatsapp } from 'react-icons/fa'
import { useNotifications } from '../../Context/NotificationContext'

const Sidebar = () => {
  const { pendingQuotes, pendingChats, priorityChats } = useNotifications()

  const totalChats = pendingChats + priorityChats
  const displayChats = totalChats > 9 ? '9+' : totalChats

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <Link to="/dashboard">
          <img src="/images/ElectrosafeIsotipo.png" alt="Electrosafe Logo" />
        </Link>
      </div>

      <ul className="sidebar-nav">

        <li title="Cotizaciones">
          <Link to="/cotizaciones" className="sidebar-link">
            <FaClipboardList />
            <span>Cotizaciones</span>

            {pendingQuotes > 0 && (
              <span className="notification-badge red">
                {pendingQuotes}
              </span>
            )}
          </Link>
        </li>

        <li title="Servicios">
          <Link to="/servicios" className="sidebar-link">
            <FaPlusCircle />
            <span>Servicios</span>
          </Link>
        </li>

        <li title="Clientes">
          <Link to="/clientes" className="sidebar-link">
            <FaUsers />
            <span>Clientes</span>
          </Link>
        </li>

        <li title="Estadísticas">
          <Link to="/estadisticas" className="sidebar-link">
            <FaChartBar />
            <span>Estadísticas</span>
          </Link>
        </li>

        <li title="WhatsApp">
          <Link to="/whatsapp" className="sidebar-link">
            <FaWhatsapp />
            <span>WhatsApp</span>

            {totalChats > 0 && (
              <span
                className={`notification-badge ${
                  priorityChats > 0 ? 'priority' : 'pending'
                }`}
              >
                {displayChats}
              </span>
            )}
          </Link>
        </li>

      </ul>
    </aside>
  )
}

export default Sidebar