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
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 30)
    return d.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0])
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quotesRes, clientsRes] = await Promise.all([
          axios.get(`${getApiUrl()}/api/quotes`),
          axios.get(`${getApiUrl()}/api/client`)
        ])
        setQuotes(quotesRes.data)
        setClients(clientsRes.data)
      } catch (err) {
        setError('Error al obtener datos')
      }
    }
    fetchData()
  }, [])

  // Cotizaciones del mes actual
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  const today = now.toISOString().split('T')[0]

  const quotesThisMonth = quotes.filter(q => {
    const qDate = new Date(q.date)
    return qDate.getMonth() === thisMonth && qDate.getFullYear() === thisYear
  })

  const quotesToday = quotes.filter(q => {
    const qDateStr = new Date(q.date).toISOString().split('T')[0]
    return qDateStr === today
  })

  const filteredQuotes = quotes.filter(q => {
    const qDate = new Date(q.date)
    return qDate >= new Date(startDate) && qDate <= new Date(endDate)
  })

  const dailyCounts = filteredQuotes.reduce((acc, q) => {
    const day = new Date(q.date).toISOString().split('T')[0]
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(dailyCounts).sort(),
    datasets: [
      {
        label: 'Cotizaciones por día',
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
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'dd/MM/yyyy'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        beginAtZero: true,
        precision: 0
      }
    }
  }

  // Agrupa cotizaciones por mes en formato YYYY-MM
  const monthlyCounts = quotes.reduce((acc, q) => {
    const d = new Date(q.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` // Ej: "2025-07"
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  // Si querés mostrarlo como "Jul 2025" podés transformar el label
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const monthlyLabels = Object.keys(monthlyCounts).sort().map(key => {
    const [year, month] = key.split('-')
    return `${monthNames[Number(month) - 1]} ${year}`
  })

  const chartDataMonth = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Cotizaciones por mes',
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
      y: { beginAtZero: true, precision: 0, title: { display: true, text: 'Cotizaciones' } }
    }
  }

  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">📊 Panel Principal</h2>
        <div className="card-container">
          <div className="info-card blue">
            <p>SOLICITUD DE COTIZACIONES</p>
            <h3>{quotes.length}</h3>
            <span className="card-icon">📋</span>
          </div>
          <div className="info-card red">
            <p>CLIENTES</p>
            <h3>{clients.length}</h3>
            <span className="card-icon">👤</span>
          </div>
          <div className="info-card green">
            <p>COTIZACIONES DEL MES</p>
            <h3>{quotesThisMonth.length}</h3>
            <span className="card-icon">📆</span>
          </div>
          <div className="info-card orange">
            <p>COTIZACIONES DEL DIA</p>
            <h3>{quotesToday.length}</h3>
            <span className="card-icon">🗓️</span>
          </div>
        </div>
        <div className="chart-box">
          <div className="chart-header">
            <p>📈 Cotizaciones por día</p>
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
            <p>📊 Cotizaciones por mes</p>
          </div>
          <Line data={chartDataMonth} options={chartOptionsMonth} />
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
