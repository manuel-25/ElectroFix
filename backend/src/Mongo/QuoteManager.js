import quoteModel from "./models/quote.model.js"

class QuoteManagerDao {
    constructor() {
        this.quoteModel = quoteModel
    }

    async getAll() {
        return await this.quoteModel.find()
    }

    async getById(id) {
        return await this.quoteModel.findById(id)
    }

    async create(data) {
        return await this.quoteModel.create(data)
    }

    async update(id, data, config) {
        return await this.quoteModel.findByIdAndUpdate(id, data, config)
    }

    async updateByServiceRequestNumber(serviceRequestNumber, data, config) {
        return await this.quoteModel.findOneAndUpdate(
            { serviceRequestNumber }, // Busca por el campo serviceRequestNumber
            data,
            { new: true, ...config } // Devuelve el documento actualizado
        )
    }

    async delete(id) {
        return await quoteModel.findByIdAndDelete(id)
    }

    async findLastServiceRequest() {
        return await this.quoteModel
            .findOne()
            .sort({ date: -1 })
            .exec()
    }   

    async getByServiceRequestNumber(serviceRequestNumber) {
        return await this.quoteModel.findOne({ serviceRequestNumber })
    }

    static async softDelete(serviceRequestNumber) {
        return await quoteModel.findOneAndUpdate(
            { serviceRequestNumber },
            { deleted: true }, // Cambia el estado a "eliminado"
            { new: true }
        )
    }

    static async getAll({ page = 1, limit = 10 }) {
        const quotes = await quoteModel.find({ deleted: { $ne: true } }) // Filtrar las cotizaciones no eliminadas
            .skip((page - 1) * limit)
            .limit(limit)
        return quotes
    }
}

const QuoteManager = new QuoteManagerDao()
export default QuoteManager