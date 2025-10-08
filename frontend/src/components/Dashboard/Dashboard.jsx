import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { getApiUrl } from '../../config'
import { AuthContext } from '../../Context/AuthContext'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import './Dashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale)

const Dashboard = () => {
  const [quotes, setQuotes] = useState([])
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [error, setError] = useState(null)
  const [fullUser, setFullUser] = useState(null)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 30)
    return d.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0])
  const { auth, loading: authLoading } = useContext(AuthContext)
  const token = auth?.token

  useEffect(() => {
    if (authLoading || !token) return

    const fetchData = async () => {
      try {
        const [quotesRes, clientsRes, servicesRes] = await Promise.all([
          axios.get(`${getApiUrl()}/api/quotes`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${getApiUrl()}/api/client`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${getApiUrl()}/api/service`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])
        setQuotes(quotesRes.data)
        setClients(clientsRes.data)
        setServices(servicesRes.data)
      } catch (err) {
        setError('Error al obtener datos')
      }
    }

    fetchData()
  }, [authLoading, token])

  useEffect(() => {
    if (!token || authLoading) return

    const fetchFullUser = async () => {
      try {
        const res = await axios.get(`${getApiUrl()}/api/manager/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setFullUser(res.data)
      } catch (err) {
        console.error('Error al obtener perfil completo:', err)
      }
    }

    fetchFullUser()
  }, [token, authLoading])

  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  const today = now.toISOString().split('T')[0]

  const servicesCreatedToday = services.filter(s => new Date(s.createdAt).toISOString().split('T')[0] === today)
  const servicesCreatedThisMonth = services.filter(s => {
    const d = new Date(s.createdAt)
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear
  })

  const servicesDeliveredToday = services.filter(s => {
    const d = new Date(s.deliveredAt).toISOString().split('T')[0]
    return s.status === 'Entregado' && d === today
  })

  const servicesDeliveredThisMonth = services.filter(s => {
    const d = new Date(s.deliveredAt)
    return s.status === 'Entregado' && d.getMonth() === thisMonth && d.getFullYear() === thisYear
  })

  const quotesThisMonth = quotes.filter(q => {
    const d = new Date(q.date)
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear
  })

  const quotesToday = quotes.filter(q => new Date(q.date).toISOString().split('T')[0] === today)

  const filteredDeliveredServices = services.filter(s => {
    const d = new Date(s.deliveredAt)
    return s.status === 'Entregado' && d >= new Date(startDate) && d <= new Date(endDate)
  })

  const dailyCounts = filteredDeliveredServices.reduce((acc, s) => {
    const day = new Date(s.deliveredAt).toISOString().split('T')[0]
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(dailyCounts).sort(),
    datasets: [
      {
        label: 'Servicios Entregados',
        data: Object.entries(dailyCounts).sort(([a], [b]) => new Date(a) - new Date(b)).map(([_, v]) => v),
        borderColor: '#4B8DF8',
        backgroundColor: '#4B8DF880',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day', tooltipFormat: 'dd/MM/yyyy' },
        ticks: { autoSkip: true, maxTicksLimit: 10 }
      },
      y: { beginAtZero: true, precision: 0 }
    }
  }

  // Conteo mensual de servicios entregados
  const monthlyCounts = services
    .filter(s => s.status === 'Entregado')
    .reduce((acc, s) => {
      const d = new Date(s.deliveredAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const monthlyLabels = Object.keys(monthlyCounts).sort().map(key => {
    const [year, month] = key.split('-')
    return `${monthNames[Number(month) - 1]} ${year}`
  })

  const chartDataMonth = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Servicios Entregados por Mes',
        data: Object.entries(monthlyCounts).sort(([a], [b]) => new Date(a) - new Date(b)).map(([_, v]) => v),
        backgroundColor: '#3b82f6',
        borderRadius: 10,
        maxBarThickness: 42,
      }
    ]
  }

  const chartOptionsMonth = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { title: { display: true, text: 'Mes' }},
      y: { beginAtZero: true, precision: 0, title: { display: true, text: 'Servicios' } }
    }
  }

  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        {fullUser && (
          <div className="user-greeting">
            <h2>👋 Hola, {fullUser.firstName} {fullUser.lastName}</h2>
            <p>Rol: <strong>{fullUser.role}</strong></p>
            {fullUser.branch && <p>Sucursal: <strong>{fullUser.branch}</strong></p>}
            <p>Último acceso: <strong>{fullUser.lastLoginAt ? new Date(fullUser.lastLoginAt).toLocaleString('es-AR') : 'No registrado'}</strong></p>
          </div>
        )}

        <h2 className="dashboard-title">📊 Panel Principal</h2>

        <div className="card-container">
          <div className="info-card blue">
            <p>SOLICITUDES DE COTIZACIÓN</p>
            <h3>{quotes.length}</h3>
            <span className="card-icon">📋</span>
          </div>
          <div className="info-card red">
            <p>CLIENTES</p>
            <h3>{clients.length}</h3>
            <span className="card-icon">👤</span>
          </div>
          <div className="info-card teal">
            <p>SERVICIOS CREADOS ESTE MES</p>
            <h3>{servicesCreatedThisMonth.length}</h3>
            <span className="card-icon">⚙️</span>
          </div>
          <div className="info-card purple">
            <p>SERVICIOS ENTREGADOS ESTE MES</p>
            <h3>{servicesDeliveredThisMonth.length}</h3>
            <span className="card-icon">📦</span>
          </div>
          {/*
          <div className="info-card yellow">
            <p>SERVICIOS CREADOS HOY</p>
            <h3>{servicesCreatedToday.length}</h3>
            <span className="card-icon">🛠️</span>
          </div>
          <div className="info-card green">
            <p>SERVICIOS ENTREGADOS HOY</p>
            <h3>{servicesDeliveredToday.length}</h3>
            <span className="card-icon">✅</span>
          </div>
          <div className="info-card orange">
            <p>COTIZACIONES HOY</p>
            <h3>{quotesToday.length}</h3>
            <span className="card-icon">🗓️</span>
          </div>
          */}
        </div>

        <div className="chart-box">
          <div className="chart-header">
            <p>📈 Servicios Entregados</p>
            <div className="date-range">
              <label>Desde:</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <label>Hasta:</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="chart-box" style={{ marginTop: 40 }}>
          <div className="chart-header">
            <p>📊 Servicios Entregados por Mes</p>
          </div>
          <Line data={chartDataMonth} options={chartOptionsMonth} />
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
