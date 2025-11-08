import express from 'express'
import { UserController } from '../controller/users.controller.js'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.post('/', UserController.createUser)
router.delete('/:id', UserController.deleteUser)

export default router
