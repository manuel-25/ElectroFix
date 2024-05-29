import { Schema, model } from "mongoose"

const collection = 'cotizaciones'
const quoteSchema = new Schema({
    date: {type: Date, default:  Date.now(), index: true},
    category: { type: String, index: true, required: true},
    brand: { type: String, required: true},
    model: { type: String },
    faults: { type: [String] },
    userData: {
        additionalDetails: String,
        discountCode: String,
        email: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        municipio: String,
        phone: Number,
        province: String
    }
})

const quoteModel = model(collection, quoteSchema)
export default quoteModel