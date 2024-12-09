import express from 'express'
import ClientController from '../controllers/clientController.js'

const router = express.Router()

// Ruta para obtener cliente por customerNumber
router.get('/:customerNumber', ClientController.getClientByCustomerNumber)

export default router
