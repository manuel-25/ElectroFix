import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.authToken
  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = {
      _id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
    next()
  })
}


export default authenticateJWT