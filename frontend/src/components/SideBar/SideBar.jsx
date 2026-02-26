import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { FaClipboardList, FaPlusCircle, FaUsers, FaChartBar } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import axios from 'axios'
import { getApiUrl } from '../../config'

const Sidebar = () => {
  const [pendingCount, setPendingCount] = useState(0)
  const [whatsappCount, setWhatsappCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/quotes/count/pending`)
        setPendingCount(res.data.count)
      } catch (error) {
        console.error('Error al cargar cotizaciones pendientes', error)
      }
    }

    fetchCount()
    const interval = setInterval(fetchCount, 15000) // actualiza cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchWhatsAppCount = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/conversations/count/pending-human`)
        setWhatsappCount(res.data.count)
      } catch (error) {
        console.error('Error al cargar conversaciones pendientes', error)
      }
    }

    fetchWhatsAppCount()
    const interval = setInterval(fetchWhatsAppCount, 15000)
    return () => clearInterval(interval)
  }, [])

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
            {pendingCount > 0 && (
              <span className="notification-badge">{pendingCount}</span>
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
            {whatsappCount > 0 && (
              <span className="notification-badge">
                {whatsappCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
