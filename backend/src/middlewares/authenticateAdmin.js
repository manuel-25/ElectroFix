import UserManager from "../Mongo/UserManager.js"
import { logger } from "../utils/logger.js"

const authenticateAdmin = async (req, res, next) => {
    try {
        const userId = req.user._id
        const user = await UserManager.getById(userId)
        if (!user) {
            logger.error('AuthenticateAdmin: Access denied, user not found. Someone tried to log in.')
            return res.status(403).json({ error: 'Access denied, user not found.' })
        }

        if (user.role != "admin") {
            logger.error('AuthenticateAdmin: Access denied, insufficient permissions. Someone tried to log in.', user.email)
            return res.status(403).json({ error: 'Access denied, insufficient permissions.' })
        }

        next()
    } catch (error) {
        logger.error('Error in authenticateAdmin middleware:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default authenticateAdmin
