import express from 'express'
import { MovementController } from '../controller/movements.controller.js'
import { movementSchema } from '../middleware/schemas/movement.schema.js'
import { validate } from '../middleware/validate.js'

const router = express.Router()

router.get('/', MovementController.getAll);
router.get('/:id', MovementController.getById);
router.post('/', validate(movementSchema.create), MovementController.create);

export default router