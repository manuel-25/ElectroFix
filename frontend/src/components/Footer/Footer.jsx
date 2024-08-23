import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer class="footer">
            <div class="footer-content">
            <div class='footer-logo'>
                <img class='logo' src="/ELECTROSAFEwhite.svg" alt="Electrosafe logo" />
            </div>
            <div class="images">
                <a href="http://qr.afip.gob.ar/?qr=ueZdOH3wUQcOvPEgt_JCjw,," target="_F960AFIPInfo">
                <img class='qr-afip' src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg" alt="AFIP QR" />
                </a>
                <img class='secure-icon' src="/images/secure.png" alt="Secure Icon" />
            </div>
            <div class="footer-terms-and-condition">
                <p>© 2024 | <a href="/terminos-condiciones">Términos y Condiciones</a> | <a href="/privacidad">Privacidad</a></p>
            </div>
            <div class="footer-bottom">
                <p>Todos los derechos reservados Electrosafe. CUIT: 20-38930937-1 Buenos Aires | Argentina.</p>
                <p>Los precios online y los planes de financiación para los productos presentados/publicados en electrosafeweb.com son válidos exclusivamente para la compra vía internet.</p>
                <p>La venta de cualquier producto o servicio publicado está sujeta a la verificación de stock y/o disponibilidad.</p>
            </div>
            </div>
        </footer>
    );
}

export default Footer;
