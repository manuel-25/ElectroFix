import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  dniOrCuit: { type: String },
  email: { 
    type: String,
    lowercase: true,
    trim: true,
    sparse: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  phone: { type: String, required: true },
  domicilio: { type: String, trim: true },
  province: { type: String, trim: true },
  municipio: { type: String, trim: true },
  customerNumber: { type: Number, required: true, unique: true, index: true },
  serviceRequestNumbers: [Number]
}, { timestamps: true })

const clientModel = mongoose.model('Client', clientSchema)
export default clientModel
