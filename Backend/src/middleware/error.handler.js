/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}]`, err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Error interno del servidor'

  res.status(statusCode).json({
    success: false,
    error: message
  })
}
/* eslint-enable no-unused-vars */
