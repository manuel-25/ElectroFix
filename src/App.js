import React from 'react';
import './App.css';
import './root.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import Services from './components/Services/Services';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/*import About from './components/About/About'; // Ejemplo de otro componente
import Contact from './components/Contact/Contact'; // Ejemplo de otro componente
import Services from './components/Services/Services'; // Ejemplo de otro componente*/

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/about"/>
            <Route path="/contact"/>
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
