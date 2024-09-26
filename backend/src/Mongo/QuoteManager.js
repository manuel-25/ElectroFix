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
}

const QuoteManager = new QuoteManagerDao()
export default QuoteManager