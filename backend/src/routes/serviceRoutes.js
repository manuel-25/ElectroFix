import express from 'express'
import ServiceController from '../controllers/serviceController.js'
import authenticateJWT from '../middlewares/authenticateJWT.js'


const router = express.Router()

router.get('/', ServiceController.getAllServices)
router.get('/id/:id', ServiceController.getServiceById)
router.get('/code/:code', ServiceController.getServiceByCode)
router.get('/by-customer/:customerNumber', ServiceController.getServicesByCustomerNumber)
router.get('/by-quote/:quoteReference', ServiceController.getServicesByQuoteReference)
router.get('/last-code/:branch', ServiceController.getLastCode)
router.post('/', authenticateJWT, ServiceController.createService)
router.put('/:id', ServiceController.updateServiceById)
router.put('/code/:code', ServiceController.updateServiceByCode)
// Ruta para actualizar el estado e historial
router.put('/:id/status', authenticateJWT, ServiceController.updateServiceStatus)
router.delete('/:id', ServiceController.deleteService)
router.patch('/soft-delete/:code', ServiceController.softDeleteByCode)

export default router
