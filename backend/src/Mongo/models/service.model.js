// models/service.model.js
import mongoose from 'mongoose'

const { Schema, model } = mongoose

// ─── Enums ────────────────────────────────────────────────────────────────────
export const SERVICE_TYPES = ['Reparación', 'Garantía', 'Mantenimiento']
export const SERVICE_STATUS = [
  'Pendiente',
  'Recibido',
  'En Revisión',
  'En Reparación',
  'En Pruebas',
  'Listo para retirar',
  'Entregado',
  'Garantía'
]
export const BRANCHES = ['Quilmes', 'Barracas', 'Ninguna']
export const DELIVERY_METHODS = ['Presencial', 'Envío Correo', 'Retiro y Entrega', 'UberFlash']

// ─── Subschemas ───────────────────────────────────────────────────────────────
const StatusHistorySchema = new Schema(
  {
    status: { type: String, enum: SERVICE_STATUS, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: String } // email del usuario
  },
  { _id: false }
)

// ─── Schema principal ─────────────────────────────────────────────────────────
const ServiceSchema = new Schema(
  {
    // Relación con cliente
    customerNumber: { type: Number, required: true, index: true },
    quoteReference: { type: Number },

    // Código de ingreso (único del servicio)
    code: { type: String, required: true, unique: true, index: true },

    // Datos del cliente (snapshot)
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
    serviceType: { type: String, enum: SERVICE_TYPES, default: 'Reparación' },
    approximateValue: { type: String, default: '0' }, // rango/nota libre
    finalValue: { type: Number, default: 0 },
    repuestos: { type: Number, default: 0 },

    // Estado actual + historial
    status: { type: String, enum: SERVICE_STATUS, default: 'Pendiente', index: true },
    statusHistory: [StatusHistorySchema],

    // Datos de recepción (solo si fue recibido)
    receivedBy: { type: String, default: null },           // nombre/email del receptor
    receivedAt: { type: Date, default: null },
    receivedAtBranch: { type: String, enum: BRANCHES, default: null },
    receivedNotes: { type: String },
    deliveryMethod: { type: String, enum: DELIVERY_METHODS, default: 'Presencial' },
    receivedPhoto: { type: String },

    // Modificaciones
    lastModifiedBy: String,
    lastModifiedAt: { type: Date, default: Date.now },

    // Otros
    warrantyExpiration: { type: Number, default: 30 },     // días
    photos: [String],
    notes: { type: String },

    // Relación con usuarios
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdByEmail: { type: String },

    // Supervisor (futuro)
    supervisedBy: { type: Schema.Types.ObjectId, ref: 'User' },

    // Fecha delivery y si esta conforme => evaluar en google
    isSatisfied: { type: Boolean, default: null },
    deliveredAt: { type: Date, default: null },

    // ID pública para compartir externamente
    publicId: { type: String, unique: true }
  },
  {
    timestamps: true
  }
)

// ─── Hooks ────────────────────────────────────────────────────────────────────
ServiceSchema.pre('save', function (next) {
  if (!this.publicId) this.publicId = generatePublicId()
  next()
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generatePublicId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let out = ''
  for (let i = 0; i < length; i++) out += chars.charAt(Math.floor(Math.random() * chars.length))
  return out
}

// ─── Índices útiles ───────────────────────────────────────────────────────────
ServiceSchema.index({ customerNumber: 1, createdAt: -1 })

const ServiceModel = model('Service', ServiceSchema)

export default ServiceModel
