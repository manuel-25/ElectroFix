// controllers/workOrderController.js
import PDFDocument from 'pdfkit'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import imageSize from 'image-size'
import ServiceManager from '../Mongo/ServiceManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('es-AR') : '—')

const drawHeader = (doc, code) => {
  const baseDir = path.resolve(__dirname, '../../public/images')
  const logoPaths = [
    path.join(baseDir, 'electrosafeLogo1300x600.jpg'),
    path.join(baseDir, 'electrosafeLogo1300x600.jpeg'),
    path.join(baseDir, 'electrosafeLogo1300x600.JPG')
  ]
  const logo = logoPaths.find(p => fs.existsSync(p))

  if (logo) {
    let h = 60
    try {
      const { width, height } = imageSize(fs.readFileSync(logo))
      const scale = 130 / width
      h = height * scale
    } catch {}
    doc.image(logo, 50, 50, { width: 130, height: h })
  }

  doc.font('Helvetica').fontSize(8)
  doc.text('CUIT: 20-38903937-1', 200, 52)
  doc.text('Tel.: 11-3914-8766', 200, 64)
  doc.text('Dir.: Av. Vicente López 770 - Quilmes', 200, 76)
  doc.text('Rocha 1752 - Barracas', 200, 88)
  doc.font('Helvetica-Bold').text(`Fecha: ${fmtDate(new Date())}`, 450, 52)
  doc.text(`N° control: ${code}`, 450, 64)

  doc.font('Helvetica-Bold').fontSize(13).text('ÓRDEN DE TRABAJO', 0, 115, { align: 'center' })
  doc.moveTo(40, 135).lineTo(560, 135).stroke()
}

const drawDynamicBoxedField = (doc, label, value, y, options = {}) => {
  const marginX = 40
  const boxWidth = 520
  const labelX = marginX + 10
  const valueX = marginX + 90
  const textWidth = boxWidth - (valueX - marginX) - 10
  const fontSize = options.fontSize || 9

  doc.font('Helvetica').fontSize(fontSize)

  const valueHeight = doc.heightOfString(value || '', {
    width: textWidth,
    align: 'left'
  })

  const boxHeight = Math.max(valueHeight + 12, 22)

  doc.rect(marginX, y, boxWidth, boxHeight).stroke()
  doc.font('Helvetica-Bold').fontSize(fontSize).text(`${label}:`, labelX, y + 6)
  doc.font('Helvetica').fontSize(fontSize).text(value || '', valueX, y + 6, {
    width: textWidth,
    align: 'left'
  })

  return y + boxHeight + 6
}

const drawSectionBox = (doc, y, title, bodyFn) => {
  const marginX = 40
  const width = 520
  const padding = 10
  const startY = y

  doc.font('Helvetica-Bold').fontSize(10).text(title, marginX + padding, y + padding)
  y += padding * 2

  const bodyStartY = y
  y = bodyFn(doc, y)

  const height = y - startY + padding
  doc.rect(marginX, startY, width, height).stroke()

  return startY + height + 14
}

async function buildAndSendWorkOrder(service, res) {
  const s = typeof service.toObject === 'function' ? service.toObject() : service
  const doc = new PDFDocument({ size: 'A4', margin: 40 })
  const buffers = []
  doc.on('data', (b) => buffers.push(b))
  doc.on('end', () => {
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename=orden-${s.code}.pdf`)
    res.send(Buffer.concat(buffers))
  })

  const style = {
    bold: () => doc.font('Helvetica-Bold').fontSize(10),
    text: () => doc.font('Helvetica').fontSize(10),
    small: () => doc.font('Helvetica').fontSize(8)
  }

  drawHeader(doc, s.code)

  let y = 145
  const spacing = 4

  y = drawDynamicBoxedField(doc, 'Nombre', `${s.userData?.firstName || ''} ${s.userData?.lastName || ''}`, y)
  y = drawDynamicBoxedField(doc, 'Artículo', `${[s.equipmentType, s.brand, s.model].filter(Boolean).join(' ')}`, y)
  y = drawDynamicBoxedField(doc, 'Diagnóstico técnico', `${s.diagnosticoTecnico || s.description || ''}`, y)
  if (s.approximateValue) {
    y = drawDynamicBoxedField(doc, 'Valor aproximado', `${s.approximateValue}`, y)
  }

  y = drawSectionBox(doc, y, 'Presupuesto', (doc, y) => {
    style.bold()
      .text('Cantidad', 50, y)
      .text('Descripción', 120, y)
      .text('Precio U.', 430, y, { width: 60, align: 'right' })
      .text('Subtotal', 500, y, { align: 'right' })
    y += 15

    let total = 0
    const items = s.finalValue > 0 ? [
      { cantidad: 1, descripcion: `REEMPLAZO PANEL LED ${s.brand} ${s.model}`, precio: s.finalValue },
      { cantidad: 1, descripcion: 'VIATICO RETIRO A DOMICILIO', precio: s.repuestos || 0 }
    ] : []

    if (items.length) {
      style.text()
      items.forEach(i => {
        const subtotal = i.cantidad * i.precio
        total += subtotal
        doc.text(i.cantidad.toString(), 50, y)
        doc.text(i.descripcion, 120, y, { width: 260 })
        doc.text(`$ ${i.precio.toLocaleString()}`, 430, y, { width: 60, align: 'right' })
        doc.text(`$ ${subtotal.toLocaleString()}`, 500, y, { align: 'right' })
        y += 15
      })
    } else {
      doc.font('Helvetica').text('No hay ítems de presupuesto definidos', 50, y)
      y += 15
    }

    style.bold().text(`Total:`, 430, y + 10, { width: 60, align: 'right' })
    doc.text(`$ ${total.toLocaleString()}`, 500, y + 10, { align: 'right' })
    return y + 30
  })

  y = drawDynamicBoxedField(doc, 'Garantía', `${s.warrantyExpiration || 30} días`, y)

  y = drawSectionBox(doc, y, 'Prescripción de la garantía', (doc, y) => {
    doc.font('Helvetica').fontSize(9).text(`
* Mal uso del mismo                 * Desgaste de material por uso
* Golpes/contusiones/maltrato      * Residuos de líquidos en el interior
* Faja de garantía dañada          * Sobrecalentamiento por diferencia eléctrica
`, 45, y + 2, { width: 500 })
    return doc.y
  })

  y = drawSectionBox(doc, y, 'Nota', (doc, y) => {
    doc.font('Helvetica').fontSize(9).text(`
Los presupuestos enviados tendrán una tolerancia de espera de 7 (siete) días corridos, pasado este período el cliente pierde la potestad del electrodoméstico.

En caso de rechazar el presupuesto, el valor de la revisión varía entre $5.000 a $15.000 dependiendo de la complejidad y tamaño del electrodoméstico. Este importe deberá abonarse al momento del retiro.
`, 45, y + 5, { width: 500 })
    doc.font('Helvetica-Bold').fontSize(9).text('No se entregan equipos desarmados.', 45, doc.y + 5)
    doc.font('Helvetica').fontSize(9).text(`
Para una mejor organización de nuestro trabajo, en caso de no aceptar el presupuesto por favor avisar para poder ensamblar nuevamente el electrodoméstico para su devolución, en las mismas condiciones que ingresó.`, 45, doc.y + 5, { width: 500 })
    return doc.y + 10
  })

  // Firma
  y += 30
  doc.moveTo(400, y).lineTo(550, y).stroke()
  doc.fontSize(9).text('Firma del cliente', 430, y + 5)

  // Footer
  if (doc.y > 750) doc.addPage()
  doc.fontSize(8).text('Documento no válido como factura', 0, doc.page.height - 40, { align: 'center' })

  doc.end()
}

const WorkOrderController = {
  async printByPublicId(req, res) {
    const { publicId } = req.params
    const service = await ServiceManager.getByPublicId(publicId)
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' })
    await buildAndSendWorkOrder(service, res)
  }
}

export default WorkOrderController