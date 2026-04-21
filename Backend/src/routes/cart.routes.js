import express from 'express'
import { CartController } from '../controller/cart.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { cartSchema } from '../middleware/schemas/cart.schema.js'
import { validate } from '../middleware/validate.js'

const router = express.Router()

router.get('/', authMiddleware, CartController.getMyCart);
router.post('/items', authMiddleware, validate(cartSchema.addItem), CartController.addItemToCart);
router.delete('/items/:productId', authMiddleware, validate(cartSchema.removeItem), CartController.removeItemFromCart);
router.delete('/', authMiddleware, CartController.clearCart);

export default router