import UserManager from '../Mongo/UserManager.js'
import bcrypt from 'bcrypt'

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
}

export default UserController
