import express from 'express'
import UserController from '../controllers/userController.js'

const router = express.Router()

// Crear un nuevo usuario
router.post('/', UserController.createUser)

// Iniciar sesión
router.post('/login', UserController.login) // Nueva ruta para la autenticación

// Obtener todos los usuarios
router.get('/', UserController.getUsers)

// Obtener un usuario por Email
router.get('/:email', UserController.getUserByEmail)

// Actualizar un usuario por Email
router.put('/:email', UserController.updateUserByEmail)

// Eliminar un usuario por Email
router.delete('/:email', UserController.deleteUserByEmail)

export default router
