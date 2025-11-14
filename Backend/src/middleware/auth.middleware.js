import jwt from 'jsonwebtoken'
import { AppError } from '../utils/app.error.js'

export const authMiddleware = (req, res, next) => {
  // Separar el token del encabezado Authorization y del Bearer
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return next(new AppError('No token provided', 401))
  }

  try {
    // Se verifica el token, si es válido se decodifica
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return next(new AppError('Token inválido', 401, error))
  }
}
