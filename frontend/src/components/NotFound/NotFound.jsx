import React from 'react'
import './NotFound.css'

const NotFound = () => (
  <div className="notfound-container">
    <h1>404</h1>
    <h2>Página no encontrada</h2>
    <p>La página que estás buscando no existe o fue movida.</p>
    <a className="notfound-link" href="/">Volver al inicio</a>
  </div>
)

export default NotFound
