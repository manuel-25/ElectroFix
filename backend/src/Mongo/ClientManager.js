import moment from 'moment-timezone'
import clientModel from "./models/client.model.js"

class ClientManagerDao {
    constructor() {
        this.clientModel = clientModel
    }

    async getAll() {
        const clients = await this.clientModel.find()
        return clients.map(client => {
            client.createdAt = moment(client.createdAt).tz('America/Argentina/Buenos_Aires').format()
            return client
        })
    }

    async getById(id) {
        const client = await this.clientModel.findById(id)
        client.createdAt = moment(client.createdAt).tz('America/Argentina/Buenos_Aires').format()
        return client
    }

    async create(data) {
        data.date = moment().tz('America/Argentina/Buenos_Aires').toDate()
        return await this.clientModel.create(data)
    }

    async update(id, data, config) {
        return await this.clientModel.findByIdAndUpdate(id, data, config)
    }

    async delete(id) {
        return await this.clientModel.findByIdAndDelete(id)
    }

    async findByEmail(email) {
        return await this.clientModel.findOne({ email })
    }

    async findLastClient() {
        const lastClient = await this.clientModel.findOne().sort({ createdAt: -1 })
        if (lastClient) {
            lastClient.createdAt = moment(lastClient.createdAt).tz('America/Argentina/Buenos_Aires').format()
        }
        return lastClient
    }
}

const ClientManager = new ClientManagerDao()
export default ClientManager
