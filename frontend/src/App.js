import React from 'react'
import './App.css'
import './root.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MainContent from './components/MainContent/MainContent'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import AboutUs from './components/AboutUs/AboutUs'
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'
import Login from './components/Login/Login.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Cotizaciones from './components/Cotizaciones/Cotizaciones.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout/DashboardLayout.jsx'
import Clients from './components/Clients/Clients.jsx'


function AppContent() {
  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/reparacion-electrodomesticos" element={<Services />} />
          <Route path="/terminos-condiciones" element={<TermsAndConditions />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/manager" element={<Login />} />
          
          {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/cotizaciones" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Cotizaciones />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/clientes" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Clients />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        </Routes>
      </main>
      {/* Mostrar el Footer solo si no estamos en la ruta de servicios */}
      {location.pathname !== '/reparacion-electrodomesticos' && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
