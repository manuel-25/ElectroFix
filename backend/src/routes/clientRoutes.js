import express from 'express'
import ClientController from '../controllers/clientController.js'
import authenticateJWT from '../middlewares/authenticateJWT.js'

const router = express.Router()

// Obtener todos los clientes
router.get('/', authenticateJWT, ClientController.getAllClients)

// Obtener cliente por ID
router.get('/id/:id', authenticateJWT, ClientController.getClientById)

// Obtener cliente por número de cliente
router.get('/by-customer/:customerNumber', authenticateJWT, ClientController.getClientByCustomerNumber)

// Crear cliente
router.post('/', authenticateJWT, ClientController.createClient)

//Obtener ultimo numero de cliente
router.get('/last-number', authenticateJWT, ClientController.getLastCustomerNumber)

// Actualizar cliente
router.put('/:id', authenticateJWT, ClientController.updateClient)

// Eliminar cliente
router.delete('/:id', authenticateJWT, ClientController.deleteClient)

export default router
