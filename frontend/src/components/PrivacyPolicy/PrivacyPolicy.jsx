import React from 'react';
import './PrivacyPolicy.css'; // Archivo CSS para estilos específicos

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      {/* Encabezado */}
      <div className="section">
        <h1 className="main-title">Política de Privacidad</h1>
        <p className="normal-text">
          Electrosafe informa a los usuarios acerca de su política de protección de datos de carácter personal (en adelante, los Datos Personales) para que determinen libre y voluntariamente si desean facilitar a Electrosafe los Datos Personales que se les puedan requerir o que se puedan obtener de los Usuarios con ocasión del registro o realización de los servicios. Electrosafe se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales, así como a las mejores prácticas de la industria. En dichos supuestos, Electrosafe anunciará en esta página las futuras modificaciones.
        </p>
        <p className="normal-text">
          La presente Política de Privacidad se integra con los Términos y Condiciones disponibles en terminos-condiciones y se aplicará a los Usuarios del Sitio, estén o no debidamente registrados. Las definiciones utilizadas en los Términos y Condiciones subsistirán y serán aplicables en las presente Políticas de Privacidad.
        </p>
      </div>

      {/* Sección Recolección de Información */}
      <div className="section">
        <h2 className="section-title">Recolección de Información de los Usuarios</h2>
        <p className="normal-text">
          El Usuario reconoce y acepta que Electrosafe pueda recolectar información acerca de los Usuarios al momento de utilizar el Sitio, tales como su nombre, apellido, teléfono, email, entre otros (en adelante los “Datos”). Los Datos serán almacenados en una base de datos de propiedad de Electrosafe y serán tratados de forma confidencial y con las debidas medidas de seguridad que se detallarán más adelante.
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
          <li>Proteger los derechos de Electrosafe.</li>
          <li>Cuando haya sido expresamente autorizado el uso de los datos personales por el mismo Usuario.</li>
        </ul>
        <p className="normal-text">
          Adicionalmente, la información que provea el Usuario y que Electrosafe recolecte directamente en nombre de dicho Usuario, podrá ser utilizada por Electrosafe para el intercambio de datos entre Electrosafe y sus proveedores de servicio a fin de brindar los servicios con una mayor eficacia. Electrosafe utilizará los Datos provistos por el Usuario, y la recolectada por Electrosafe conforme a lo establecido en las Políticas de Privacidad, y no la divulgará salvo que sea solicitada por tribunales, u organismos estatales nacionales o internacionales que así lo requieran y lo soliciten en la forma correspondiente.
        </p>
      </div>

      {/* Sección Menores de Edad */}
      <div className="section">
        <h2 className="section-title">Menores de Edad</h2>
        <p className="normal-text">
          El Sitio y/o los Servicios están permitidos sólo a quienes tengan edad legal para contratar y no se encuentren inhibidos legalmente o de algún modo vedados de ejercer actos jurídicos, derechos y/u obligaciones. Habida cuenta de ello, los menores de 18 años no tienen permitido el ingreso al Sitio y/o los Servicios ni el suministro de ningún dato personal u otro tipo de información.
        </p>
      </div>

      {/* Sección Confidencialidad y Seguridad de la Información */}
      <div className="section">
        <h2 className="section-title">Confidencialidad y Seguridad de la Información</h2>
        <p className="normal-text">
          Electrosafe ha adoptado medidas de seguridad razonables para proteger la información de los Usuarios, e impedir el acceso no autorizado a sus datos o cualquier modificación, divulgación o destrucción no autorizada de los mismos. La información recolectada por Electrosafe será mantenida de manera estrictamente confidencial. El acceso a los datos personales está restringido a aquellos empleados, contratistas y representantes de Electrosafe que necesitan conocer tales datos para desempeñar sus funciones y desarrollar o mejorar nuestros servicios. La Empresa exige a sus proveedores los mismos estándares de confidencialidad. La Empresa no permite el acceso a esta información a terceros ajenos a Electrosafe, a excepción de un pedido expreso del Usuario. La seguridad de los datos de los Usuarios es importante para Electrosafe. Electrosafe utiliza software específico para proteger los datos brindados por los Usuarios y la información recabada por Electrosafe. Tanto el sistema operativo del servidor como el software de almacenamiento de la base de datos se actualizan periódicamente con los parches de seguridad asociados. Asimismo, todas las conexiones al Sitio son encriptadas (HTTPS).
        </p>
      </div>

      {/* Sección Cesión de los Datos */}
      <div className="section">
        <h2 className="section-title">Cesión de los Datos</h2>
        <p className="normal-text">
          Electrosafe no venderá, alquilará ni compartirá los Datos de los Usuarios salvo aquellos casos expresamente previstos en las Políticas de Privacidad. No obstante ello, el Usuario presta su expresa conformidad para que Electrosafe transfiera total o parcialmente los datos del Usuario a cualquiera de sus sociedades controladas, controlantes y/o vinculadas con Electrosafe, como así también a los Proveedores de servicio. Los proveedores de servicio no tendrán acceso a la base de datos. No obstante ello, a fin de poder brindar los Servicios, tendrán acceso a los datos de los Usuarios que hubieran llevado a cabo el proceso de contratación de sus servicios de conformidad con lo previsto en los Términos y Condiciones.
        </p>
      </div>

      {/* Sección Cookies */}
      <div className="section">
        <h2 className="section-title">Cookies</h2>
        <p className="normal-text">
          El Usuario reconoce y acepta que el Sitio podrá utilizar cookies para brindar a los Usuarios un servicio más completo, recordando sus preferencias. La información que recopile Electrosafe podrá incluir el comportamiento de navegación, dirección IP, logs, y otros tipos de información. Sin embargo, Electrosafe no recolectará información personal identificable de manera directa de ningún Usuario usando cookies o tags. Un cookie es un pequeño archivo de texto mediante el cual se puede identificar en forma exclusiva un navegador de internet, y que suele ser instalado, enviado o escrito en el ordenador de los Usuarios de internet, cuando los mismos ingresan a determinados sitios de internet, a efectos de obtener automáticamente información acerca de la conducta de los Usuarios cuando navegan por dichos sitios de internet. Un archivo cookie generalmente contendrá el nombre del dominio desde donde la cookie ha sido transferida, la fecha de creación, y un código de identificación. La única información personal que un cookie puede contener es información que el Usuario mismo suministra con su navegación por internet, tales como la dirección de IP, las páginas visitadas y en qué orden, el tiempo de permanencia en cada página, la fecha y la hora, etc. (la “Información de Actividad”). Un cookie no puede leer datos del disco duro del Usuario ni leer los archivos cookie creados por otros sitios de internet. La mayoría de los navegadores están configurados para aceptar cookies, pero los Usuarios podrán reconfigurar su navegador de internet para rechazar todas las cookies o para que el sistema le indique en qué momento se envía una. Sin embargo, si las cookies están inhabilitadas, es posible que algunas características y servicios de los sitios de internet no funcionen de manera adecuada.
        </p>
      </div>

      {/* Sección Derecho al Acceso, Cancelación y Rectificación de los Datos */}
      <div className="section">
        <h2 className="section-title">Derecho al Acceso, Cancelación y Rectificación de los Datos</h2>
        <p className="normal-text">
          De acuerdo a lo prescripto por la Ley nº 25.326, los usuarios tendrán derecho a hacer uso responsable de su cuenta en el Sitio. En cualquier momento, el Usuario podrá solicitar la baja como Usuario y la eliminación de su información de la base de datos de Electrosafe, como así también acceder y actualizar sus datos personales. El titular de los datos personales tiene la facultad de ejercer sus derechos de acceso, actualización, rectificación y/o supresión de la información a través de un correo electrónico enviado a <a href="mailto: electrosafeservice@gmail.com"> electrosafeservice@gmail.com</a>. El Usuario deberá proporcionar datos precisos y completos cuando se comunique con Electrosafe para ejercer estos derechos. Electrosafe realizará sus mejores esfuerzos para satisfacer las solicitudes en el plazo más breve posible. En cualquier caso, se le informará al Usuario acerca del resultado de la solicitud.
        </p>
      </div>

      {/* Sección Menores de Edad */}
      <div className="section">
        <h2 className="section-title">Menores de Edad</h2>
        <p className="normal-text">
          El Sitio y/o los Servicios están permitidos solo a quienes tengan edad legal para contratar y no se encuentren inhibidos legalmente o de algún modo vedados de ejercer actos jurídicos, derechos y/u obligaciones. Habida cuenta de ello, los menores de 18 años no tienen permitido el ingreso al Sitio y/o los Servicios ni el suministro de ningún dato personal u otro tipo de información.
        </p>
      </div>

      {/* Sección Contacto */}
      <div className="section">
        <h2 className="section-title">Contacto</h2>
        <p className="normal-text">
          En caso de que el Usuario tenga alguna duda acerca de la Política de Privacidad, o sobre la aplicación de la misma, deberá ponerse en contacto con Electrosafe en cualquier momento, vía correo electrónico a <a href="mailto:electrosafeservice@gmail.com">electrosafeservice@gmail.com</a>.
        </p>
        <p className="normal-text">
          Se fija como domicilio de Electrosafe República de Cuba 769, CP: 1882, Ezpeleta, Buenos Aires, Argentina.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
