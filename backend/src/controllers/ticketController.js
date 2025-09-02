// controllers/ticketController.js
import PDFDocument from 'pdfkit'
import path from 'path'
import ServiceManager from '../Mongo/ServiceManager.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import qrcode from 'qrcode'
import imageSize from 'image-size'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* ===== Config ===== */
const PAGE_WIDTH_PT = 226.77 // 80mm
const MARGIN = 14
const BASE_URL = 'https://electrosafeweb.com/'

const TOKENS = {
  font: { base: 8.1, small: 7.2, title: 10.2, brandSmall: 8.4 },
  space: { xs: 3, sm: 6, md: 10, lg: 16 },
  color: { text: '#000', muted: '#333' },
  LOGO_MAX_W: 150,
}

const wInside = (doc) => doc.page.width - MARGIN * 2
const bottomLimit = (doc) => doc.page.height - MARGIN
const ensureSpace = (doc, needed) => { if (doc.y + needed > bottomLimit(doc)) doc.addPage() }
const spacer = (doc, h = TOKENS.space.sm) => { doc.y += h }

function text(doc, str, { size = TOKENS.font.base, align = 'left', color = TOKENS.color.text, lineGap = 1.2, indent = 0, bold = false } = {}) {
  doc.fillColor(color).font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(size)
  doc.text(str, MARGIN + indent, doc.y, { width: wInside(doc) - indent, align, lineGap })
}

function title(doc, str, { center = false, bold = true } = {}) {
  text(doc, str.toUpperCase(), { size: TOKENS.font.title, bold, align: center ? 'center' : 'left' })
  spacer(doc, TOKENS.space.xs)
}

function kv(doc, k, v, { size = TOKENS.font.base } = {}) {
  const leftWidth = 78
  const key = `${k.toUpperCase()}: `
  const y0 = doc.y
  const prevSize = doc._fontSize
  doc.fontSize(size)
  const hL = doc.heightOfString(key, { width: leftWidth, lineGap: 1.05 })
  const hV = doc.heightOfString(String(v ?? '—'), { width: wInside(doc) - leftWidth, lineGap: 1.2 })
  const h = Math.max(hL, hV)
  ensureSpace(doc, h + TOKENS.space.xs + 1)
  doc.font('Helvetica-Bold').fontSize(size).text(key, MARGIN, y0, { width: leftWidth, lineGap: 1.2 })
  doc.font('Helvetica').text(String(v ?? '—'), MARGIN + leftWidth, y0, { width: wInside(doc) - leftWidth, lineGap: 1.2 })
  doc.fontSize(prevSize)
}

function boxedText(doc, content, { padding = 4, size = TOKENS.font.base, lineGap = 1.05 } = {}) {
  const x = MARGIN, w = wInside(doc), innerW = w - padding * 2
  const prevSize = doc._fontSize
  doc.fontSize(size)
  const hTxt = doc.heightOfString(content || '—', { width: innerW, lineGap })
  const h = hTxt + padding * 2
  const yStart = doc.y
  ensureSpace(doc, h)
  doc.lineWidth(0.6).strokeColor('#000').rect(x, yStart, w, h).stroke()
  doc.text(content || '—', x + padding, yStart + padding, { width: innerW, lineGap, align: 'left' })
  doc.y = yStart + h // 🔧 corregido: evita que se pase más abajo de lo necesario
  doc.fontSize(prevSize)
}

function boxedDescription(doc, { code, description, extraLine }, { padding = 5, size = TOKENS.font.base } = {}) { // ↓ padding reducido de 7 → 5
  const x = MARGIN, w = wInside(doc), innerW = w - padding * 2, lineGap = 1.25
  const prevSize = doc._fontSize
  doc.fontSize(size)
  const codeH = code ? doc.heightOfString(code, { width: innerW, lineGap }) : 0
  const descH = description ? doc.heightOfString(description, { width: innerW, lineGap }) : 0
  const extraH = extraLine ? doc.heightOfString(extraLine, { width: innerW, lineGap }) : 0
  const h = codeH + (code && description ? 2 : 0) + descH + (extraLine ? 2 : 0) + extraH + padding * 2
  ensureSpace(doc, h + TOKENS.space.sm)
  doc.lineWidth(0.6).strokeColor('#000').rect(x, doc.y, w, h).stroke()
  let y = doc.y + padding
  if (code) { doc.font('Helvetica-Bold').text(code, x + padding, y, { width: innerW, lineGap }); y += codeH + (description ? 2 : 0) }
  if (description) { doc.font('Helvetica').text(description, x + padding, y, { width: innerW, lineGap }); y += descH + (extraLine ? 2 : 0) }
  if (extraLine) { doc.font('Helvetica').text(extraLine, x + padding, y, { width: innerW, lineGap }) }
  doc.fontSize(prevSize)
  doc.y += h
}

function kvSmallRight(doc, label, value) {
  const y0 = doc.y
  ensureSpace(doc, TOKENS.space.sm + 10)
  doc.font('Helvetica').fontSize(TOKENS.font.small)
  doc.text(label, MARGIN, y0, { width: wInside(doc) * 0.55 })
  doc.text(value, MARGIN, y0, { width: wInside(doc), align: 'right' })
  spacer(doc, TOKENS.space.sm)
}

function drawHeaderInfo(doc) {
  text(
    doc,
    'VICENTE LÓPEZ 770 QUILMES – ROCHA 1752 · BARRACAS CABA',
    { size: TOKENS.font.brandSmall, align: 'center' }
  )
  text(
    doc,
    'TEL.: 11-7892-7709 / 11-3914-8768  ·  electrosafeservice@gmail.com',
    { size: TOKENS.font.brandSmall, align: 'center' }
  )
  spacer(doc, TOKENS.space.md)
}

/* ===== Logo (con lista de candidatos y avance de cursor por altura real) ===== */
function drawLogo(doc) {
  const baseDir = path.resolve(__dirname, '../../public/images')
  const candidates = [
    path.join(baseDir, 'electrosafeLogo1300x600.jpg'),
    path.join(baseDir, 'electrosafeLogo1300x600.jpeg'),
    path.join(baseDir, 'electrosafeLogo1300x600.JPG'),
    path.resolve(process.cwd(), 'frontend/public/images/electrosafeLogo1300x600.jpg'),
  ]

  const logo = candidates.find(p => p && fs.existsSync(p))
  if (!logo) { console.warn('[Ticket] Logo no encontrado. Probé:', candidates); return }

  const maxW = Math.min(TOKENS.LOGO_MAX_W, wInside(doc))
  const FALLBACK_RATIO = 600 / 1300

  let renderW = maxW
  let renderH = Math.round(maxW * FALLBACK_RATIO)

  try {
    const buffer = fs.readFileSync(logo)
    const meta = imageSize(buffer)
    if (meta?.width && meta?.height) {
      const scale = maxW / meta.width
      renderW = maxW
      renderH = Math.round(meta.height * scale)
    }
  } catch (e) {
    console.warn('[Ticket] image-size falló, uso ratio fallback:', e?.message)
  }

  ensureSpace(doc, renderH + TOKENS.space.md)
  const x = (doc.page.width - renderW) / 2
  doc.image(logo, x, doc.y, { width: renderW })
  doc.y += renderH
  spacer(doc, TOKENS.space.md) // ↑ más espacio inferior del logo
}

/* ===== PDF ===== */
async function buildAndSendTicket(service, res) {
  const svc = typeof service.toObject === 'function' ? service.toObject() : service

  const doc = new PDFDocument({
    size: [PAGE_WIDTH_PT, 1200],
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: { Title: `Ticket ${svc.code || ''}` },
  })

  const buffers = []
  doc.on('data', b => buffers.push(b))
  doc.on('end', () => {
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="ticket-${svc.code}.pdf"`)
    res.send(Buffer.concat(buffers))
  })

  doc.font('Helvetica').fontSize(TOKENS.font.base)

  // Encabezado
  drawLogo(doc)
  drawHeaderInfo(doc)

  // Datos del cliente
  title(doc, 'Datos del cliente')
  const u = svc.userData || {}
  const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || '—'
  kv(doc, 'Ticket', svc.code)
  kv(doc, 'Cliente', fullName)
  kv(doc, 'Tel', u.phone || '—')
  kv(doc, 'N° Cliente', svc.customerNumber ?? '—')
  kv(doc, 'Domicilio', u.domicilio || '—')
  kv(doc, 'Fecha Ingreso', svc.receivedAt ? new Date(svc.receivedAt).toLocaleDateString('es-AR') : '—')
  kv(doc, 'Registrado', svc.createdAt ? new Date(svc.createdAt).toLocaleDateString('es-AR') : '—')

  // Equipo
  const equipo = [svc.equipmentType, svc.brand, svc.model].filter(Boolean).join(' - ') || '—'
  kv(doc, 'Equipo', equipo)

  // Descripción (recuadro) — padding reducido para achicar el alto total
  boxedDescription(doc, {
    code: svc.code ? String(svc.code) : null,
    description: svc.description || '—',
  }, { padding: 5, size: TOKENS.font.base })

  // Valores (alineados derecha)
  const aprox = svc.approximateValue && String(svc.approximateValue).trim()
  const repNum = (typeof svc.repuestos === 'number') ? svc.repuestos : null
  const rep = (repNum != null) ? `\$ ${repNum.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : null
  const subtotalNum = (typeof svc.subtotal === 'number') ? svc.subtotal : null
  const subtotal = (subtotalNum != null) ? `\$ ${subtotalNum.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : null
  const finalNum = (typeof svc.finalValue === 'number') ? svc.finalValue : null
  const totalNum = (typeof svc.total === 'number') ? svc.total : finalNum
  const total = (totalNum != null) ? `\$ ${totalNum.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : null

  if (aprox || rep || subtotal || total) {
    if (aprox)    kvSmallRight(doc, 'VALOR APROX.', `${aprox}`)
    if (rep)      kvSmallRight(doc, 'REPUESTO(S)',  rep)
    if (subtotal) kvSmallRight(doc, 'SUBTOTAL',     subtotal)
    if (total)    kvSmallRight(doc, 'TOTAL',        total)
  }

  // Atención
  title(doc, 'ATENCIÓN', { center: true })
  const tech = svc.receivedBy || (svc.createdByEmail ? svc.createdByEmail.split('@')[0] : null) || '—'
  kv(doc, 'Sucursal', svc.receivedAtBranch || '—')
  kv(doc, 'Atendido por', tech)
  spacer(doc, TOKENS.space.md)

  // Condiciones
  const condicionesTxt = `CONDICIONES AL RECIBIR ESTE TICKET, EL CLIENTE ACEPTA LOS TÉRMINOS Y CONDICIONES DEL SERVICIO TÉCNICO. GUARDERÍA DE ELECTRODOMÉSTICOS: 7 DÍAS SIN CARGO DESDE LA NOTIFICACIÓN DEL PRESUPUESTO O RECHAZO. PASADO ESE PLAZO PODRÁ COBRARSE ESTADÍA. TRANSCURRIDOS 30 DÍAS SIN RETIRO Y PREVIA NOTIFICACIÓN, EL EQUIPO PODRÁ SER DISPUESTO SEGÚN CORRESPONDA. COSTO POR REVISIÓN Y DIAGNÓSTICO EN CASO DE NO ACEPTAR EL PRESUPUESTO: $5.000 A $15.000 SEGÚN ARTÍCULO. SE ABONA AL RETIRO. EL PRESUPUESTO DEBE SER CONFIRMADO O RECHAZADO ANTES DE RETIRAR EL EQUIPO. PODRÁ QUEDAR DESARMADO HASTA RECIBIR RESPUESTA. NO SE ENTREGAN EQUIPOS DESARMADOS NI SIN EL CIERRE DEL SERVICIO. TIEMPO ESTIMADO DE ENVÍO DE PRESUPUESTO: 5 A 7 DÍAS HÁBILES, SUJETO A COMPLEJIDAD Y DEMORA DE PROVEEDORES. GARANTÍA COMERCIAL: 30 DÍAS CORRIDOS SOBRE LA REPARACIÓN EFECTUADA (MANO DE OBRA Y/O REPUESTOS), SIN PERJUICIO DE LA GARANTÍA LEGAL LEY 24.240. NO CUBRE FALLAS NUEVAS, DEFECTOS DISTINTOS A LOS INFORMADOS, NI DAÑOS POR LÍQUIDOS, GOLPES, SOBRETENSIÓN, USO INDEBIDO O INTERVENCIÓN AJENA. CUALQUIER FALLA DETECTADA SERÁ INFORMADA Y PRESUPUESTADA POR SEPARADO. ¡GRACIAS POR ELEGIRNOS!`
  boxedText(doc, condicionesTxt, { padding: 4, size: 6, lineGap: 0.85 })

  spacer(doc, 64)

  // QR (compacto y en misma página siempre que haya espacio mínimo)
{
  const qrUrl = BASE_URL
  const size = 90
  const captionH = 6
  const footerH = 24
  const neededSpace = size + captionH + 6 + footerH + 6
  const available = bottomLimit(doc) - doc.y
  if (available < neededSpace) {
    doc.addPage()
  }

  const qrBase64 = await qrcode.toDataURL(qrUrl)
  const x = (doc.page.width - size) / 2
  doc.image(qrBase64, x, doc.y, { width: size, height: size })
  doc.y += size

  spacer(doc, 2)
  text(doc, qrUrl, {
    size: 8,
    align: 'center',
    color: TOKENS.color.text,
    bold: true,
    lineGap: 1.3
  })

  spacer(doc, 2)
  text(doc, '¡GRACIAS POR SU PREFERENCIA!', {
    bold: true,
    align: 'center'
  })

  text(doc, 'Comprobante no valido como factura.', {
    size: 7.5,
    align: 'center',
    color: '#000',
    bold: true,
  })
}


  doc.end()
}

/* ===== Controlador ===== */
const TicketController = {
  async printServiceTicket(req, res) {
    try {
      const { publicId } = req.params
      const service = await ServiceManager.getByPublicId(publicId)
      if (!service) return res.status(404).json({ error: 'Servicio no encontrado' })
      await buildAndSendTicket(service, res)
    } catch (err) {
      console.error('Error generando ticket:', err)
      res.status(500).json({ error: 'Error generando el ticket' })
    }
  },
  async printByCode(req, res) {
    try {
      const { code } = req.params
      const service = await ServiceManager.getByCode(code)
      if (!service) return res.status(404).json({ error: 'Servicio no encontrado' })
      await buildAndSendTicket(service, res)
    } catch (err) {
      console.error('Error generando ticket:', err)
      res.status(500).json({ error: 'Error generando el ticket' })
    }
  },
  async printByPublicId(req, res) {
    try {
      const { publicId } = req.params
      const service = await ServiceManager.serviceModel.findOne({ publicId })
      if (!service) return res.status(404).json({ error: 'Servicio no encontrado' })
      await buildAndSendTicket(service, res)
    } catch (err) {
      console.error('Error generando ticket:', err)
      res.status(500).json({ error: 'Error generando el ticket' })
    }
  },
}

export default TicketController
