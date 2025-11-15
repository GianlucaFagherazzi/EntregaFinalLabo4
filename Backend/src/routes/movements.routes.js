import express from 'express'
import { MovementController } from '../controller/movements.controller.js'

const router = express.Router()

router.get('/', MovementController.getAll)
router.get('/:id', MovementController.getById)
router.post('/', MovementController.create)
router.put('/:id', MovementController.update)
router.delete('/:id', MovementController.delete)

export default router