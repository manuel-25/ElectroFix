import mongoose from 'mongoose'

const statusHistorySchema = new mongoose.Schema({
  status: { type: String },
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: String }
}, { _id: false })

const serviceSchema = new mongoose.Schema({
  // Relación con cliente
  customerNumber: { type: Number, required: true },
  quoteReference: { type: Number }, // opcional, si vino de una cotización

  // Código de ingreso
  code: { type: String, required: true, unique: true }, // W001, Q104, etc.
  branch: { type: String, required: true },

  // Datos del cliente (se duplican para impresión y rastreo)
  userData: {
    firstName: String,
    lastName: String,
    dniOrCuit: String,
    email: String,
    phone: String,
    domicilio: String,
    province: String,
    municipio: String
  },

  // Equipo
  equipmentType: String,
  description: String,
  brand: String,
  model: String,

  // Servicio
  serviceType: {
    type: String,
    enum: ['Reparación', 'Garantía', 'Mantenimiento'],
    default: 'Reparación'
  },
  approximateValue: { type: String, default: 0 },
  finalValue: { type: Number, default: 0 },
  repuestos: { type: Number, default: 0 },

  // Estado actual + historial
  status: {
    type: String,
    enum: ['Pendiente', 'Recibido', 'En Revisión', 'En Reparación', 'En Pruebas', 'Listo para retirar', 'Entregado'],
    default: 'Pendiente'
  },
  statusHistory: [statusHistorySchema],

  receivedBy: String,
  lastModifiedBy: String,
  lastModifiedAt: { type: Date, default: Date.now },

  warrantyExpiration: { type: Number, default: 30 },
  photos: [String],

  notes: { type: String }

}, { timestamps: true })

const serviceModel = mongoose.model('Service', serviceSchema)
export default serviceModel
