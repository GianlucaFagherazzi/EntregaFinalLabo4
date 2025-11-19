import express from 'express'
import { UserController } from '../controller/users.controller.js'
import { validate } from '../middleware/validate.js'
import { userSchema } from '../middleware/schemas/user.schema.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', validate(userSchema.create), UserController.create);
router.put('/:id', authMiddleware, validate(userSchema.update), UserController.update)
router.post('/login', validate(userSchema.login), UserController.login);
router.put('/:id/deactivate', UserController.softDelete);

export default router
