import React from 'react'
import './AboutUs.css'
import CountUp from '../CountUp/CountUp.jsx'
import { Helmet } from 'react-helmet'

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Electrosafe - Service de Electrodomésticos</title>
        <meta name="description" content="Conocé la historia de Electrosafe: desde microondas en un departamento hasta más de 3.000 equipos reparados en Quilmes y Barracas. Confianza, seguridad y experiencia." />

        <meta property="og:title" content="Quiénes Somos | Electrosafe" />
        <meta property="og:description" content="Electrosafe nace en 2021 con una misión: reparar, no descartar. Conocé nuestra historia y cómo ayudamos a miles de clientes." />
        <meta property="og:image" content="https://electrosafeweb.com/logo.png" />
        <meta property="og:url" content="https://electrosafeweb.com/sobre-nosotros" />
        <meta property="og:type" content="website" />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://electrosafeweb.com/sobre-nosotros" />
      </Helmet>
      <section className="about-us-container">
        {/* Banner principal */}
        <div className="about-us-mainbanner">
          <div className="about-us-text">
            <h5>Sobre Nosotros</h5>  
            <h1>Electrosafe transforma la forma de reparar electrodomésticos</h1>
            <p>
              Nos esforzamos por ofrecer una experiencia ágil y clara, brindando presupuestos aproximados para que puedas traer tus equipos a nuestra sucursal sin complicaciones.
              Nos apasiona ayudar a que tus electrodomésticos vuelvan a funcionar como nuevos, sin perder tiempo ni energía.
            </p>
          </div>
          <div className="about-us-image">
            <img 
              src="/images/WhatsApp Image 2025-02-18 at 22.16.53_9f8c5a73.jpg" 
              alt="Equipo Electrosafe en acción" 
            />
          </div>
        </div>

        <section className="about-us-communication" id="communication">
          {/* Banner secundario: Cotizá online */}
          <div className="about-us-secondary-banner">
            <div className="about-us-text">
              <h1>Cotizá online</h1>
              <p>
                Nuestro servicio te permite obtener un presupuesto online en cuestión de minutos, sin importar en qué punto de Argentina te encuentres.
                Gracias a nuestra plataforma, eliminamos demoras y complicaciones, ofreciéndote un diagnóstico rápido y transparente que se traduce en soluciones seguras.
              </p>
            </div>
            <div className="about-us-image">
              <img 
                src="/images/WhatsApp Image 2025-02-18 at 22.16.55_ca03b78c.jpg" 
                alt="Proceso de cotización online" 
              />
            </div>
          </div>

          <div className="space-line"></div>

          {/* Estadísticas */}
          <div className="about-us-stats">
            <div className="about-us-stats-card">
              <h2><CountUp end={3} duration={1500} decimals={0} />+ años</h2>
              <p>Más de 3 años de experiencia revolucionando el rubro.</p>
            </div>
            <div className="about-us-stats-card">
              <h2><CountUp end={2500} duration={2000} decimals={0}></CountUp>+</h2>
              <p>Desde 2021 reparamos más de 3.000 electrodomésticos de manera exitosa.</p>
            </div>
            <div className="about-us-stats-card">
              <h2><CountUp end={10000} duration={3500} decimals={0}></CountUp>+</h2>
              <p>Más de 10.000 cotizaciones enviadas desde nuestra Web.</p>
            </div>
          </div>

          {/* Banner secundario: La historia */}
          <div className="about-us-secondary-banner inverse">
            <div className="about-us-text">
              <h1>La historia de Electrosafe</h1>
              <p>
              Electrosafe nació en 2021 cuando Lucas, en plena pandemia, descubrió que reparar electrodomésticos era más que un hobby:
              era darles una segunda vida.* Lo que empezó arreglando microondas en su departamento para amigos,
                creció con el boca a boca hasta convertirse en un taller profesional. El nombre Electrosafe nace de la idea de "safar" de lo descartable:
              preferimos reparar con seguridad antes que recomprar. Hoy, con dos sucursales y una comunidad que nos elige, seguimos fieles a ese primer propósito.
              </p>
            </div>
            <div className="about-us-image">
              <img 
                src="/images/WhatsApp Image 2025-02-18 at 22.28.44_3266af07.jpg" 
                alt="Historia de Electrosafe" 
              />
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default AboutUs
