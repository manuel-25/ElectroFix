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

    async delete(id) {
        return await quoteModel.findByIdAndDelete(id)
    }
}

const QuoteManager = new QuoteManagerDao()
export default QuoteManager