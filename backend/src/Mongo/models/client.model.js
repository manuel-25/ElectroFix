import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    province: String,
    municipio: String,
    serviceRequestNumbers: [Number],
    customerNumber: Number
}, { timestamps: true })

const clientModel = mongoose.model('Client', clientSchema)

export default clientModel
