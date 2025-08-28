import express from 'express'
import ServiceController from '../controllers/serviceController.js'
import authenticateJWT from '../middlewares/authenticateJWT.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const router = express.Router()

router.get('/', authenticateJWT, ServiceController.getAllServices)
router.get('/id/:id', authenticateJWT, ServiceController.getServiceById)
router.get('/code/:code', authenticateJWT, ServiceController.getServiceByCode)
router.get('/by-customer/:customerNumber', authenticateJWT, ServiceController.getServicesByCustomerNumber)
router.get('/by-quote/:quoteReference', authenticateJWT, ServiceController.getServicesByQuoteReference)
router.get('/last-code/:prefix', authenticateJWT, ServiceController.getLastCode)
router.post('/', authenticateJWT, ServiceController.createService)
router.put('/:id', authenticateJWT, ServiceController.updateServiceById)
router.put('/code/:code', authenticateJWT, ServiceController.updateServiceByCode)
// Ruta para actualizar el estado e historial
router.put('/:id/status', authenticateJWT, ServiceController.updateServiceStatus)
//router.delete('/:id', authenticateJWT, authenticateAdmin, ServiceController.deleteService)
router.patch('/soft-delete/:code', authenticateJWT, authenticateAdmin, ServiceController.softDeleteByCode)

export default router
