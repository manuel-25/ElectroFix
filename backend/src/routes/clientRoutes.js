import express from 'express'
import ClientController from '../controllers/clientController.js'

const router = express.Router()

// Obtener todos los clientes
router.get('/', ClientController.getAllClients)

// Obtener cliente por ID
router.get('/id/:id', ClientController.getClientById)

// Obtener cliente por número de cliente
router.get('/by-customer/:customerNumber', ClientController.getClientByCustomerNumber)

// Crear cliente
router.post('/', ClientController.createClient)

// Actualizar cliente
router.put('/:id', ClientController.updateClient)

// Eliminar cliente
router.delete('/:id', ClientController.deleteClient)

export default router
