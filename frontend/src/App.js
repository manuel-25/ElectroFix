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
import Perfil from './components/Perfil/Perfil.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout/DashboardLayout.jsx'
import Clients from './components/Clients/Clients.jsx'
import QuoteDetail from './components/QuoteDetail/QuoteDetail.jsx'
import Servicios from './components/Servicios/Servicios.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import NuevoServicio from './components/NuevoServicio/NuevoServicio.jsx'
import ClientDetail from './components/ClientDetail/ClientDetail.jsx'
import ServiceDetail from './components/ServiceDetail/ServiceDetail.jsx'
import TicketViewer from './components/TicketViewer/TicketViewer.jsx'
import EditarServicio from './components/EditarServicio/EditarServicio.jsx'
import useGtagPageView from './utils/useGtagPageView.js'

function AppContent() {
  const location = useLocation()
  useGtagPageView()

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
              <DashboardLayout><Dashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/cotizaciones" element={
            <ProtectedRoute>
              <DashboardLayout><Cotizaciones /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/cotizaciones/:id" element={
            <ProtectedRoute>
              <DashboardLayout><QuoteDetail /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/clientes" element={
            <ProtectedRoute>
              <DashboardLayout><Clients /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/clientes/:id" element={
            <ProtectedRoute>
              <DashboardLayout><ClientDetail /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/servicios" element={
            <ProtectedRoute>
              <DashboardLayout><Servicios /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/servicios/nuevo" element={
            <ProtectedRoute>
              <DashboardLayout><NuevoServicio /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/servicios/:code/editar" element={
            <ProtectedRoute>
              <DashboardLayout><EditarServicio /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/servicios/:code" element={
            <ProtectedRoute>
              <DashboardLayout><ServiceDetail /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <DashboardLayout><Perfil /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {location.pathname !== '/reparacion-electrodomesticos' && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 🧾 Mostrar el TicketViewer de forma aislada */}
          <Route path="/ticket/:publicId" element={<TicketViewer />} />

          {/* 🌐 Todo lo demás con layout completo */}
          <Route path="*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
