import express from 'express'
import accountRouter from './accounts.routes.js'
import categoryRouter from './category.routes.js'
import movementRouter from './movements.routes.js'
import snapshotRouter from './snapshots.routes.js'
import productRouter from './products.routes.js'
import tarjetRouter from './tarjets.routes.js'
import userRouter from './users.routes.js'
import cartRouter from './cart.routes.js'
import checkout from './checkout.routes.js'

const router = express.Router()

router.use('/accounts', accountRouter) //Listo
router.use('/categories', categoryRouter) //Listo
router.use('/movements', movementRouter) //Listo
router.use('/snapshots', snapshotRouter) //Listo
router.use('/products', productRouter) //Listo
router.use('/tarjets', tarjetRouter) //Listo, falta validar que el usuario que hace las peticiones, sea el dueño de la cuenta a la que pertenece la tarjeta
router.use('/users', userRouter) //Listo
router.use('/cart', cartRouter) //Listo
router.use('/checkout', checkout) //Listo

export default router