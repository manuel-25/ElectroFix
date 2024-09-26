import QuoteManager from "../Mongo/QuoteManager.js"
import NumberGenerator from "../services/numberGenerator.js"

class QuoteController {
    // Crear una nueva cotización
    static async createQuote(req, res) {
        try {
            // Generar un número de cotización único y de cliente
            const serviceRequestNumber = await NumberGenerator.generateServiceRequestNumber()
            const customerNumber = await NumberGenerator.generateCustomerNumber()

            // Asignar los numeros
            req.body.serviceRequestNumber = serviceRequestNumber
            req.body.customerNumber = customerNumber

            // Crear la nueva cotización con el número de cotización generado
            const newQuote = await QuoteManager.create(req.body)

            // Enviar la respuesta con el nuevo objeto de cotización
            res.status(201).json(newQuote)
        } catch (error) {
            console.error('Error creating quote:', error)
            res.status(400).json({ error: error.message })
        }
    }

    // Obtener todas las cotizaciones
    static async getQuotes(req, res) {
        try {
            const quotes = await QuoteManager.getAll()
            res.status(200).json(quotes)
        } catch (error) {
            console.error('Error fetching quotes:', error)
            res.status(500).json({ error: 'Failed to fetch quotes' })
        }
    }

    // Obtener una cotización por número de solicitud
    static async getQuoteByServiceRequestNumber(req, res) {
        try {
            const { serviceRequestNumber } = req.params
            const quote = await QuoteManager.getByServiceRequestNumber(serviceRequestNumber)
            if (!quote) {
                return res.status(404).json({ error: 'Quote not found' })
            }
            res.status(200).json(quote)
        } catch (error) {
            console.error('Error fetching quote:', error)
            res.status(500).json({ error: 'Failed to fetch quote' })
        }
    }

    // Actualizar una cotización (solo el estado o detalles importantes)
    static async update(req, res) {
        const { serviceRequestNumber } = req.params
        const updateData = req.body

        try {
            const updatedQuote = await QuoteManager.updateByServiceRequestNumber(serviceRequestNumber, updateData, { new: true })
            
            if (!updatedQuote) {
                return res.status(404).json({ message: 'Cotización no encontrada' })
            }

            res.status(200).json(updatedQuote)
        } catch (error) {
            console.error('Error updating quote in database:', error)
            res.status(500).json({ message: 'Error al actualizar la cotización' })
        }
    }

    // Eliminar una cotización
    static async deleteQuote(req, res) {
        try {
            const { serviceRequestNumber } = req.params
            const deletedQuote = await QuoteManager.delete(serviceRequestNumber)
            if (!deletedQuote) {
                return res.status(404).json({ error: 'Quote not found or not deleted' })
            }
            res.status(200).json({ message: 'Quote deleted successfully' })
        } catch (error) {
            console.error('Error deleting quote:', error)
            res.status(500).json({ error: 'Failed to delete quote' })
        }
    }
}

export default QuoteController
