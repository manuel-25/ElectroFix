import React from 'react';
import './PrivacyPolicy.css'; // Archivo CSS para estilos específicos

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      {/* Encabezado */}
      <div className="section">
        <h1 className="main-title">Política de Privacidad</h1>
        <p className="normal-text">
          Electro Fix! informa a los usuarios acerca de su política de protección de datos de carácter personal (en adelante, los Datos Personales) para que determinen libre y voluntariamente si desean facilitar a Electro Fix! los Datos Personales que se les puedan requerir o que se puedan obtener de los Usuarios con ocasión del registro o realización de los servicios. Electro Fix! se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales, así como a las mejores prácticas de la industria. En dichos supuestos, Electro Fix! anunciará en esta página las futuras modificaciones.
        </p>
        <p className="normal-text">
          La presente Política de Privacidad se integra con los Términos y Condiciones disponibles en terminos-condiciones y se aplicará a los Usuarios del Sitio, estén o no debidamente registrados. Las definiciones utilizadas en los Términos y Condiciones subsistirán y serán aplicables en las presente Políticas de Privacidad.
        </p>
      </div>

      {/* Sección Recolección de Información */}
      <div className="section">
        <h2 className="section-title">Recolección de Información de los Usuarios</h2>
        <p className="normal-text">
          El Usuario reconoce y acepta que Electro Fix! pueda recolectar información acerca de los Usuarios al momento de utilizar el Sitio, tales como su nombre, apellido, teléfono, email, entre otros (en adelante los “Datos”). Los Datos serán almacenados en una base de datos de propiedad de Electro Fix! y serán tratados de forma confidencial y con las debidas medidas de seguridad que se detallarán más adelante.
        </p>
      </div>

      {/* Sección Finalidad de los Datos */}
      <div className="section">
        <h2 className="section-title">Finalidad de los Datos</h2>
        <p className="normal-text">
          Los Datos suministrados por el Usuario y recolectados de conformidad con lo establecido en las presentes Políticas de Privacidad serán utilizados con la siguiente finalidad:
        </p>
        <ul className="list-items">
          <li>El posible proceso de contratación Online de los servicios.</li>
          <li>Ofrecer a los Usuarios, servicios, productos y promociones adaptadas a sus preferencias personales (mediante previa aprobación del Usuario).</li>
          <li>Permitir el envío de emails directamente relacionados con los intereses (mediante previa aprobación del Usuario).</li>
          <li>Cumplir con disposiciones legales.</li>
          <li>Cumplir algún procedimiento legal, incluso orden judicial de cualquier otro órgano regulatorio competente.</li>
          <li>Proteger los derechos de Electro Fix!</li>
          <li>Cuando haya sido expresamente autorizado el uso de los datos personales por el mismo Usuario.</li>
        </ul>
        <p className="normal-text">
          Adicionalmente, la información que provea el Usuario y que Electro Fix! recolecte directamente en nombre de dicho Usuario, podrá ser utilizada por Electro Fix! para el intercambio de datos entre Electro Fix! y sus proveedores de servicio a fin de brindar los servicios con una mayor eficacia. Electro Fix! utilizará los Datos provistos por el Usuario, y la recolectada por Electro Fix! conforme a lo establecido en las Políticas de Privacidad, y no la divulgará salvo que sea solicitada por tribunales, u organismos estatales nacionales o internacionales que así lo requieran y lo soliciten en la forma correspondiente.
        </p>
      </div>

      {/* Otras secciones como Menores de Edad, Confidencialidad y Seguridad de la Información, etc. */}
      {/* Puedes continuar agregando las secciones según el texto proporcionado */}

      {/* Sección Contacto */}
      <div className="section">
        <h2 className="section-title">Contacto</h2>
        <p className="normal-text">
          En caso que el Usuario tenga alguna duda acerca de la Política de Privacidad, o sobre la aplicación de la misma, deberá ponerse en contacto con Electro Fix!, en cualquier momento, vía correo electrónico a <a href="mailto:contacto@electrofix.com">contacto@electrofix.com</a>. Electro Fix!, CUIT 30-12345678-9, CON DOMICILIO EN Av. Libertador 1234, Ciudad de Buenos Aires, Argentina.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
