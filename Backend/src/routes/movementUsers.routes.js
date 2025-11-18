import express from 'express'
import { MovementUserController } from '../controller/movementUsers.controller.js'

const router = express.Router()

router.get('/', MovementUserController.getAll);
router.get('/:id', MovementUserController.getById);
router.post('/', MovementUserController.create);

export default router