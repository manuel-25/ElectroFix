import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className='footer-logo'>
                    <h4>
                        <span className="footer-logo-left">Electrosafe</span>
                    </h4>
                </div>
                <div className="footer-terms-and-condition">
                    <p>© 2024 | <a href="/terminos-condiciones">Términos y Condiciones</a> | <a href="/privacidad">Privacidad</a></p>
                </div>
                <div className="footer-bottom">
                    <p>Todos los derechos reservados Electrosafe</p>
                    <p>Av. Vicente Lopez 770 B1878 Quilmes | Argentina</p>
                    <p>Los precios online y los planes de financiación para los productos presentados/publicados en electrosafe.com son válidos exclusivamente para la compra vía internet.</p>
                    <p>La venta de cualquier producto o servicio publicado está sujeta a la verificación de stock y/o disponibilidad.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer