import express from 'express'
import { MovementController } from '../controller/movements.controller.js'
import { movementSchema } from '../middleware/schemas/movement.schema.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.js'
import { isAdmin } from '../middleware/admin.middleware.js'

const router = express.Router()

router.get('/',authMiddleware , isAdmin, MovementController.getAll);
router.get('/:id', authMiddleware, MovementController.getById);

// Solo para testeo, en producción el checkout se encarga de crear los movimientos
// router.post('/', authMiddleware, isAdmin, validate(movementSchema.create), MovementController.create);

export default router