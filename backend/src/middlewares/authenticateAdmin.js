import UserManager from "../Mongo/UserManager.js"

const authenticateAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id
        const user = await UserManager.getById(userId)

        if (!user) {
            return res.status(403).json({ error: 'Access denied, user not found.' })
        }

        if (user.role != "admin") {
            return res.status(403).json({ error: 'Access denied, insufficient permissions.' })
        }

        next()
    } catch (error) {
        console.error('Error in authenticateAdmin middleware:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default authenticateAdmin
