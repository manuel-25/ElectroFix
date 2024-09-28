import express from 'express'
import UserController from '../controllers/userController.js'
import authenticateJWT from '../middlewares/authenticateJWT.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'

const router = express.Router()

// Ruta para verificar el token (más específica)
router.get('/verifytoken', authenticateJWT, UserController.verifyToken)


// Rutas para gestionar usuarios (con parámetros dinámicos)
router.post('/', authenticateJWT, authenticateAdmin, UserController.createUser)  // Crear un nuevo usuario
router.post('/login', UserController.login)   // Iniciar sesión
router.post('/logout', authenticateJWT, UserController.logout)  // Cerrar sesión
router.get('/', authenticateJWT, authenticateAdmin, UserController.getUsers)  // Obtener todos los usuarios
router.get('/:email', authenticateJWT, authenticateAdmin, UserController.getUserByEmail)  // Obtener un usuario por Email
router.put('/:email', authenticateJWT, authenticateAdmin, UserController.updateUserByEmail)  // Actualizar un usuario por Email
router.delete('/:email', authenticateJWT, authenticateAdmin, UserController.deleteUserByEmail)  // Eliminar un usuario por Email

export default router
