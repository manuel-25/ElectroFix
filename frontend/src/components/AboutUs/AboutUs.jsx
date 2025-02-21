import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us-container">
      {/* Banner principal */}
      <div className="about-us-mainbanner">
        <div className="about-us-text">
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

      <section className="about-us-communication">
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
            <h2>3+ años</h2>
            <p>Más de 3 años de experiencia revolucionando el rubro.</p>
          </div>
          <div className="about-us-stats-card">
            <h2>2.000+</h2>
            <p>Desde 2021 reparamos más de 2.000 electrodomésticos de manera exitosa.</p>
          </div>
          <div className="about-us-stats-card">
            <h2>10.000+</h2>
            <p>Más de 10.000 cotizaciones enviadas desde nuestra Web.</p>
          </div>
        </div>

        {/* Banner secundario: La historia */}
        <div className="about-us-secondary-banner inverse">
          <div className="about-us-text">
            <h1>La historia de Electrosafe</h1>
            <p>
              Desde nuestros inicios, hemos innovado en la forma de reparar electrodomésticos, combinando tecnología y atención personalizada.
              Nuestro compromiso es facilitar el acceso a servicios de calidad, eliminando las barreras tradicionales de la reparación y convirtiéndonos en referentes de confianza en todo el país.
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
  );
};

export default AboutUs;
