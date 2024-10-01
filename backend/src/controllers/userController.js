import UserManager from '../Mongo/UserManager.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const blacklist = []

class UserController {    // Crear un nuevo usuario
static async createUser(req, res) {
    try {
        const { email, password, role } = req.body
        // Validar que se reciban los campos necesarios
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
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
            role
        })

        res.status(201).json(newUser)
    } catch (error) {
            console.error('Error creating user:', error)
            res.status(400).json({ error: error.message })
        }
    }

    // Autenticación de usuario
    static async login(req, res) {
        try {
            const { email, password } = req.body

            // Validar que se reciban los campos necesarios
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' })
            }

            // Obtener el usuario por email
            const user = await UserManager.getByEmail(email)
            if (!user) {
                return res.status(400).json({ message: 'Email o contraseña incorrectos' })
            }

            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Email o contraseña incorrectos' })
            }

            // Generar el token JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

            // Configurar la cookie con HttpOnly y Secure
            res.cookie('authToken', token, {
                /*httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
                sameSite: 'Strict',*/
                maxAge: 24 * 60 * 60 * 1000
            })

            // Devolver una respuesta de éxito (sin incluir el token)
            res.status(200).json({ message: 'Login exitoso', user: { email: user.email }, token })
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
        }
    }

    //Logout
    static async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (token) {
                blacklist.push(token)
                return res.status(200).json({ message: 'Logout exitoso' })
            }
            res.status(400).json({ message: 'Token no proporcionado' })
        } catch (error) {
            console.error('Error al hacer logout:', error)
            res.status(500).json({ message: 'Error al hacer logout', error: error.message })
        }
    }

    // Obtener todos los usuarios
    static async getUsers(req, res) {
        try {
            const users = await UserManager.getAll()
            res.status(200).json(users)
        } catch (error) {
            console.error('Error fetching users:', error)
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
            console.error('Error fetching user:', error)
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
            console.error('Error updating user:', error)
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
            console.error('Error deleting user:', error)
            res.status(500).json({ error: 'Failed to delete user' })
        }
    }

    // Método para verificar el token
    static async verifyToken(req, res) {
        try {
            const user = await UserManager.getById(req.user.id)
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
            res.json({ message: 'Token es válido', user: { email: user.email } })
        } catch (error) {
            console.error('Error verifying token:', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

export default UserController
