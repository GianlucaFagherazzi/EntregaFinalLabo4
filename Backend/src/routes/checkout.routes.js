import express from 'express'
import { CheckoutController } from '../controller/checkout.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { checkoutSchema } from '../middleware/schemas/checkout.schema.js'
import { validate } from '../middleware/validate.js'


const router = express.Router()

router.post( "/checkout", authMiddleware, validate(checkoutSchema.create), CheckoutController.checkout );

export default router