import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img className="logo" src="/images/ELECTROSAFELOGOBLACK333333.png" alt="Electrosafe logo" />
                </div>
                <div className="images">
                    <a href="http://qr.afip.gob.ar/?qr=ueZdOH3wUQcOvPEgt_JCjw,," target="_F960AFIPInfo">
                        <img className="qr-afip" src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg" alt="AFIP QR" />
                    </a>
                    <img className="secure-icon" src="/images/secure.png" alt="Secure Icon" />
                </div>
                <div className="footer-terms-and-condition">
                    <p>© 2024 | <a href="/terminos-condiciones">Términos y Condiciones</a> | <a href="/privacidad">Privacidad</a></p>
                </div>
                <div className="footer-bottom">
                    <p>Todos los derechos reservados Electrosafe. CUIT: 20-38930937-1 Buenos Aires | Argentina.</p>
                    <p>Los precios online y los planes de financiación para los productos presentados/publicados en electrosafeweb.com son válidos exclusivamente para la compra vía internet.</p>
                    <p>La venta de cualquier producto o servicio publicado está sujeta a la verificación de stock y/o disponibilidad.</p>
                </div>
            </div>
            <div className="footer-developer">
                <p className='footer-p'>
                    Desarrollado por &nbsp;
                    <a href="https://github.com/manuel-25" target="_blank" rel="noopener noreferrer" className="github-link">
                        &lt; manuel-25 /&gt;
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
