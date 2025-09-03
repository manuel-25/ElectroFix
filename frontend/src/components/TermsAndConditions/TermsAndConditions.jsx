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
          <a href="https://electrosafeweb.com">https://electrosafeweb.com</a> (en adelante, el “Sitio” o la “Plataforma”). El presente documento establece los términos y condiciones que regulan el acceso y uso del Sitio. El uso del Sitio implica el conocimiento y aceptación de estos Términos. Si el Usuario no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar la Plataforma o sus servicios asociados.
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

      {/* Sección de Responsabilidad del Prestador */}
      <div className="section">
        <h2 className="section-title">Responsabilidad del Prestador</h2>
        <p className="normal-text">
          Electrosafe realiza servicios de diagnóstico y reparación de equipos electrónicos en su taller propio o mediante técnicos autorizados. Las reparaciones se efectúan según los términos y condiciones aceptados por el Usuario al momento de contratar el servicio.
        </p>
        <p className="normal-text">
          Electrosafe garantiza exclusivamente los trabajos realizados sobre los componentes intervenidos, conforme a la garantía comercial informada. No se responsabiliza por fallas nuevas, defectos no informados inicialmente, ni por daños derivados de uso indebido, negligencia, intervención ajena o eventos externos (como líquidos, golpes, sobrecargas eléctricas, etc.).
        </p>
        <p className="normal-text">
          La responsabilidad de Electrosafe se limita al costo del servicio efectivamente prestado. No se responderá por pérdidas de datos, accesorios, gastos derivados, lucro cesante, ni otros daños indirectos, salvo en caso de dolo o negligencia grave comprobada.
        </p>
        <p className="small-text">
          Se recomienda al Usuario respaldar su información antes de entregar cualquier dispositivo, ya que el proceso de diagnóstico o reparación puede requerir el formateo o modificación del sistema.
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

      <div className="section">
        <h2 className="section-title">Condiciones Generales del Servicio Técnico</h2>
        <p className="normal-text">
          Al recibir el ticket, el cliente acepta los siguientes términos específicos del servicio técnico:
        </p>
        <ul className="small-text">
        <li>
          Pasados 7 días, se aplicará un cargo diario de 3%, hasta un máximo del valor estimado del equipo como nuevo.
        </li>
        <li>
          El monto acumulado en concepto de estadía podrá igualar, pero no exceder, el valor estimado del equipo al momento del ingreso. Superado el plazo de 30 días corridos sin retiro del equipo, y previa notificación, Electrosafe podrá disponer del mismo para su reciclaje o reutilización sin derecho a reclamo alguno por parte del Usuario.
        </li>
        <li>
          Transcurridos 30 días corridos sin que el equipo haya sido retirado, y previa notificación fehaciente, Electrosafe podrá disponer del equipo conforme lo considere adecuado, incluyendo su reciclaje, donación, venta o desguace, a fin de compensar los costos de almacenamiento, gestión y posibles daños derivados del abandono.
        </li>
        <li>
          Costo por revisión y diagnóstico en caso de no aceptar el presupuesto: entre $5.000 y $25.000, según el tipo, complejidad y valor estimado del equipo. El importe será informado previamente y deberá abonarse al momento del retiro, independientemente de que se acepte o no la reparación.
        </li>
        <li>
          El presupuesto debe ser confirmado o rechazado antes de retirar el equipo. El equipo podrá permanecer desarmado hasta recibir respuesta.
        </li>
        <li>
          No se entregan equipos desarmados ni sin cierre del servicio.
        </li>
        <li>
          Tiempo estimado de envío del presupuesto: entre 5 y 7 días hábiles, sujeto a la complejidad y disponibilidad de repuestos.
        </li>
        <li>
          Garantía comercial: 30 días corridos sobre la reparación efectuada (mano de obra y/o repuestos), sin perjuicio de la garantía legal prevista por la Ley 24.240.
        </li>
        <li>
          Cualquier falla detectada adicional será informada y presupuestada por separado.
        </li>
        </ul>
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

      <div className="section">
        <h2 className="section-title">Responsabilidad por Plagas o Fauna</h2>
        <p className="normal-text">
          Electrosafe no se hace responsable por daños, contaminación cruzada o riesgos derivados de la presencia de fauna o plagas (ej. cucarachas, roedores, insectos) dentro de los equipos electrónicos ingresados al servicio técnico. El usuario declara y acepta que el equipo entregado se encuentra en condiciones higiénicas adecuadas y libres de infestaciones.
        </p>
        <p className="small-text">
          En caso de detectar presencia de fauna, el equipo podrá ser rechazado o sometido a procedimientos de aislamiento/desinfección con costos adicionales. Electrosafe podrá suspender el diagnóstico hasta que se garantice la integridad sanitaria del entorno de trabajo.
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
      {/* SECCIÓN MEJORADA: Garantía */}
      <div className="section">
        <h2 className="section-title">Garantía</h2>
        <p className="normal-text">
          Todos los servicios realizados a través de Electrosafe cuentan con una garantía comercial de <strong>30 días corridos</strong> sobre la reparación efectuada.
        </p>
        <p className="normal-text">
          Esta garantía aplica tanto a trabajos contratados desde la Plataforma como por canales oficiales (WhatsApp, correo o de forma presencial) e incluye la mano de obra y los repuestos utilizados, salvo que se indique otra cosa en el presupuesto aprobado.
        </p>
        <p className="small-text">
          Esta garantía es adicional a los derechos establecidos por la <strong>Ley 24.240 de Defensa del Consumidor</strong>. Aplica exclusivamente sobre la misma falla reparada y no cubre nuevos problemas, fallas distintas, ni daños derivados de usos inadecuados.
        </p>
        <ul className="small-text">
          <li>Incluye revisión y diagnóstico gratuito si la falla reparada reaparece.</li>
          <li>La garantía será inválida si la falla se debe a negligencia, mal uso, intervención ajena o causas externas.</li>
          <li>Si no se detecta la misma falla o esta no está cubierta, se podrán aplicar cargos por revisión o traslado.</li>
          <li>El proveedor podrá optar entre reparar nuevamente o devolver el importe abonado por la intervención específica, según corresponda.</li>
          <li>La garantía se aplicará en las mismas condiciones, modalidad y lugar del servicio original contratado.</li>
          <li>No se cubrirán gastos adicionales no vinculados al problema original (envíos, traslados, pérdidas de datos, etc.).</li>
        </ul>

        <h3 className="small-text">¿Qué no está cubierto por esta garantía?</h3>
        <ul className="small-text">
          <li>Fallas nuevas no relacionadas con el servicio previamente realizado.</li>
          <li>Reemplazo de piezas faltantes, limpieza o mantenimiento preventivo.</li>
          <li>Servicios posteriores a accidentes, líquidos, golpes, roedores u otros daños externos.</li>
          <li>Modificaciones no autorizadas o intervenciones de terceros.</li>
          <li>Componentes con desgaste natural (baterías, cartuchos, etc.).</li>
          <li>Alteraciones por sobrecarga eléctrica o problemas del entorno.</li>
          <li>Equipos con fajas, precintos o etiquetas manipuladas o removidas.</li>
          <li>Daños estéticos o cosméticos que no afecten la funcionalidad del equipo.</li>
          <li>Problemas en pantallas con hasta cinco (5) píxeles muertos o defectuosos.</li>
        </ul>

        <h3 className="small-text">Protección de Datos del Usuario</h3>
        <p className="small-text">
          Se recomienda realizar una copia de seguridad antes de entregar cualquier equipo. Electrosafe no será responsable por pérdida de información, configuraciones, contraseñas o archivos que se vean afectados durante el proceso de revisión, reparación o prueba del equipo.
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
          Electrosafe podrá actualizar estos Términos y Condiciones en cualquier momento. Las versiones actualizadas estarán disponibles en la Plataforma y serán aplicables a partir de su publicación. Se recomienda al Usuario revisar periódicamente esta sección para estar informado sobre posibles cambios.
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
          Cualquier controversia derivada de la interpretación o cumplimiento de estos Términos será sometida a los tribunales competentes del domicilio del Usuario o, a elección del Usuario, a los del domicilio de Electrosafe, conforme lo establece la legislación de defensa del consumidor vigente.
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
          El Usuario acepta indemnizar y mantener indemne a Electrosafe en caso de reclamaciones de terceros derivadas de información falsa o uso indebido realizado por el propio Usuario, sin que esto implique renuncia a los derechos mínimos que le corresponden por ley.
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
          El acceso y uso del Sitio se realiza bajo exclusiva responsabilidad del Usuario. Electrosafe adopta medidas técnicas razonables para garantizar el correcto funcionamiento de la Plataforma, sin garantizar que el servicio sea ininterrumpido o libre de errores.
        </p>
        <p className="normal-text">
          Electrosafe no será responsable por interrupciones temporales, errores de sistema, virus o cualquier daño derivado del uso del Sitio, siempre que estos no sean consecuencia directa de negligencia grave o dolo de su parte.
        </p>
        <p className="normal-text">
          Esta limitación no afecta los derechos legales irrenunciables del Usuario como consumidor, conforme la Ley 24.240.
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

      <div className="section">
        <h2 className="section-title">Responsabilidad y Carga de Prueba</h2>
        <p className="normal-text">
          En caso de reclamos vinculados a fallas, daños o defectos, el Usuario deberá aportar pruebas suficientes que acrediten su existencia y su relación directa con la intervención realizada por Electrosafe. La simple manifestación del Usuario no será considerada prueba suficiente.
        </p>
        <p className="small-text">
          Electrosafe se reserva el derecho de realizar un nuevo diagnóstico para verificar la naturaleza del reclamo. En caso de discrepancia, prevalecerá el informe técnico emitido por Electrosafe, salvo que el Usuario acredite técnicamente lo contrario mediante peritaje independiente.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Aceptación Expresa del Usuario</h2>
        <p className="normal-text">
          El uso del Sitio, el envío de solicitudes por WhatsApp o correo electrónico, y la firma del ticket al ingreso del equipo implican la aceptación plena de estos Términos y Condiciones. Electrosafe podrá exigir dicha aceptación como requisito previo para brindar el servicio.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
