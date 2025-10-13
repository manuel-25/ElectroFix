import clientModel from './models/client.model.js'
import mongoose from 'mongoose'

class ClientManagerDao {
  constructor() {
    this.clientModel = clientModel
  }

  getArgentinaTime() {
    const now = new Date()
    now.setHours(now.getHours() - 3)
    return now
  }

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
    return clients.map(client => ({
      ...client.toObject(),
      createdAt: this.formatDate(client.createdAt)
    }))
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null
    const client = await this.clientModel.findById(id)
    return client ? { ...client.toObject(), createdAt: this.formatDate(client.createdAt) } : null
  }

  async getByPhone(phone) {
    const client = await this.clientModel.findOne({ phone })
    return client ? { ...client.toObject(), createdAt: this.formatDate(client.createdAt) } : null
  }

  async getByCustomerNumber(customerNumber) {
    const client = await this.clientModel.findOne({ customerNumber })
    return client ? { ...client.toObject(), createdAt: this.formatDate(client.createdAt) } : null
  }

  async create(data) {
    if (data.email) {
      data.email = data.email.trim().toLowerCase()

      // Validar formato básico de email
      const emailRegex = /^\S+@\S+\.\S+$/
      if (!emailRegex.test(data.email)) {
        throw new Error('Formato de email inválido')
      }

      // Validar duplicado
      const existing = await this.clientModel.findOne({ email: data.email })
      if (existing) {
        const err = new Error('El email ya está registrado')
        err.code = 11000
        err.keyPattern = { email: 1 }
        throw err
      }
    } else {
      // Si viene vacío o no definido, eliminamos del objeto para respetar el índice sparse
      delete data.email
    }

    data.date = this.getArgentinaTime()
    return await this.clientModel.create(data)
  }

  async update(id, data, config = { new: true }) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null
    return await this.clientModel.findByIdAndUpdate(id, data, config)
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null
    return await this.clientModel.findByIdAndDelete(id)
  }

  async findByEmail(email) {
    if (!email) return null
    return await this.clientModel.findOne({ email: email.trim().toLowerCase() })
  }

  async findLastClient() {
    const lastClient = await this.clientModel.findOne().sort({ customerNumber: -1 })
    return lastClient ? { ...lastClient.toObject(), createdAt: this.formatDate(lastClient.createdAt) } : null
  }

  async findByNameAndPhone(fullName, phone) {
    return await this.clientModel.findOne({
      fullName: fullName.trim(),
      phone: phone.trim()
    })
  }
}

const ClientManager = new ClientManagerDao()
export default ClientManager
