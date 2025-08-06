import express from 'express'
import ServiceController from '../controllers/serviceController.js'

const router = express.Router()

router.get('/', ServiceController.getAllServices)
router.get('/id/:id', ServiceController.getServiceById)
router.get('/code/:code', ServiceController.getServiceByCode)
router.get('/by-customer/:customerNumber', ServiceController.getServicesByCustomerNumber)
router.get('/by-quote/:quoteReference', ServiceController.getServicesByQuoteReference)
router.get('/last-code/:branch', ServiceController.getLastCode)
router.post('/', ServiceController.createService)
router.put('/:id', ServiceController.updateServiceById)
router.put('/code/:code', ServiceController.updateServiceByCode)
router.delete('/:id', ServiceController.deleteService)
router.patch('/soft-delete/:code', ServiceController.softDeleteByCode)

export default router
