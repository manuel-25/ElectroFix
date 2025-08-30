import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }

    // Normalizo a ObjectId como _id
    req.user = {
      _id: decoded.id || decoded._id,
      email: decoded.email,
      role: decoded.role
    }
    next()
  })
  } else {
    res.sendStatus(401)
  }
}

export default authenticateJWT
