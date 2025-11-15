import express from 'express'
import { ProductController } from '../controller/products.controller.js'
import { validate } from '../middleware/validate.js'
import { productSchema } from '../middleware/schemas/product.schema.js'

const router = express.Router()

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getById)
router.post('/', validate(productSchema.create), ProductController.create)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)
router.delete('/permanent/:id', ProductController.deletePermanent)

export default router
