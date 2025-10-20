import QuoteManager from "../Mongo/QuoteManager.js"
import NumberGenerator from "../services/numberGenerator.js"
import { logger } from "../utils/logger.js"

class QuoteController {
    // Obtener todas las cotizaciones con paginación
    static async getQuotes(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query // Paginación
            const quotes = await QuoteManager.getAll({ page, limit })
            
            if (!quotes || quotes.length === 0) {
                return res.status(404).json({ message: 'No quotes found' })
            }
            
            res.status(200).json(quotes)
        } catch (error) {
            logger.error('Error fetching quotes:', error)
            res.status(500).json({ error: 'Failed to fetch quotes: ' + error.message })
        }
    }

    // Contar cotizaciones pendientes
    static async getPendingCount(req, res) {
    try {
        // Contamos solo las que no están eliminadas y tienen estado "Pendiente" o "En revisión"
        const count = await QuoteManager.countPending()
        res.status(200).json({ count })
    } catch (error) {
        console.error('Error al contar cotizaciones pendientes:', error)
        res.status(500).json({ error: 'Error interno al contar cotizaciones pendientes' })
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
            logger.error('Error fetching quote:', error)
            res.status(500).json({ error: 'Failed to fetch quote: ' + error.message })
        }
    }

    // Actualizar una cotización (solo el estado o detalles importantes)
    static async update(req, res) {
        const { serviceRequestNumber } = req.params
        const updateData = req.body

        try {
            // Aquí podrías validar qué campos son permitidos para la actualización
            const updatedQuote = await QuoteManager.updateByServiceRequestNumber(serviceRequestNumber, updateData, { new: true })

            if (!updatedQuote) {
                return res.status(404).json({ message: 'Cotización no encontrada' })
            }

            res.status(200).json(updatedQuote)
        } catch (error) {
            logger.error('Error updating quote in database:', error)
            res.status(500).json({ message: 'Error al actualizar la cotización: ' + error.message })
        }
    }

    // Eliminar una cotización (soft delete)
    static async deleteQuote(req, res) {
        try {
            const { serviceRequestNumber } = req.params
            const deletedQuote = await QuoteManager.softDelete(serviceRequestNumber) // Cambiado a soft delete
            if (!deletedQuote) {
                return res.status(404).json({ error: 'Quote not found or not deleted' })
            }
            res.status(200).json({ message: 'Quote deleted successfully' })
        } catch (error) {
            logger.error('Error deleting quote:', error)
            res.status(500).json({ error: 'Failed to delete quote: ' + error.message })
        }
    }
}

export default QuoteController
