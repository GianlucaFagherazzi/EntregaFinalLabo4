import express from 'express'
import { ProductController } from '../controller/products.controller.js'
import { validate } from '../middleware/validate.js'
import { productSchema } from '../middleware/schemas/product.schema.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', validate(productSchema.get, "query"), ProductController.getAll)
router.get('/:id', ProductController.getById)
router.post('/', authMiddleware, validate(productSchema.create), ProductController.create)
router.put('/:id', authMiddleware, validate(productSchema.update), ProductController.update)
router.put('/:id/deactivate', authMiddleware, ProductController.softDelete);

export default router
