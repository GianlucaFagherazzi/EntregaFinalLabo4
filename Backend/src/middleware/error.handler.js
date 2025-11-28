// El error que recibe puede ser una instancia de AppError para errores personalizados.
export function errorHandler(err, req, res, _next) {
  const timestamp = new Date().toISOString()

  // Extraer datos del error
  const statusCode = err.statusCode || 500
  const message = err.message || 'Error interno del servidor'

  // Log detallado solo para consola
  console.error(`\n=== ERROR ${timestamp} ===`)
  console.error(`Mensaje: ${message}`)
  console.error(`Status: ${statusCode}`)
  if (err.originalError) {
    console.error(`Original:`, err.originalError)
  }
  console.error(`Stack:\n${err.stack}`)
  console.error(`=========================\n`)

  // Respuesta hacia el cliente
  res.status(statusCode).json({
    success: false,
    error: message
  })
}
