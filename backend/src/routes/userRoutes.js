// ./routes/userRoutes.js
import express from 'express'
import UserController from '../controllers/userController.js'
import authenticateJWT from '../middlewares/authenticateJWT.js'

const router = express.Router()

// Ruta para verificar el token (más específica)
router.get('/verifytoken', authenticateJWT, UserController.verifyToken)


// Rutas para gestionar usuarios (con parámetros dinámicos)
router.post('/', UserController.createUser)  // Crear un nuevo usuario
router.post('/login', UserController.login)   // Iniciar sesión
router.post('/logout', UserController.logout)  // Cerrar sesión
router.get('/', UserController.getUsers)  // Obtener todos los usuarios
router.get('/:email', UserController.getUserByEmail)  // Obtener un usuario por Email
router.put('/:email', UserController.updateUserByEmail)  // Actualizar un usuario por Email
router.delete('/:email', UserController.deleteUserByEmail)  // Eliminar un usuario por Email

export default router
