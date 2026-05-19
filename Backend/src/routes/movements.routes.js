import express from 'express'
import { MovementController } from '../controller/movements.controller.js'
import { movementSchema } from '../middleware/schemas/movement.schema.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.js'
import { isAdmin } from '../middleware/admin.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, MovementController.getAll);
router.get('/:id', authMiddleware, MovementController.getById);
router.post('/', authMiddleware, validate(movementSchema.create), MovementController.create);

export default router