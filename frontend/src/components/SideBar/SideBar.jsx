import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { FaClipboardList, FaPlusCircle, FaUsers, FaChartBar } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/dashboard">
          <img src="/images/ElectrosafeIsotipo.png" alt="Electrosafe Logo" />
        </Link>
      </div>
      <ul className="sidebar-nav">
        <li title="Solicitudes">
          <Link to="/cotizaciones">
            <FaClipboardList />
            <span>Cotizaciones</span>
          </Link>
        </li>
        <li title="Nuevo servicio">
          <Link to="/nuevo-servicio">
            <FaPlusCircle />
            <span>Nuevo Servicio</span>
          </Link>
        </li>
        <li title="Clientes">
          <Link to="/clientes">
            <FaUsers />
            <span>Clientes</span>
          </Link>
        </li>
        <li title="Estadísticas">
          <Link to="/estadisticas">
            <FaChartBar />
            <span>Estadísticas</span>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
