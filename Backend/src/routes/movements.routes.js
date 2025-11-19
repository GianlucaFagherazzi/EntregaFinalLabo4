import express from 'express'
import { MovementController } from '../controller/movements.controller.js'

const router = express.Router()

router.get('/', MovementController.getAll);
router.get('/:id', MovementController.getById);
router.post('/', MovementController.create);

export default router