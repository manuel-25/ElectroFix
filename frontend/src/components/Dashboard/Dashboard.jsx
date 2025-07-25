import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">📊 Panel Principal</h2>
        <div className="card-container">
          <div className="info-card blue">
            <p>EQUIPOS</p>
            <h3>63</h3>
          </div>
          <div className="info-card red">
            <p>CLIENTES</p>
            <h3>1878</h3>
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
