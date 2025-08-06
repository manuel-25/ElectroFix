import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  dniOrCuit: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  domicilio: { type: String },
  province: { type: String },
  municipio: { type: String },
  customerNumber: { type: Number, required: true },
  serviceRequestNumbers: [Number]
}, { timestamps: true })

const clientModel = mongoose.model('Client', clientSchema)
export default clientModel
