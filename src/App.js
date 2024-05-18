import './App.css'
import './root.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MainContent from './components/MainContent/MainContent'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <MainContent />
      </main>
      <Footer />
    </div>
  )
}

export default App
