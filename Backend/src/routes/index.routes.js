import express from 'express'
import userRouter from './users.routes.js'
import productRouter from './products.routes.js'

const router = express.Router()

// Registrar todas las rutas principales
router.use('/users', userRouter)
router.use('/products', productRouter)
// router.use('/accounts', )
// router.use('/categories', )
// router.use('/movements', )
// router.use('/tarjets',)

export default router