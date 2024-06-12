import React from 'react';
import './App.css';
import './root.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<AboutUs />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/terminos-condiciones" element={<TermsAndConditions />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      {location.pathname !== '/services' && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
