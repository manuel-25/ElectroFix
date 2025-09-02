// templates/ticketHtml.js
export function renderTicketHtml({
  service,
  fullName,
  createdAt,     // string YA formateada (dd/mm/aaaa)
  receivedDate,  // string YA formateada (dd/mm/aaaa)
  receivedBy,    // nombre/alias sin mail
  logoUrl,       // ABSOLUTA o base64 (recomendado) ej: https://tu-dominio/assets/electrosafeLogo1300x600.jpg
  qrDataUrl,     // base64 generado con qrcode del dominio fijo
}) {
  const eqLine = [service?.equipmentType, service?.brand, service?.model].filter(Boolean).join(' - ') || '—'
  const aprox = service?.approximateValue && String(service.approximateValue).trim()

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Ticket ${service?.code || ''}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    /* Formato tipo rollo 80mm */
    @page { size: 80mm auto; margin: 0; }
    * { box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #000;
      margin: 0; padding: 0; width: 80mm;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .wrap { padding: 10px; }

    /* ---------- Encabezado / logo ---------- */
    .logo { text-align: center; margin-bottom: 6px; }
    .logo img {
      max-width: 100%; height: auto;
      width: 58mm; /* asegura visibilidad y escala */
      display: inline-block;
    }
    .brand { text-align: center; margin-bottom: 6px; line-height: 1.25; }
    .brand .name { font-weight: 700; font-size: 14px; }
    .brand .addr, .brand .tel, .brand .email { font-size: 10px; }

    /* ---------- Secciones ---------- */
    .section { margin: 10px 0; }
    .title {
      font-weight: 700; font-size: 12px;
      padding-bottom: 3px; border-bottom: 1px solid #000;
      margin: 0 0 6px;
    }
    .title.center { text-align: center; }

    /* filas compactas (evita solapado) */
    .rows { font-size: 9px; line-height: 1.25; }
    .row { display: flex; gap: 6px; margin: 2px 0; }
    .row .label { font-weight: 700; min-width: 70px; }
    .row .value { flex: 1; word-break: break-word; }

    /* cajas */
    .box {
      border: 1px solid #000; padding: 6px; margin-top: 4px;
      white-space: pre-wrap; word-wrap: break-word; font-size: 10px; line-height: 1.3;
    }

    /* valores (solo aprox.) */
    .kvbox { border: 1px solid #000; }
    .kvrow {
      display: grid; grid-template-columns: 1fr auto;
      gap: 8px; align-items: center;
      padding: 6px;
      font-size: 10px;
    }
    .kvrow .k { font-weight: 700; }
    .kvrow .v { font-weight: 700; text-align: right; word-break: break-word; }

    /* condiciones */
    .conditions { border: 1px solid #000; padding: 6px; font-size: 9px; line-height: 1.35; }

    /* QR */
    .qr { margin-top: 10px; text-align: center; }
    .qr img { width: 28mm; height: 28mm; }
    .qr .url { font-size: 9px; margin-top: 4px; color: #000; }

    /* footer */
    .footer { margin-top: 8px; text-align: center; font-size: 10px; }
    .muted { font-size: 9px; color: #333; }
  </style>
</head>
<body>
  <div class="wrap">
    <!-- Logo -->
    ${logoUrl ? `<div class="logo"><img src="${logoUrl}" alt="Electrosafe Logo" /></div>` : ''}

    <!-- Marca -->
    <div class="brand">
      <div class="name">ELECTROSAFE</div>
      <div class="addr">VICENTE LÓPEZ 770 QUILMES – ROCHA 1752 · BARRACAS CABA</div>
      <div class="tel">TEL.: 11-7892-7709 / 11-3914-8768</div>
      <div class="email">electrosafequilmes@gmail.com</div>
    </div>

    <!-- Datos del cliente (tipografía más chica para evitar superposición) -->
    <div class="section">
      <div class="title">Datos del cliente</div>
      <div class="rows">
        <div class="row"><span class="label">TICKET:</span><span class="value">${service?.code || '—'}</span></div>
        <div class="row"><span class="label">CLIENTE:</span><span class="value">${fullName || '—'}</span></div>
        <div class="row"><span class="label">TEL:</span><span class="value">${service?.userData?.phone || '—'}</span></div>
        <div class="row"><span class="label">N° CLIENTE:</span><span class="value">${service?.customerNumber ?? '—'}</span></div>
        <div class="row"><span class="label">DOMICILIO:</span><span class="value">${service?.userData?.domicilio || '—'}</span></div>
        <div class="row"><span class="label">FECHA INGRESO:</span><span class="value">${receivedDate || '—'}</span></div>
        <div class="row"><span class="label">REGISTRADO EL:</span><span class="value">${createdAt || '—'}</span></div>
      </div>
    </div>

    <!-- Equipo + Descripción (grande). Quitamos “Diagnóstico” -->
    <div class="section">
      <div class="title">Equipo</div>
      <div class="rows">
        <div class="row"><span class="label">EQUIPO:</span><span class="value">${eqLine}</span></div>
      </div>
      <div class="title" style="margin-top:8px;">Descripción</div>
      <div class="box">${service?.description || '—'}</div>
    </div>

    <!-- Valores (SOLO VALOR APROX.) -->
    ${aprox ? `
    <div class="section">
      <div class="title">Valores</div>
      <div class="kvbox">
        <div class="kvrow">
          <div class="k">VALOR APROX.</div>
          <div class="v">$ ${aprox}</div>
        </div>
      </div>
    </div>` : ''}

    <!-- Atención -->
    <div class="section">
      <div class="title center">ATENCIÓN</div>
      <div class="rows">
        <div class="row"><span class="label">SUCURSAL:</span><span class="value">${service?.receivedAtBranch || '—'}</span></div>
        <div class="row"><span class="label">ATENDIDO POR:</span><span class="value">${receivedBy || '—'}</span></div>
      </div>
    </div>

    <!-- Condiciones -->
    <div class="section">
      <div class="title center">CONDICIONES</div>
      <div class="conditions">
        -AL RECIBIR ESTE TICKET EL CLIENTE DA POR SABIDO Y<br/>
        ACEPTA LOS TERMINOS Y CONDICIONES DEL SERVICIO<br/>
        -GUARDERIA DE ELECTRODOMESTICO 7 DIAS DESPUES<br/>
        DE RECHAZADO EL MISMO, EL CLIENTE PIERDE LA<br/>
        POTESTAD EN CASO DE NO RETIRAR EN PLAZO<br/>
        MENCIONADO.<br/>
        -COSTO POR REVISION EN CASO DE NO ACEPTAR EL<br/>
        TRABAJO/RECHAZAR EL PRESUPUESTO $5.000 A $15.000<br/>
        SEGUN ARTICULO.<br/>
        -SE DEBE CONFIRMAR O RECHAZAR EL PRESUPUESTO<br/>
        CON ANTICIPACION AL RETIRO. LOS EQUIPOS EN ESTADO<br/>
        DE REVISION Y DIAGNOSTICO SE ENCUENTRAN<br/>
        DESARMADOS HASTA NO RECIBIR RESPUESTA. NO<br/>
        ENTREGAMOS EQUIPOS DESARMADOS.<br/>
        -TIEMPO ESTIMADO ENVIO DE PRESUPUESTO 5 A 7 DIAS<br/>
        HABILES.<br/>
        ¡MUCHAS GRACIAS!<br/><br/>
        CONSULTÁ EL ESTADO ONLINE ESCANEANDO<br/>
        EL CÓDIGO QR.
      </div>
    </div>

    <!-- QR -->
    <div class="qr">
      ${qrDataUrl ? `<img src="${qrDataUrl}" alt="QR">` : ''}
      <div class="url">https://electrosafeweb.com/</div>
    </div>

    <div class="footer">
      <strong>¡GRACIAS POR SU PREFERENCIA!</strong><br/>
      <span class="muted">Este comprobante no es factura.</span>
    </div>
  </div>
</body>
</html>
  `
}

// Helpers inline para construir el dominio si usás logoUrl absoluto.
// Si no querés esto, podés remover la línea que muestra la URL debajo del QR.
function configLikeOrigin(url) {
  try {
    const u = new URL(url)
    return `${u.protocol}//${u.host}`
  } catch { return '' }
}
function locationSafe(s) { return (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') }