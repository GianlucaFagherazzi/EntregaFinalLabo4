import express from 'express'
import { CategoryController } from '../controller/categories.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js'
import { validate } from '../middleware/validate.js'
import { categorySchema } from '../middleware/schemas/category.schema.js'

const router = express.Router()

router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getById)
router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

export default router