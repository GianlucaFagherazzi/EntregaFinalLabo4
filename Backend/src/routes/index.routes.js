import express from 'express'
import accountRouter from './accounts.routes.js'
import categoryRouter from './category.routes.js'
import movementRouter from './movements.routes.js'
import movementUserRouter from './movementsUser.routes.js'
import productRouter from './products.routes.js'
import snapshoRouter from './snapshots.routes.js'
import tarjetRouter from './tarjets.routes.js'
import userRouter from './users.routes.js'

const router = express.Router()

// Registrar todas las rutas principales
router.use('/accounts', accountRouter)
router.use('/categories', categoryRouter)
router.use('/movements', movementRouter)
router.use('/movementsUser', movementUserRouter)
router.use('/products', productRouter)
router.use('/snapshots', snapshoRouter)
router.use('/tarjets', tarjetRouter)
router.use('/users', userRouter)

export default router