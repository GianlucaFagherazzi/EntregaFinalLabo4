import express from 'express'
import { UserController } from '../controller/users.controller.js'
import { validate } from '../middleware/validate.js'
import { userSchema } from '../middleware/schemas/user.schema.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.post('/', validate(userSchema.create), UserController.createUser)
router.post('/login', validate(userSchema.login), UserController.loginUser)
router.delete('/:id', UserController.deleteUser)

export default router
