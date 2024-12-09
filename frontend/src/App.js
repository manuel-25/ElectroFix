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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'  // Importar correctamente el AuthProvider
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

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
          
          {/* Ruta protegida para el dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
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
