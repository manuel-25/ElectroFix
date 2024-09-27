import jwt from 'jsonwebtoken'
import config from '../utils/config.js'


const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    } else {
        res.sendStatus(401) // Unauthorized
    }
}

export default authenticateJWT
