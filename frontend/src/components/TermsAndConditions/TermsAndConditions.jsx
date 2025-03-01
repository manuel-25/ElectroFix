import React from 'react';
import './TermsAndConditions.css'; // Archivo CSS para estilos específicos

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      {/* Sección de Términos y Condiciones de Uso */}
      <div className="section">
        <h1 className="main-title">Términos y Condiciones de Uso</h1>
        <p className="small-text">
          El presente documento establece, de manera obligatoria y vinculante, los términos y condiciones que regulan el acceso y uso del sitio web{' '}
          <a href="https://electrosafeweb.com">https://electrosafeweb.com</a> (en adelante, el “Sitio” o la “Plataforma”). Todo usuario que acceda o utilice este Sitio debe aceptar íntegramente estas condiciones; en caso contrario, se le prohíbe su utilización.
        </p>
      </div>

      {/* Sección de Operador del Sitio */}
      <div className="section">
        <h2 className="section-title">Operador del Sitio</h2>
        <p className="normal-text">
          El Sitio es operado por NAPOLEONE LUCAS EZEQUIEL (CUIT: 20-38930937-1), con domicilio en República de Cuba 769, CP: 1882, Ezpeleta, Buenos Aires, Argentina (en adelante, “Electrosafe”).
        </p>
      </div>

      {/* Sección ¿Qué es Electrosafe? */}
      <div className="section">
        <h2 className="section-title">¿Qué es Electrosafe?</h2>
        <p className="small-text">
          Electrosafe es una plataforma tecnológica que facilita la obtención de cotizaciones y la intermediación en la contratación de servicios de reparación de equipos electrónicos. Nuestro sistema permite acceder a presupuestos preliminares y personalizados, sin limitar ni condicionar la variedad de servicios que puedan ofrecer los proveedores especializados, actuando exclusivamente como intermediario.
        </p>
      </div>

      {/* Sección de Exención de Responsabilidad */}
      <div className="section">
        <h2 className="section-title">Exención de Responsabilidad</h2>
        <p className="normal-text">
          El Usuario reconoce y acepta que Electrosafe no presta, de forma directa, servicios de reparación ni ejecuta trabajos técnicos sobre equipos electrónicos. Los servicios contratados se realizan a través de terceros independientes, sobre cuya idoneidad, operatividad y conducta Electrosafe carece de control y, por tanto, no asume responsabilidad alguna.
        </p>
        <p className="normal-text">
          Al utilizar el Sitio y/o cualquiera de los servicios, el Usuario se obliga a cumplir y respetar el presente Acuerdo, que constituye un contrato legalmente vinculante, debiendo asimismo revisar la Política de Privacidad disponible en el Sitio. En caso de no estar conforme, el Usuario deberá abstenerse de utilizar la Plataforma.
        </p>
        <p className="normal-text">
          En consecuencia, la Plataforma se destina única y exclusivamente a funcionar como una herramienta tecnológica para la difusión y facilitación de información referencial sobre presupuestos – ya sean estandarizados o personalizados – para la contratación de servicios de reparación de dispositivos tecnológicos.
        </p>
        <p className="normal-text">
          Electrosafe no forma parte de ningún contrato celebrado entre el Usuario y el proveedor de servicios, quedando su intervención limitada a la función de intermediación sin asumir responsabilidad por la ejecución o resultados de los servicios contratados.
        </p>
      </div>

      {/* Sección Servicio de Reparación */}
      <div className="section">
        <h2 className="section-title">Servicio de Reparación</h2>
        <p className="normal-text">
          A través de la Plataforma, Electrosafe facilita el contacto entre Usuarios y técnicos especializados para la reparación de equipos electrónicos. Los servicios ofrecidos comprenden la revisión técnica, diagnóstico y reparación de dispositivos, sin que ello implique una limitación al alcance o naturaleza de los mismos.
        </p>
        <p className="small-text">
          Los presupuestos proporcionados son de carácter referencial; el costo definitivo se establecerá tras la inspección técnica realizada por el especialista designado.
        </p>
      </div>

      {/* Sección Cotizaciones y Condiciones de Pago */}
      <div className="section">
        <h2 className="section-title">Cotizaciones y Condiciones de Pago</h2>
        <p className="normal-text">
          Las cotizaciones emitidas mediante la Plataforma son aproximadas y referenciales, sin constituir oferta definitiva. El presupuesto final se fijará tras la evaluación presencial del equipo por parte de un técnico especializado.
        </p>
        <p className="small-text">
          En caso de aceptación del presupuesto definitivo, el costo del envío se integrará al monto total de la reparación. Si el Usuario decide no proceder, deberá asumir los gastos de envío o, en su defecto, abonar la revisión técnica.
        </p>
      </div>

      {/* Sección El Servicio */}
      <div className="section">
        <h2 className="section-title">El Servicio</h2>
        <p className="normal-text">
          Mediante el Sitio, el Usuario puede solicitar servicios de reparación, proporcionando la información necesaria sobre su equipo para recibir opciones adaptadas a sus requerimientos. La variedad de modalidades – reparación en sitio, envío por correo, servicio remoto, entre otros – se ofrece sin limitar futuras ampliaciones o ajustes en la prestación del servicio.
        </p>
      </div>

      {/* Sección Responsabilidades del Usuario */}
      <div className="section">
        <h2 className="section-title">Responsabilidades del Usuario</h2>
        <p className="normal-text">
          Corresponde al Usuario proporcionar información veraz y completa acerca del equipo a reparar, manteniendo actualizados sus datos de contacto para garantizar una comunicación eficaz con Electrosafe y los proveedores de servicios.
        </p>
        <p className="small-text">
          El Usuario es responsable de realizar copias de seguridad de la información contenida en sus dispositivos antes de su entrega para reparación, asumiendo los riesgos inherentes a la pérdida o alteración de datos.
        </p>
      </div>

      {/* Sección Responsabilidades de Electrosafe */}
      <div className="section">
        <h2 className="section-title">Responsabilidades de Electrosafe</h2>
        <p className="small-text">
          Electrosafe actúa exclusivamente como facilitador e intermediario en la contratación de servicios de reparación. No garantiza ni se hace responsable de la calidad, ejecución o resultados de los servicios prestados por terceros.
        </p>
        <p className="small-text">
          Asimismo, Electrosafe no garantiza la disponibilidad ininterrumpida de la Plataforma, reservándose el derecho de realizar mantenimientos o actualizaciones que sean necesarios para su óptimo funcionamiento.
        </p>
      </div>

      {/* Sección Usuarios-Capacidad */}
      <div className="section">
        <h2 className="section-title">Usuarios-Capacidad</h2>
        <p className="normal-text">
          Los Servicios ofrecidos a través de la Plataforma están destinados a personas físicas o jurídicas con plena capacidad legal para contratar. No podrán utilizar dichos servicios menores de edad o aquellos usuarios que hayan sido suspendidos. Al contratar los servicios de Electrosafe, el Usuario declara y garantiza:
        </p>
        <ul className="normal-text">
          <li>
            i) Ser mayor de 18 años y contar con la capacidad jurídica para obligarse contractualmente; o
          </li>
          <li>
            ii) Representar a una persona jurídica y contar con la autorización suficiente para contratar en su nombre.
          </li>
        </ul>
        <p className="normal-text">
          Se considerará “Usuario” a toda persona física o jurídica que contrate alguno de los servicios ofrecidos a través del Sitio.
        </p>
      </div>

      {/* Sección Garantía */}
      <div className="section">
        <h2 className="section-title">Garantía</h2>
        <p className="normal-text">
          Todos los servicios contratados a través de la Plataforma y abonados mediante los medios de pago indicados por Electrosafe contarán con una garantía de 30 días, contados a partir de la fecha en que se realice la reparación, salvo que se especifique lo contrario en el presupuesto.
        </p>
        <p className="small-text">
          La garantía, otorgada por el proveedor de servicios, se limita a la revisión y diagnóstico gratuitos sobre la falla reparada, y se aplicará únicamente a la misma falla, siempre que no se derive de mal uso, negligencia u otros factores no imputables al proveedor.
        </p>
        <p className="small-text">
          En ningún caso la garantía ofrecida por Electrosafe extenderá responsabilidades o obligaciones en perjuicio del acuerdo celebrado directamente entre el Usuario y el proveedor de servicios.
        </p>
        <p className="small-text">
          La garantía se regirá por las siguientes condiciones:
        </p>
        <ul className="small-text">
          <li>
            Revisión y diagnóstico gratuito del equipo sobre la falla reparada.
          </li>
          <li>
            En caso de recurrencia de la misma falla – y siempre que no sea consecuencia de un uso indebido u otra causa excluida – el proveedor, a exclusivo criterio de Electrosafe, optará por la reparación o la devolución del importe abonado.
          </li>
          <li>
            Si la falla no se corrobora o no se encuentra amparada, los costos de transporte o cualquier otro gasto asociado serán asumidos por el Usuario.
          </li>
          <li>
            La garantía se aplicará bajo las mismas condiciones y modalidad del servicio original contratado.
          </li>
          <li>
            El recurso único del Usuario será la reparación o la devolución del importe, quedando expresamente excluida cualquier otra responsabilidad de Electrosafe, sus afiliadas o proveedores, incluso por daños indirectos o consecuenciales.
          </li>
        </ul>
        <h3 className="small-text">¿Qué no está cubierto por esta garantía?</h3>
        <ul className="small-text">
          <li>
            Reemplazo de piezas faltantes o mantenimiento preventivo.
          </li>
          <li>
            Servicios derivados de accidentes, mal uso, negligencia, instalación o mantenimiento inadecuado.
          </li>
          <li>
            Instalación, remoción o modificación de accesorios o periféricos no incluidos en el servicio técnico.
          </li>
          <li>
            Reemplazo o ajustes de software ajenos a la reparación ejecutada.
          </li>
          <li>
            Reparación o sustitución de componentes estéticos o de desgaste natural.
          </li>
          <li>
            Servicios por fallas ocasionadas por causas externas (fuego, hurto, fuerza mayor, alteraciones, etc.).
          </li>
          <li>
            Daños derivados de alteraciones en la alimentación eléctrica, impactos, rayos u otros accidentes no contratados a través de la Plataforma.
          </li>
          <li>
            Servicios sobre equipos cuya etiqueta o faja de garantía haya sido modificada o retirada.
          </li>
          <li>
            Daños ocasionados por el uso del equipo fuera de los parámetros establecidos en el Manual o Guía del Usuario.
          </li>
          <li>
            Modificaciones realizadas al equipo posterior a la reparación.
          </li>
          <li>
            Daños en pantallas con hasta cinco (5) píxeles defectuosos.
          </li>
          <li>
            Reemplazo de partes sujetas a desgaste normal (por ejemplo, cartuchos de impresión, baterías).
          </li>
        </ul>
        <h3 className="small-text">Protección de Datos Almacenados</h3>
        <p className="small-text">
          Se recomienda encarecidamente al Usuario realizar copias de seguridad de toda la información almacenada en su dispositivo antes de enviarlo a reparación. Electrosafe no será responsable por la pérdida, alteración o imposibilidad de recuperación de datos que se produzcan durante el proceso de reparación o en el período de garantía.
        </p>
      </div>

      {/* Sección Proceso de Pago */}
      <div className="section">
        <h2 className="section-title">Proceso de Pago</h2>
        <p className="normal-text">
          El Usuario podrá abonar el servicio en una o varias de las siguientes instancias:
        </p>
        <p className="small-text">
          <strong>Al contratar el servicio:</strong> Dependiendo de las características del equipo, la falla declarada y la modalidad del servicio, el Sitio podrá ofrecer la opción de pago anticipado.
        </p>
        <p className="small-text">
          <strong>Al aceptar el presupuesto:</strong> Si no es posible indicar un precio de forma anticipada, el Usuario recibirá un presupuesto definitivo que incluirá un botón para el pago en línea.
        </p>
        <p className="small-text">
          <strong>Al retirar el equipo:</strong> En caso de optar por un servicio en un centro especializado, el pago se realizará al momento de la entrega del dispositivo.
        </p>
        <p className="small-text">
          Todos los pagos se gestionan a través de la integración con MERCADOPAGO, sin que Electrosafe realice cobros directos o indirectos.
        </p>
        <p className="small-text">
          La factura correspondiente será emitida por el proveedor de servicios, pudiendo ser enviada directamente al Usuario o a través de Electrosafe.
        </p>
      </div>

      {/* Sección Precios */}
      <div className="section">
        <h2 className="section-title">Precios</h2>
        <p className="normal-text">
          Los precios indicados en el Sitio se expresan en pesos argentinos e incluyen IVA, salvo que se especifique lo contrario.
        </p>
        <p className="small-text">
          Los valores publicados son informativos y únicamente tendrán validez aquellos expresados en el presupuesto definitivo o en el pago online a través de la Plataforma.
        </p>
        <p className="small-text">
          En caso de error tecnológico o ingreso incorrecto de datos (marca, modelo o falla), lo que ocasione una tarifa desproporcionada, Electrosafe se reserva el derecho de cancelar la contratación, reintegrando al Usuario los montos abonados, a su exclusivo criterio.
        </p>
        <p className="small-text">
          Electrosafe se reserva la facultad de modificar los precios y condiciones sin previo aviso, así como ofrecer precios diferentes en otros canales de venta.
        </p>
      </div>

      {/* Sección Modificación de los Términos y Condiciones */}
      <div className="section">
        <h2 className="section-title">Modificación de los Términos y Condiciones</h2>
        <p className="normal-text">
          Electrosafe podrá actualizar el presente Acuerdo en cualquier momento, publicando la versión actualizada en la Plataforma sin previo aviso. El uso continuado del Sitio implicará la aceptación de dichos cambios. En caso de disconformidad, el Usuario deberá cesar en el uso de la Plataforma.
        </p>
        <p className="small-text">
          Asimismo, el Usuario podrá ejercer el derecho previsto en el art. 6 de la Ley 25.326, solicitando la cancelación de sus datos de registro, de acuerdo con el procedimiento indicado al escribir a <a href="mailto:electrosafeservice@gmail.com">electrosafeservice@gmail.com</a>.
        </p>
      </div>

      {/* Sección Propiedad Intelectual, Marcas y Enlaces */}
      <div className="section">
        <h2 className="section-title">Propiedad Intelectual, Marcas y Enlaces</h2>
        <p className="normal-text">
          El Usuario reconoce que la Plataforma, así como sus bases de datos, redes y archivos, son propiedad exclusiva de Electrosafe y están protegidos por las leyes de propiedad intelectual, marcas, patentes, modelos y diseños industriales. Queda estrictamente prohibida la reproducción total o parcial sin autorización expresa y por escrito de Electrosafe.
        </p>
        <p className="small-text">
          La presencia de enlaces a terceros en la Plataforma no implica relación, respaldo o responsabilidad sobre sus contenidos, productos o servicios.
        </p>
      </div>

      {/* Sección Ley Aplicable y Jurisdicción */}
      <div className="section">
        <h2 className="section-title">Ley Aplicable y Jurisdicción</h2>
        <p className="normal-text">
          El presente Acuerdo se regirá e interpretará conforme a las leyes de la República Argentina.
        </p>
        <p className="small-text">
          Cualquier controversia que surja en relación con estos términos será sometida a la jurisdicción de los tribunales ordinarios competentes de la Ciudad de Buenos Aires.
        </p>
      </div>

      {/* Sección Definición de Servicios */}
      <div className="section">
        <h2 className="section-title">Definición de Servicios</h2>
        <p className="normal-text">
          Los servicios ofrecidos por Electrosafe comprenden la intermediación en la contratación de servicios de reparación y mantenimiento de equipos electrónicos, sin excluir la posibilidad de ampliar o modificar el alcance de dichos servicios en el futuro.
        </p>
      </div>

      {/* Sección Indemnización */}
      <div className="section">
        <h2 className="section-title">Indemnización</h2>
        <p className="normal-text">
          El Usuario se compromete a mantener indemne a Electrosafe, sus filiales, controladoras y/o subsidiarias, así como a sus directivos, administradores, representantes y empleados, frente a cualquier reclamo, demanda o acción legal de terceros derivada del uso del Sitio, el incumplimiento del presente Acuerdo o la violación de cualquier derecho de terceros, incluyendo los honorarios razonables de abogados.
        </p>
      </div>

      {/* Sección Datos Personales */}
      <div className="section">
        <h2 className="section-title">Datos Personales</h2>
        <p className="normal-text">
          En consonancia con nuestra <a href="/privacidad" className="link">Política de Privacidad</a>, Electrosafe se compromete a mantener la confidencialidad de los Datos Personales suministrados por los Usuarios, salvo en los casos permitidos por la Ley de Protección de Datos Personales.
        </p>
        <p className="small-text">
          Dichos datos serán tratados y almacenados en la base de datos de la cual Electrosafe es titular y responsable, con fines de brindar un servicio óptimo y para realizar acciones de marketing directo, salvo que el Usuario exprese lo contrario, conforme a lo establecido en la Ley N° 25.326.
        </p>
        <p className="small-text">
          Para ejercer sus derechos de acceso, rectificación o supresión, el Usuario deberá comunicarse a través de <a href="mailto:contacto@electrosafeservice@gmail.com" className="contact-link">electrosafeservice@gmail.com</a>.
        </p>
        <p className="small-text">
          Electrosafe ha implementado las medidas técnicas y organizativas legalmente requeridas para proteger los Datos Personales contra pérdida, mal uso, alteración o acceso no autorizado.
        </p>
      </div>

      {/* Sección Limitación de Responsabilidad */}
      <div className="section">
        <h2 className="section-title">Limitación de Responsabilidad</h2>
        <p className="normal-text">
          El Usuario acepta que el uso del Sitio y la contratación de servicios se realiza bajo su exclusivo riesgo. Electrosafe no garantiza el acceso ininterrumpido, preciso o libre de errores a la Plataforma, ni se hace responsable de fallas, interrupciones o caídas en el servicio.
        </p>
        <p className="normal-text">
          Electrosafe utilizará medidas de seguridad (como encriptación SSL) para proteger la información, pero no asume responsabilidad por daños directos, indirectos, incidentales o consecuentes derivados del acceso o uso del Sitio, incluyendo aquellos ocasionados por virus, malware u otras vulnerabilidades inherentes a la red.
        </p>
        <p className="normal-text">
          De igual modo, Electrosafe no se responsabiliza por el uso no autorizado de sus servidores o por cualquier daño que pudiera sufrir el Usuario como consecuencia de actos u omisiones de terceros.
        </p>
      </div>

      {/* Sección Domicilio y Contacto */}
      <div className="section">
        <h2 className="section-title">Domicilio y Contacto</h2>
        <p className="normal-text">
          Para todos los efectos legales, se fija como domicilio de Electrosafe: República de Cuba 769, CP: 1882, Ezpeleta, Buenos Aires, Argentina.
        </p>
        <p className="normal-text">
          Para consultas o aclaraciones sobre estos Términos y Condiciones, comuníquese a <a href="mailto:electrosafeservice@gmail.com">electrosafeservice@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
