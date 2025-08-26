import mongoose from 'mongoose'

const statusHistorySchema = new mongoose.Schema({
  status: { type: String },
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: String }
}, { _id: false })

const serviceSchema = new mongoose.Schema({
  // Relación con cliente
  customerNumber: { type: Number, required: true },
  quoteReference: { type: Number },

  // Código de ingreso
  code: { type: String, required: true, unique: true },
  branch: { type: String, required: true },

  // Datos del cliente
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
    enum: ['Pendiente', 'Recibido', 'En Revisión', 'En Reparación', 'En Pruebas', 'Listo para retirar', 'Entregado', 'Garantía'],
    default: 'Pendiente'
  },
  statusHistory: [statusHistorySchema],

  // Datos de recepción
  receivedBy: { type: String, required: true },
  receivedAt: { type: Date, default: Date.now },
  receivedAtBranch: {
    type: String,
    enum: ['Quilmes', 'Barracas'],
    required: true
  },
  receivedNotes: { type: String },
  deliveryMethod: {
    type: String,
    enum: ['Presencial', 'Envío', 'Tercero'],
    default: 'Presencial'
  },
  receivedPhoto: { type: String },

  // Modificaciones
  lastModifiedBy: String,
  lastModifiedAt: { type: Date, default: Date.now },

  // Otros campos
  warrantyExpiration: { type: Number, default: 30 },
  photos: [String],
  notes: { type: String },

  // Relación con usuarios
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdByEmail: { type: String },

  // Supervisor del servicio (uso futuro)
  supervisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // ID pública para exposición externa
  publicId: { type: String, unique: true }

}, { timestamps: true })

// Hook para generar publicId automáticamente si no existe
serviceSchema.pre('save', function (next) {
  if (!this.publicId) {
    this.publicId = generateRandomId()
  }
  next()
})

function generateRandomId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const serviceModel = mongoose.model('Service', serviceSchema)
export default serviceModel
