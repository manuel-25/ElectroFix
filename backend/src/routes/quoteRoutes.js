import express from 'express'
import QuoteController from '../controllers/quoteController.js'


const router = express.Router()

// Crear una nueva cotización
router.post('/', QuoteController.createQuote)

// Obtener todas las cotizaciones
router.get('/', QuoteController.getQuotes)

// Obtener una cotización por número de solicitud
router.get('/:serviceRequestNumber', QuoteController.getQuoteByServiceRequestNumber)

// Actualizar una cotización por número de solicitud
router.put('/:serviceRequestNumber', QuoteController.update)

// Eliminar una cotización por número de solicitud
router.delete('/:serviceRequestNumber', QuoteController.deleteQuote)

export default router
