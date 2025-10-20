import express from 'express'
import QuoteController from '../controllers/quoteController.js'
import ServiceRequestController from '../controllers/serviceRequestController.js'

const router = express.Router()

// Crear una nueva cotización (usa ServiceRequestController)
router.post('/', ServiceRequestController.createServiceRequest)

// Contar cotizaciones pendientes (para notificaciones)
router.get('/count/pending', QuoteController.getPendingCount)

// Obtener todas las cotizaciones (con o sin filtro)
router.get('/', QuoteController.getQuotes)

// Obtener una cotización por número
router.get('/:serviceRequestNumber', QuoteController.getQuoteByServiceRequestNumber)

// Actualizar cotización (estado o datos)
router.put('/:serviceRequestNumber', QuoteController.update)

// Eliminar cotización (soft delete)
router.delete('/:serviceRequestNumber', QuoteController.deleteQuote)

export default router
