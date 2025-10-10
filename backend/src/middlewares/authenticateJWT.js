import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.authToken
  console.log('[AUTH MIDDLEWARE] Token recibido en cookie]', token)

  if (!token) {
    console.log('[AUTH MIDDLEWARE] No hay token]')
    return res.sendStatus(401)
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('[AUTH MIDDLEWARE] Token inválido o expirado]', err.message)
      return res.sendStatus(403)
    }
    console.log('[AUTH MIDDLEWARE] Token válido decoded]', decoded)

    req.user = {
      _id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
    next()
  })
}


export default authenticateJWT