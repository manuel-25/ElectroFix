import ClientManager from "../Mongo/ClientManager.js"

class ClientController {
    // Obtener cliente por su customerNumber
    static async getClientByCustomerNumber(req, res) {
        try {
            const { customerNumber } = req.params  // Obtener el customerNumber de los parámetros de la URL

            const client = await ClientManager.getByCustomerNumber(customerNumber)
            if (!client) {
                return res.status(404).json({ message: 'Cliente no encontrado' })
            }

            res.status(200).json(client)
        } catch (error) {
            console.error('Error al obtener cliente:', error)
            res.status(500).json({ message: 'Error al obtener cliente', error: error.message })
        }
    }
}

export default ClientController
