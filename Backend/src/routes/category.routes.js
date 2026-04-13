import express from 'express'
import { CategoryController } from '../controller/categories.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js'
import { validate } from '../middleware/validate.js'
import { categorySchema } from '../middleware/schemas/category.schema.js'

const router = express.Router()

router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getById)
router.post('/', authMiddleware, isAdmin, validate(categorySchema.create), CategoryController.create)
router.put('/:id', authMiddleware, isAdmin, validate(categorySchema.update), CategoryController.update)
router.delete('/:id', authMiddleware, isAdmin, CategoryController.delete)

export default router