import clientModel from "./models/client.model.js"

class ClientManagerDao {
    constructor() {
        this.clientModel = clientModel
    }

    // Función para obtener la hora actual en Argentina
    getArgentinaTime() {
        const now = new Date()
        now.setHours(now.getHours() - 3) // Ajustar a GMT-3
        return now
    }

    // Función para formatear la fecha en un formato legible
    formatDate(date) {
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Argentina/Buenos_Aires',
            hour12: false,
        }).format(date)
    }

    async getAll() {
        const clients = await this.clientModel.find()
        return clients.map(client => {
            client.createdAt = this.formatDate(client.createdAt)
            return client
        })
    }

    async getById(id) {
        const client = await this.clientModel.findById(id)
        client.createdAt = this.formatDate(client.createdAt)
        return client
    }

    async create(data) {
        data.date = this.getArgentinaTime() // Usar la hora de Argentina
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
            lastClient.createdAt = this.formatDate(lastClient.createdAt)
        }
        return lastClient
    }
}

const ClientManager = new ClientManagerDao()
export default ClientManager
