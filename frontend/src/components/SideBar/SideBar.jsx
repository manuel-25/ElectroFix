import React, { useEffect, useState, useRef } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { FaClipboardList, FaPlusCircle, FaUsers, FaChartBar, FaWhatsapp } from 'react-icons/fa'
import axios from 'axios'
import { getApiUrl } from '../../config'

const Sidebar = () => {
  const [pendingCount, setPendingCount] = useState(0)
  const [pendingChats, setPendingChats] = useState(0)
  const [priorityChats, setPriorityChats] = useState(0)

  const previousTotalRef = useRef(0)
  const previousQuotesRef = useRef(0)
  const audioRef = useRef(null)

  // 🔊 Función para reproducir sonido de notificación una sola vez
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()          // Detiene cualquier sonido en reproducción
      audioRef.current.currentTime = 0  // Reinicia desde el inicio
      audioRef.current.play().catch(() => {})
    }
  }

  // 🔔 Cotizaciones + sonido
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/quotes/count/pending`)
        const newCount = res.data.count

        // 🔊 Reproducir sonido solo si aumenta
        if (newCount > previousQuotesRef.current) {
          playNotificationSound()
        }

        previousQuotesRef.current = newCount
        setPendingCount(newCount)
      } catch (error) {
        console.error('Error al cargar cotizaciones pendientes', error)
      }
    }

    fetchQuotes()
    const interval = setInterval(fetchQuotes, 15000)
    return () => clearInterval(interval)
  }, [])

  // 💬 WhatsApp counts + sonido
  useEffect(() => {
    const fetchWhatsAppCounts = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/conversations/count/sidebar`, { withCredentials: true })
        const pending = res.data.pending
        const priority = res.data.priority
        const total = pending + priority

        // 🔊 Reproducir sonido solo si aumenta
        if (total > previousTotalRef.current) {
          playNotificationSound()
        }

        previousTotalRef.current = total
        setPendingChats(pending)
        setPriorityChats(priority)
      } catch (error) {
        console.error('Error al cargar conversaciones', error)
      }
    }

    fetchWhatsAppCounts()
    const interval = setInterval(fetchWhatsAppCounts, 15000)
    return () => clearInterval(interval)
  }, [])

  const totalChats = pendingChats + priorityChats
  const displayChats = totalChats > 9 ? '9+' : totalChats

  return (
    <aside className="sidebar">

      {/* 🔊 Audio oculto */}
      <audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />

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
              <span className="notification-badge red">
                {pendingCount}
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
                className={`notification-badge ${priorityChats > 0 ? 'priority' : 'pending'}`}
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