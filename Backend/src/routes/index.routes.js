import express from 'express'
import userRouter from './users.routes.js'
import productRouter from './products.routes.js'

const router = express.Router()

// Registrar todas las rutas principales
router.use('/users', userRouter)
router.use('/products', productRouter)

export default router