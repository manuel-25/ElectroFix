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

        {error && <p className="error-message">{error}</p>}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
