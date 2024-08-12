import React from 'react';
import './TermsAndConditions.css'; // Archivo CSS para estilos específicos

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      {/* Sección de Términos y Condiciones de Uso */}
      <div className="section">
        <h1 className="main-title">Términos y Condiciones de Uso</h1>
        <p className="small-text">
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
          Este sitio web <a href="https://electrosafeweb.com">https://electrosafeweb.com</a> es operado por NAPOLEONE LUCAS EZEQUIEL (CUIT: 20-38930937-1), con domicilio en República de Cuba 769, CP: 1882, Ezpeleta, Buenos Aires, Argentina (en adelante “Electrosafe”).
        </p>
      </div>

      {/* Sección ¿Qué es Electrosafe? */}
      <div className="section">
        <h2 className="section-title">¿Qué es Electrosafe?</h2>
        <p className="small-text">
          Electrosafe es un servicio tecnológico dedicado a la reparación de equipos electrónicos, proporcionando soluciones rápidas y efectivas para dispositivos como celulares, tablets, computadoras, entre otros. A través de nuestra plataforma, ofrecemos acceso a una variedad de servicios de reparación realizados por proveedores especializados, garantizando un proceso de contratación sencillo y seguro.
        </p>
      </div>

      {/* Sección de Exención de Responsabilidad */}
      <div className="section">
        <h2 className="section-title">Exención de Responsabilidad</h2>
        <p className="normal-text">
          Usted entiende y reconoce que Electrosafe, por sí mismo, no presta servicios de reparación de equipos de tecnología, como celulares, computadoras, impresoras, consolas de video juego y otros. Los servicios son prestados por terceros especialistas que no están empleados por Electrosafe.
        </p>
        <p className="normal-text">
          Al visitar el Sitio y utilizar el Servicio, usted acepta cumplir los términos y condiciones de este Acuerdo y acepta estar legalmente vinculado a ellos, sea o no un usuario registrado en la base de datos de Electrosafe. Este Acuerdo rige el acceso y uso de la Plataforma y constituye un contrato vinculante entre usted y Electrosafe. Lea también con detenimiento nuestra Política de privacidad, disponible en privacidad. Si usted no está conforme con este Acuerdo, no debe utilizar la Plataforma, ya que los presentes términos y condiciones tienen carácter obligatorio y vinculante.
        </p>
        <p className="normal-text">
          En consecuencia, LA PLATAFORMA CONSTITUYE UNA HERRAMIENTA TECNOLÓGICA DE SERVICIOS DE DIFUSIÓN E INTERMEDIACIÓN DE CONTRATACIÓN DE SERVICIOS A TRAVÉS DE LA CUAL USTED PUEDE OBTENER INFORMACIÓN SOBRE PRESUPUESTOS CON PRECIO ESTANDARIZADO O PRESUPUESTOS PERSONALIZADOS PARA LA CONTRATACIÓN DE SERVICIOS DE REPARACIÓN DE DISPOSITIVOS TECNOLÓGICOS.
        </p>
        <p className="normal-text">
          Usted acepta y conviene que Electrosafe no es parte de ningún contrato firmado entre los proveedores de servicio y usted, ni tampoco es una empresa que provee los servicios que se publican en la plataforma. Electrosafe no tiene ningún control sobre la conducta ni la diligencia de los proveedores de servicio y usuarios y rechaza toda responsabilidad al respecto.
        </p>
        <p className="normal-text">
          Electrosafe se limita a poner a disposición una herramienta tecnológica de comunicación y promueve un entorno de contratación segura entre usuarios y empresas de servicio, brindando a ambos el servicio de intermediación de contratación de servicios.
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

      {/* Sección Cotizaciones y Condiciones de Pago */}
      <div className="section">
        <h2 className="section-title">Cotizaciones y Condiciones de Pago</h2>
        <p className="normal-text">
          Las cotizaciones proporcionadas a través de la plataforma de Electrosafe son referenciales y no representan el costo final del servicio.
          El presupuesto definitivo se establecerá una vez que el equipo haya sido inspeccionado por un técnico especializado.
        </p>
        <p className="small-text">
          Si el cliente acepta el presupuesto definitivo, el costo del envío se incluirá en el total de la reparación.
          Si el cliente decide no proceder con la reparación después de recibir el presupuesto definitivo, deberá abonar los costos de envío del equipo. En caso de no pagar el envío, el cliente deberá retirar el equipo personalmente.
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
        <p className="small-text">
          Electrosafe facilita la conexión entre usuarios y técnicos especializados, 
          pero no asume responsabilidad por la calidad final de los servicios prestados por los técnicos contratados a través de la plataforma.
        </p>
        <p className="small-text">
          Sin embargo, Electrosafe no asume responsabilidad por la calidad final de los servicios prestados
          por terceros, ni garantiza la disponibilidad ininterrumpida de la plataforma, reservándose el derecho
          de realizar mantenimientos o actualizaciones necesarias para su correcto funcionamiento.
        </p>
      </div>

      {/* Sección Usuarios-Capacidad */}
      <div className="section">
        <h2 className="section-title">Usuarios-Capacidad</h2>
        <p className="normal-text">
          Los Servicios de Electrosafe (según se definen más adelante) están dirigidos a personas físicas o jurídicas con capacidad legal para contratar. No podrán utilizar los Servicios las personas que no tengan esa capacidad, los menores de edad o los Usuarios que hayan sido suspendidos del Sitio. Al contratar los servicios de Electrosafe, usted declara bajo juramento que: 
        </p>
        <ul className="normal-text">
          <li>
            i) es una persona física mayor de 18 años de edad, con capacidad jurídica para contratar; o
          </li>
          <li>
            ii) es el representante de una persona jurídica y tiene poder suficiente para contratar en nombre de dicha persona jurídica.
          </li>
        </ul>
        <p className="normal-text">
          Se considerará Usuario a toda persona física o jurídica que contrate alguno de los servicios ofrecidos en el Sitio.
        </p>
      </div>

      {/* Sección Garantía */}
      <div className="section">
        <h2 className="section-title">Garantía</h2>
        <p className="normal-text">
          Todos los servicios contratados exclusivamente a través de la plataforma y abonados a través de los medios de pago informados por Electrosafe, contarán con una garantía de 90 días contados desde la fecha de la reparación realizada, salvo aclaración expresa por parte de Electrosafe en el presupuesto de reparación.
        </p>
        <p className="small-text">
          La garantía sobre los trabajos realizados es brindada por el proveedor de servicios, conforme a la normativa vigente. Usted contrata proveedores de servicio que no se encuentran sujetos a relación de dependencia o de cualquier otro tipo con Electrosafe. Usted consiente y expresa su conformidad con lo expuesto, entendiendo que cualquier reclamo vinculante de su relación con el Proveedor de servicios debe dirigirse al mismo, así como exigir la garantía que el proveedor de servicios presta por sus servicios.
        </p>
        <p className="small-text">
          Al tratarse de un contrato entre privados (Proveedor – Usuario), las relaciones de consumo se limitan al Usuario y el Proveedor, no pudiendo hacerse extensiva la misma a Electrosafe ni a ninguno de sus dependientes o sociedades vinculadas o controladas. Usted consiente lo expuesto y presta expresa conformidad con los términos y alcances de la garantía.
        </p>
        <p className="small-text">
          La garantía de 90 días ofrecida por Electrosafe implica un acto unilateral y no vinculante con las obligaciones emergentes del contrato principal celebrado entre el Usuario y el Proveedor. Usted presta expresa conformidad a lo expuesto y entiende que el Servicio de Garantía no vincula a Electrosafe bajo ningún supuesto con el eventual acuerdo que el Usuario celebre con el Proveedor de servicios.
        </p>
        <p className="small-text">
          La garantía que ofrece Electrosafe se limita exclusivamente a la reparación efectuada por el proveedor de servicios que haya sido debidamente contratada por el Usuario a través de la plataforma. La garantía de 90 días posteriores a la reparación de su equipo consta de:
        </p>
        <ul className="small-text">
          <li>
            La revisión y diagnóstico gratuito del equipo, exclusivamente sobre la falla relacionada directamente con la reparación efectuada y objeto de la garantía.
          </li>
          <li>
            En caso de que el equipo presente la misma falla que la reparada en la intervención original y que dicho desperfecto no se deba a mal uso o a cualquiera de los ítems detallados en este documento bajo el título de “¿Qué no está cubierto por esta Garantía?”, Electrosafe optará, a su exclusivo criterio, por la reparación del equipo o la devolución del dinero abonado por el Usuario en la intervención que origina la garantía.
          </li>
          <li>
            En caso de que el equipo no presente fallas o las mismas no estén amparadas por esta garantía, los costos de transporte, entrega o seguro incurridos para la revisión y devolución del equipo serán a exclusivo cargo del Usuario.
          </li>
          <li>
            La garantía se ofrece exclusivamente en los mismos términos de contratación del servicio original, respetando el tipo de servicio contratado originalmente por el Usuario.
          </li>
          <li>
            El único y exclusivo recurso del Usuario será su reparación o devolución del dinero de la reparación, a exclusivo criterio de Electrosafe. En ningún caso Electrosafe, sus afiliadas o proveedores serán responsables ante el Usuario ni ante terceros por daño alguno en exceso del precio de compra del Producto. Esta limitación corresponde a los daños de cualquier tipo, incluyendo (i) daños a registros, programas, datos o medios de almacenamiento extraíbles del Usuario o la pérdida de los mismos; o (ii) cualesquiera daños directos o indirectos, ganancias perdidas, ahorros perdidos u otros daños especiales, incidentales, ejemplares o punitivos, ya sea por incumplimiento de la Garantía, contractual, extracontractual o de otro tipo, ya sea que surjan de la utilización o incapacidad de utilización del Producto luego de la reparación.
          </li>
        </ul>
        <h3 className="small-text">¿Qué no está cubierto por esta garantía?</h3>
        <ul className="small-text">
          <li>
            El reemplazo de piezas faltantes o el mantenimiento preventivo.
          </li>
          <li>
            El servicio que se requiera debido a accidente, uso indebido, maltrato, negligencia, instalación inadecuada o mantenimiento incorrecto.
          </li>
          <li>
            La instalación, remoción o reconversión de accesorios, equipo periférico o sistemas de computación de los cuales el Producto formara parte.
          </li>
          <li>
            El reemplazo o los arreglos de software que sean ajenos a la reparación efectuada.
          </li>
          <li>
            La reparación o el reemplazo de cubiertas, plásticos o piezas cosméticas como molduras o acabados interiores o exteriores.
          </li>
          <li>
            El servicio que se requiera por fallas ocasionadas por cualquier causa externa, incluido fuego, hurto, fuerza mayor, alteración, problemas que surjan de software o hardware que no haya sido instalado por Electrosafe al momento de la reparación.
          </li>
          <li>
            El servicio que se requiera debido a fallas o alteraciones en la alimentación eléctrica, rayos, golpes o accidentes de cualquier naturaleza, o reparaciones realizadas que no hayan sido contratadas a través de la plataforma de Electrosafe.
          </li>
          <li>
            El servicio sobre un equipo cuya faja de garantía se haya dañado, alterado o retirado.
          </li>
          <li>
            El daño ocasionado por usar el equipo fuera de los parámetros de uso o almacenamiento establecidos en la Guía o el Manual del Usuario del Producto.
          </li>
          <li>
            Las modificaciones que se realicen al equipo luego de su reparación ni las fallas ocasionadas por tales modificaciones.
          </li>
          <li>
            Las pantallas que tengan hasta cinco (5) píxeles quemados o muertos.
          </li>
          <li>
            Se excluyen las partes o piezas que, bajo un uso normal, sufran desgaste y/o vida limitada menor que el plazo de cobertura de la presente garantía (Ej. cartuchos de impresión, baterías).
          </li>
        </ul>
        <h3 className="small-text">Protección de Datos Almacenados</h3>
        <p className="small-text">
          Electrosafe recomienda, como medida de precaución para protegerse contra posibles fallas, alteraciones o pérdida de datos, que el Usuario haga copias de respaldo regularmente de todos los datos importantes almacenados en el disco duro u otros dispositivos de almacenamiento del Producto, especialmente antes de ingresarlo a reparación. Si los datos del Usuario se alteran o se pierden debido a cualquier problema, falla o funcionamiento indebido de la unidad de almacenamiento, disco duro u otros dispositivos de almacenamiento durante su reparación o durante el período de garantía de la reparación y los datos no pudieran recuperarse, Electrosafe no será responsable por ningún daño o pérdida de datos ni por cualquier otro daño que surgiera de dicho hecho. Cuando copie o transfiera datos, asegúrese de confirmar que los datos se hayan copiado o transferido satisfactoriamente. Electrosafe rechaza toda responsabilidad que surja del copiado erróneo o de la transferencia incorrecta de los datos. Antes de devolver cualquier producto para servicio, asegúrese de respaldar sus datos y de retirar toda información confidencial, de su propiedad o personal. Electrosafe no se hace responsable por (i) daños a cualesquiera programas, datos o medios de almacenamiento extraíbles o pérdida de los mismos; (ii) la restauración o reinstalación de cualesquiera programas o datos que no sean el software instalado por Electrosafe en el momento de la reparación del equipo; ni (iii) la divulgación de tales datos.
        </p>
      </div>

      {/* Sección Proceso de Pago */}
      <div className="section">
        <h2 className="section-title">Proceso de Pago</h2>
        <p className="normal-text">
          Los Usuarios podrán abonar la reparación de su equipo en una o varias instancias de las detalladas a continuación:
        </p>
        <p className="small-text">
          <strong>Al momento de contratar el servicio:</strong> Dependiendo de las características del equipo, la falla y el tipo de servicio declarado por el usuario al momento de la carga de datos en la plataforma, el Sitio podrá ofrecer la posibilidad de pago anticipado de forma automática.
        </p>
        <p className="small-text">
          <strong>Al aceptar el presupuesto:</strong> En caso de que no haya sido posible indicar un precio de forma anticipada, el Usuario recibirá posteriormente al diagnóstico de su equipo un presupuesto por la reparación. Este presupuesto incluirá un botón de pago para que el Usuario pueda realizar el pago de forma online.
        </p>
        <p className="small-text">
          <strong>Al retirar el equipo:</strong> El Usuario podrá abonar la reparación de su equipo al momento de retirarlo, en caso de que haya optado por un servicio de reparación en un centro de servicios.
        </p>
        <p className="small-text">
          Todos los pagos realizados por el Usuario a través de la plataforma de Electrosafe y los pagos efectuados en los centros de reparación de los proveedores de servicio a través de tarjeta de crédito/débito procesados a través de Mercado Pago Point o código QR se realizan mediante una integración con el servicio de pagos de MERCADOPAGO.
        </p>
        <p className="small-text">
          Electrosafe no realiza cobros de forma directa ni indirecta. Las cuentas de MERCADOPAGO asociadas al cobro de las reparaciones corresponden a los diferentes proveedores de servicio y están asociadas a la plataforma de Electrosafe exclusivamente con la finalidad de facilitar el proceso de cobro a los Usuarios.
        </p>
        <p className="small-text">
          La factura por los servicios contratados por el Usuario será emitida exclusivamente por el proveedor de servicios correspondiente, pudiendo ser enviada al Usuario por Electrosafe o directamente por el proveedor de servicios.
        </p>
      </div>

      {/* Sección Precios */}
      <div className="section">
        <h2 className="section-title">Precios</h2>
        <p className="normal-text">
          Todos los precios informados en el Sitio se encuentran expresados en pesos argentinos e incluyen IVA, salvo que se indique expresamente lo contrario.
        </p>
        <p className="small-text">
          Los precios publicados en el sitio son a modo informativo y solo serán considerados válidos los valores que se indiquen en los presupuestos emitidos por Electrosafe o los expresados al momento del pago online a través de la plataforma.
        </p>
        <p className="small-text">
          En caso de errores tecnológicos o si el Usuario consigna incorrectamente la marca, modelo o falla, lo que resulta en precios erróneos para los servicios en la Plataforma, que evidentemente resultan desproporcionados comparados con el precio del servicio en el mercado, Electrosafe podrá cancelar la contratación realizada por el usuario a su libre discreción y con plena autonomía, reintegrando al usuario todos los montos que haya abonado, si corresponde.
        </p>
        <p className="small-text">
          Electrosafe se reserva el derecho de fijar precios diferentes a los ofrecidos en otros canales de venta, propios y/o de sus proveedores de servicio.
        </p>
        <p className="small-text">
          Electrosafe se reserva el derecho de actualizar, modificar y/o descontinuar los servicios exhibidos en la Plataforma, así como también modificar sus precios sin previo aviso.
        </p>
      </div>

      {/* Sección Modificación de los Términos y Condiciones */}
      <div className="section">
        <h2 className="section-title">Modificación de los Términos y Condiciones</h2>
        <p className="normal-text">
          Electrosafe podrá en cualquier momento actualizar el presente Acuerdo y publicará la nueva versión del mismo en la Plataforma, sin previo aviso. En caso de que usted no esté de acuerdo con la actualización de los términos y condiciones del Acuerdo, le solicitamos que no utilice más la Plataforma. Usted podrá ejercer el derecho del art. 6 de la Ley 25.326 inc. e) y solicitar a Electrosafe la cancelación de sus datos de registro como Usuario del Sitio. Para ello, consulte el procedimiento para solicitar la cancelación de sus datos escribiendo a <a href="mailto:soporte@electrosafe.com">soporte@electrosafe.com</a>.
        </p>
        <p className="small-text">
          El uso del sitio y/o sus servicios implica la aceptación de estos Términos y Condiciones.
        </p>
      </div>

      {/* Sección Propiedad Intelectual, Marcas y Enlaces */}
      <div className="section">
        <h2 className="section-title">Propiedad Intelectual, Marcas y Enlaces</h2>
        <p className="normal-text">
          Usted reconoce que la Plataforma de Electrosafe, así como las bases de datos, redes y archivos que le permiten acceder y usar el Sitio, son propiedad exclusiva de Electrosafe y están protegidas por las leyes y tratados internacionales de derecho de autor, marcas, patentes, modelos y diseños industriales. El uso indebido y la reproducción total o parcial de dichos contenidos, marcas y logotipos quedan prohibidos, salvo autorización expresa y por escrito de Electrosafe.
        </p>
        <p className="small-text">
          La Plataforma puede contener enlaces a otros sitios web, lo cual no indica que sean propiedad u operados por Electrosafe. Dado que Electrosafe no tiene control sobre tales sitios, NO será responsable por los contenidos, materiales, acciones y/o servicios prestados por los mismos, ni por daños o pérdidas ocasionadas por la utilización de estos, sean causadas directa o indirectamente. La presencia de enlaces a otros sitios web y/o la visualización de marcas y/o logotipos no implica una asociación, relación, aprobación o respaldo de Electrosafe hacia dichos sitios y sus contenidos, o viceversa.
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

      {/* Sección Definición de Servicios */}
      <div className="section">
        <h2 className="section-title">Definición de Servicios</h2>
        <p className="normal-text">
          Los servicios ofrecidos por Electrosafe incluyen reparación y mantenimiento de equipos electrónicos. Se excluyen de estos servicios aquellos que no sean relacionados con el funcionamiento técnico de los equipos, como la pérdida de datos o daños estéticos.
        </p>
      </div>

      {/* Sección Indemnización */}
      <div className="section">
        <h2 className="section-title">Indemnización</h2>
        <p className="normal-text">
          Usted se compromete a mantener indemne a Electrosafe, sus filiales, empresas controladas y/o controlantes, directivos, administradores, representantes y empleados, por cualquier reclamo o demanda de otros usuarios o terceros debido a sus actividades en el Sitio o por el incumplimiento de los Términos y Condiciones del presente Acuerdo y demás Políticas que se entienden incorporadas al presente, o por la violación de cualquier ley o derecho de terceros, incluyendo los honorarios de abogados en una cantidad razonable.
        </p>
      </div>

      {/* Sección Datos Personales */}
      <div className="section">
        <h2 className="section-title">Datos Personales</h2>
        <p className="normal-text">
          En el marco de nuestra <a href="/privacidad" className="link">Política de Privacidad</a>, Electrosafe se compromete a mantener la confidencialidad total de los Datos Personales proporcionados por los usuarios del Sitio, salvo en los casos permitidos por la Ley de Protección de Datos Personales.
        </p>
        <p className="small-text">
          Los Datos Personales suministrados por los usuarios serán procesados por Electrosafe e incorporados a nuestra base de datos automatizada, de la cual Electrosafe será titular y responsable (la "Base de Datos"). Al utilizar el Sitio, usted consiente el tratamiento de sus datos para proporcionar un mejor servicio y realizar acciones de marketing directo, a menos que solicite lo contrario, en cumplimiento de la Ley de Protección de Datos Personales N° 25.326.
        </p>
        <p className="small-text">
          Para ejercer sus derechos de acceso, rectificación y supresión de sus Datos Personales en la Base de Datos, por favor comuníquese con nosotros a través de <a href="mailto:contacto@electrosafeservice@gmail.com" className="contact-link">electrosafeservice@gmail.com</a>.
        </p>
        <p className="small-text">
          Electrosafe ha adoptado los niveles de seguridad de protección de los Datos Personales legalmente requeridos y ha implementado todas las medidas técnicas disponibles para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los Datos Personales.
        </p>
      </div>

      {/* Sección Limitación de Responsabilidad */}
      <div className="section">
        <h2 className="section-title">Limitación de Responsabilidad</h2>
        <p className="normal-text">
          Electrosafe no es responsable por el efectivo cumplimiento de las obligaciones asumidas por los Usuarios en el perfeccionamiento de la operación. Cada Usuario reconoce que al realizar operaciones con otros Usuarios lo hace bajo su propio riesgo.
        </p>
        <p className="normal-text">
          El Usuario comprende y acepta las características y los riesgos propios de la conexión y navegación por Internet. Por lo tanto, Electrosafe no será responsable por fallas, interrupciones y/o caídas de la red y/o de los servicios de conexión y/o transmisión de datos, y tampoco garantiza el acceso al Sitio, en forma ininterrumpida, precisa o sin errores (siempre que ello no se derive de causas que le resulten imputables) y, por lo tanto, Electrosafe no responderá por los daños que eventualmente el Usuario pueda llegar a sufrir por dichas circunstancias.
        </p>
        <p className="normal-text">
          Electrosafe usa antivirus y protección contra virus, bugs, troyanos, malware, spyware y otros riesgos en Internet (en adelante, los “Riesgos”). Sin embargo, ello no podría ser suficiente y no releva al Usuario de la responsabilidad de contar con sus propios métodos de protección para una navegación, acceso y uso seguro de sitios de Internet. Por lo tanto, Electrosafe no se responsabiliza por daños ocasionados por los Riesgos y/o todo otro daño derivado del acceso y/o uso del Sitio. Electrosafe tampoco asume responsabilidad alguna por el acceso o uso no autorizado de los servidores utilizados para el alojamiento del Sitio y/o los datos de los Usuarios por parte de terceros.
        </p>
        <p className="normal-text">
          Electrosafe ha adoptado los niveles de seguridad de protección de los Datos Personales legalmente requeridos, y ha instalado todos los medios y medidas técnicas a su alcance para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los Datos Personales.
        </p>
        <p className="normal-text">
          Electrosafe utiliza el sistema de seguridad cifrado por SSL, capa de conexión segura, para encriptar los datos de los Usuarios cargados en el Sitio. Sin embargo, resulta importante señalar que no se puede garantizar la seguridad de la información ni de los pagos que se transmiten por Internet o por correo electrónico, no siendo Electrosafe y/o sus licenciantes y/o sociedades vinculadas en ningún caso, responsables de los daños que eventualmente deriven del uso de medios de comunicación electrónicos, incluyendo, pero sin limitarse a ellos, los daños que se deriven de un fallo o retraso en el envío de comunicaciones electrónicas, intercepción o manipulación de comunicaciones electrónicas por parte de terceros o mediante programas informáticos utilizados para la transmisión de comunicaciones electrónicas o de virus.
        </p>
        <p className="normal-text">
          Asimismo, Electrosafe no será responsable frente al Usuario ni frente a ningún tercero por los daños, infracciones, delitos, contravenciones o cualquier otra clase de ilícitos que pudieran cometerse, ya se trate de derechos de propiedad intelectual, al honor y reputación de las personas, sus datos personales, crediticios, derechos del consumidor, ni cualquier otro derecho que pudiera ser vulnerado como consecuencias del mal uso del Sitio por parte de los Usuarios.
        </p>
        <p className="normal-text">
          Las limitaciones a la responsabilidad de Electrosafe establecidas en el presente apartado alcanzan también a los directores, administradores, representantes, funcionarios, empleados y/o asesores de Electrosafe, los que también quedan liberados de cualquier responsabilidad en relación con el uso y/o acceso al Sitio que realicen los Usuarios y terceros por los que no deben responder.
        </p>
      </div>

      {/* Sección Domicilio y Contacto */}
      <div className="section">
        <h2 className="section-title">Domicilio y Contacto</h2>
        <p className="normal-text">
          Se fija como domicilio de Electrosafe republica de cuba 769, CP: 1882, Ezpeleta, Buenos Aires, Argentina.
        </p>
        <p className="normal-text">
          Si tienes alguna duda sobre los Términos y Condiciones Generales o demás políticas y principios que rigen Electrosafe, escríbenos a <a href="mailto:electrosafeservice@gmail.com">electrosafeservice@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
