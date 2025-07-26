import React, { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { AuthContext } from '../../Context/AuthContext'
import { getApiUrl } from '../../config'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {
  const [error, setError] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [clients, setClients] = useState([])
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/quotes`)
        console.log('Cotizaciones:', res.data)
        setQuotes(res.data)
      } catch (err) {
        setError('Error al obtener las cotizaciones')
      }
    }
    fetchQuotes()
  }, [])

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/client`)
        console.log('Clientes:', res.data)
        setClients(res.data)
      } catch (err) {
        setError('Error al obtener las cotizaciones')
      }
    }
    fetchQuotes()
  }, [])

  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">📊 Panel Principal</h2>
        <div className="card-container">
          <div className="info-card blue">
            <p>SOLICITUD DE COTIZACIONES</p>
            <h3>{quotes.length}</h3>
          </div>
          <div className="info-card red">
            <p>CLIENTES</p>
            <h3>{clients.length}</h3>
          </div>
          <div className="info-card green">
            <p>SERVICIOS DEL MES</p>
            <h3>0</h3>
          </div>
          <div className="info-card orange">
            <p>INGRESOS DEL MES</p>
            <h3>$ 0.00</h3>
          </div>
        </div>

        {/* Podés agregar acá un gráfico tipo Chart.js, Recharts, o placeholder */}
        <div className="chart-placeholder">
          <p>📈 Gráfico de balance de los últimos 30 días</p>
          <div className="fake-chart" />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
