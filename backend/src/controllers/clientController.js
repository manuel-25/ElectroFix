import ClientManager from "../Mongo/ClientManager.js"

class ClientController {
  static async getClientByCustomerNumber(req, res) {
    try {
      const { customerNumber } = req.params
      if (!customerNumber) return res.status(400).json({ message: 'Debe proporcionar un número de cliente válido' })
      const client = await ClientManager.getByCustomerNumber(customerNumber)
      if (!client) return res.status(404).json({ message: 'Cliente no encontrado' })
      res.status(200).json(client)
    } catch (error) {
      console.error('Error al obtener cliente:', error)
      res.status(500).json({ message: 'Error interno al obtener el cliente', error: error.message })
    }
  }

  static async getAllClients(req, res) {
    try {
      const clients = await ClientManager.getAll()
      res.status(200).json(clients)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los clientes', error: error.message })
    }
  }

  static async getClientById(req, res) {
    try {
      const { id } = req.params
      const client = await ClientManager.getById(id)
      if (!client) return res.status(404).json({ message: 'Cliente no encontrado' })
      res.status(200).json(client)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el cliente', error: error.message })
    }
  }

  static async createClient(req, res) {
    try {
      const newClient = await ClientManager.create(req.body)
      res.status(201).json(newClient)
    } catch (error) {
      res.status(500).json({ message: 'Error al crear cliente', error: error.message })
    }
  }

  static async updateClient(req, res) {
    try {
      const { id } = req.params
      const updatedClient = await ClientManager.update(id, req.body, { new: true })
      res.status(200).json(updatedClient)
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar cliente', error: error.message })
    }
  }

  static async deleteClient(req, res) {
    try {
      const { id } = req.params
      await ClientManager.delete(id)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar cliente', error: error.message })
    }
  }
}

export default ClientController
