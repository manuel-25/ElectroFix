import UserManager from '../Mongo/UserManager.js'
import bcrypt from 'bcrypt'
import config from '../utils/config.js'
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js'

const blacklist = []

class UserController {    // Crear un nuevo usuario
static async createUser(req, res) {
    try {
        const { email, password, role, firstName, lastName, branch } = req.body
        // Validar que se reciban los campos necesarios
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'First and Lastname are required' })
        }
        
        const userExists = await UserManager.getByEmail(email)
        if(userExists) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await UserManager.create({
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            branch
        })

        res.status(201).json(newUser)
    } catch (error) {
            logger.error('Error creating user:', error)
            res.status(400).json({ error: error.message })
        }
}

    // Autenticación de usuario
    static async login(req, res) {
    try {
        const { email, password, remember = true } = req.body

        if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña requeridos' })
        }

        const user = await UserManager.getByEmail(email)
        if (!user) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' })
        }

        // Opcional: registrar login exitoso
        user.lastLoginAt = new Date()
        user.loginCount = (user.loginCount || 0) + 1
        await user.save()

        // 🔐 Generar token JWT
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWT_SECRET, { expiresIn: '4h' })        //10s para pruebas o 4h

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: remember ? 4*60*60*1000 : undefined              // 4*60*60*1000 : undefined
        })

        res.status(200).json({
            message: 'Login exitoso',
            user: {
            email: user.email,
            role: user.role,
            branch: user.branch
            }
        })
    } catch (error) {
        logger.error('Error al iniciar sesión:', error)
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
    }
    }

    //Logout
    static async logout(req, res) {
        try {
            res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
            })

            return res.status(200).json({ message: 'Logout exitoso' })
        } catch (error) {
            logger.error('Error al hacer logout:', error)
            res.status(500).json({ message: 'Error al hacer logout', error: error.message })
        }
    }

    // Obtener todos los usuarios
    static async getUsers(req, res) {
        try {
            const users = await UserManager.getAll()
            res.status(200).json(users)
        } catch (error) {
            logger.error('Error fetching users:', error)
            res.status(500).json({ error: 'Failed to fetch users' })
        }
    }

    // Obtener un usuario por Email
    static async getUserByEmail(req, res) {
        try {
            const { email } = req.params
            const user = await UserManager.getByEmail(email)
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
            res.status(200).json(user)
        } catch (error) {
            logger.error('Error fetching user:', error)
            res.status(500).json({ error: 'Failed to fetch user' })
        }
    }

    // Actualizar un usuario por Email
    static async updateUserByEmail(req, res) {
        const { email } = req.params
        const updateData = req.body

        try {
            // Si la contraseña está presente, hacer un hash
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10)
            }

            const updatedUser = await UserManager.updateByEmail(email, updateData, { new: true })
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' })
            }

            res.status(200).json(updatedUser)
        } catch (error) {
            logger.error('Error updating user:', error)
            res.status(500).json({ message: 'Error updating user' })
        }
    }

    // Eliminar un usuario por Email
    static async deleteUserByEmail(req, res) {
        try {
            const { email } = req.params
            const deletedUser = await UserManager.deleteByEmail(email)
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found or not deleted' })
            }
            res.status(200).json({ message: 'User deleted successfully' })
        } catch (error) {
            logger.error('Error deleting user:', error)
            res.status(500).json({ error: 'Failed to delete user' })
        }
    }

    // Método para verificar el token
    static async verifyToken(req, res) {
        try {
            if (!req.user?._id) return res.status(401).json({ error: 'No autorizado' })

            const user = await UserManager.getById(req.user._id)
            if (!user) return res.status(404).json({ error: 'User not found' })

            res.status(200).json({
                user: {
                    email: user.email,
                    role: user.role,
                    branch: user.branch
                }
            })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    // Obtener perfil completo del usuario autenticado
    static async getProfile(req, res) {
        try {
            if (!req.user?._id) return res.status(401).json({ error: 'No autorizado' })

            const user = await UserManager.getById(req.user._id)
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

            const { password, ...userData } = user.toObject()
            res.status(200).json(userData)
        } catch (error) {
            logger.error('Error al obtener perfil del usuario:', error)
            res.status(500).json({ error: 'Error al obtener perfil del usuario' })
        }
    }
}

export default UserController
