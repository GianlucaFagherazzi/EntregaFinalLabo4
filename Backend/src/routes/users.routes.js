import express from 'express'
import { UserController } from '../controller/users.controller.js'
import { validate } from '../middleware/validate.js'
import { userSchema } from '../middleware/schemas/user.schema.js'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.post('/', validate(userSchema.create), UserController.createUser)
router.delete('/:id', UserController.deleteUser)
/* */
export default router
