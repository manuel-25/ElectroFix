import React from 'react';
import './TermsAndConditions.css'; // Archivo CSS para estilos específicos

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      {/* Sección de Términos y Condiciones de Uso */}
      <div className="section">
        <h1 className="main-title">Términos y Condiciones de Uso</h1>
        <p className="normal-text">
          Este documento describe los términos y condiciones de uso del sitio web{' '}
          <a href="https://electrosafeweb.com">https://electrosafeweb.com</a> (el “Sitio” o la “Plataforma”).
          Se deja constancia que cualquier persona que no acepte estos términos y condiciones,
          que son de carácter obligatorio y vinculante, deberá abstenerse de utilizar el Sitio y/o los servicios.
        </p>
      </div>

      {/* Sección de Operador del Sitio */}
      <div className="section">
        <h2 className="section-title">Operador del Sitio</h2>
        <p className="normal-text">
          Este sitio web <a href="https://electrosafeweb.com">https://electrosafeweb.com</a> es operado por Electrosafe S.A.S.,
          con domicilio en Av. Principal 123, Ciudad Electrónica, Electrovia, CP 12345 (en adelante “Electrosafe”).
        </p>
      </div>

      {/* Sección ¿Qué es Electrosafe? */}
      <div className="section">
        <h2 className="section-title">¿Qué es Electrosafe?</h2>
        <p className="small-text">
          Electrosafe es una empresa legalmente constituida en Argentina, dedicada a la reparación de equipos electrónicos,
          proporcionando soluciones rápidas y efectivas para dispositivos como celulares, tablets, computadoras, entre otros.
        </p>
      </div>

      {/* Sección Servicio de Reparación */}
      <div className="section">
        <h2 className="section-title">Servicio de Reparación</h2>
        <p className="normal-text">
          Electrosafe ofrece servicios de reparación a través de una plataforma digital,
          conectando a los usuarios con técnicos especializados para la reparación de sus dispositivos electrónicos.
        </p>
        <p className="small-text">
          Los servicios incluyen revisión técnica, diagnóstico, y reparación de equipos electrónicos conforme a las necesidades y especificaciones del usuario.
          Electrosafe se esfuerza por mantener altos estándares de calidad en todos los servicios prestados.
        </p>
      </div>

      {/* Sección Usuarios - Capacidad */}
      <div className="section">
        <h2 className="section-title">Usuarios - Capacidad</h2>
        <p className="normal-text">
          Los Servicios de Electrosafe están disponibles para personas físicas o jurídicas con capacidad legal para contratar.
          No podrán utilizar los Servicios las personas que no tengan esa capacidad, los menores de edad o los Usuarios que
          hayan sido suspendidos del Sitio.
        </p>
      </div>

      {/* Sección El Servicio */}
      <div className="section">
        <h2 className="section-title">El Servicio</h2>
        <p className="normal-text">
          A través del Sitio, los usuarios pueden solicitar servicios de reparación detallando las características de su equipo,
          recibiendo opciones de servicio adaptadas a sus necesidades específicas.
        </p>
        <p className="small-text">
          Electrosafe ofrece diferentes modalidades de servicio, incluyendo reparación en sitio, envío por correo,
          y servicio remoto, entre otros, para brindar soluciones flexibles y convenientes a sus clientes.
        </p>
      </div>

      {/* Sección Responsabilidades del Usuario */}
      <div className="section">
        <h2 className="section-title">Responsabilidades del Usuario</h2>
        <p className="normal-text">
          Los usuarios son responsables de proporcionar información precisa sobre los equipos a reparar,
          así como de mantener actualizados sus datos de contacto para una comunicación efectiva con Electrosafe.
        </p>
        <p className="small-text">
          Además, los usuarios deben asegurarse de realizar respaldos de la información contenida en sus equipos
          antes de enviarlos para su reparación, minimizando riesgos de pérdida de datos durante el proceso.
        </p>
      </div>

      {/* Sección Responsabilidades de Electrosafe */}
      <div className="section">
        <h2 className="section-title">Responsabilidades de Electrosafe</h2>
        <p className="normal-text">
          Electrosafe se compromete a proporcionar una plataforma segura y eficiente para la intermediación
          de servicios de reparación de equipos electrónicos, facilitando la conexión entre usuarios y técnicos
          especializados.
        </p>
        <p className="small-text">
          Sin embargo, Electrosafe no asume responsabilidad por la calidad final de los servicios prestados
          por terceros, ni garantiza la disponibilidad ininterrumpida de la plataforma, reservándose el derecho
          de realizar mantenimientos o actualizaciones necesarias para su correcto funcionamiento.
        </p>
      </div>

      {/* Sección Propiedad Intelectual */}
      <div className="section">
        <h2 className="section-title">Propiedad Intelectual</h2>
        <p className="normal-text">
          Todos los contenidos del Sitio, incluyendo diseños, logotipos, y textos, son propiedad exclusiva
          de Electrosafe y están protegidos por las leyes de propiedad intelectual correspondientes.
        </p>
        <p className="small-text">
          Queda estrictamente prohibida la reproducción o utilización no autorizada de cualquier parte del Sitio
          sin consentimiento previo por escrito de Electrosafe.
        </p>
      </div>

      {/* Sección Modificaciones de los Términos y Condiciones */}
      <div className="section">
        <h2 className="section-title">Modificaciones de los Términos y Condiciones</h2>
        <p className="normal-text">
          Electrosafe se reserva el derecho de modificar los términos y condiciones en cualquier momento,
          siendo responsabilidad del usuario revisar periódicamente esta sección para estar informado de los cambios.
        </p>
        <p className="small-text">
          La continuidad en el uso del Sitio después de la publicación de cambios constituirá la aceptación de dichos cambios por parte del usuario.
        </p>
      </div>

      {/* Sección Ley Aplicable y Jurisdicción */}
      <div className="section">
        <h2 className="section-title">Ley Aplicable y Jurisdicción</h2>
        <p className="normal-text">
          Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República Argentina.
        </p>
        <p className="small-text">
          Cualquier controversia derivada de estos términos y condiciones será sometida a los tribunales ordinarios competentes de la Ciudad de Buenos Aires.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
