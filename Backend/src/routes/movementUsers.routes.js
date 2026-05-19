import express from 'express'
import { MovementUserController } from '../controller/movementUsers.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js';


const router = express.Router()

router.get('/', authMiddleware, MovementUserController.getAll);
router.get('/:id', authMiddleware, MovementUserController.getById);
router.post('/', authMiddleware, isAdmin , MovementUserController.create);

export default router