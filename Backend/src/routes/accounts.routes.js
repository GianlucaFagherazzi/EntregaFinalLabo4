import express from 'express'
import { AccountaController } from '../controller/accounts.controller.js'

const router = express.Router()

router.get('/', AccountController.getAll)
router.get('/:id', AccountController.getById)
router.post('/', AccountController.create)
router.put('/:id', AccountController.update)
router.delete('/:id', AccountController.delete)

export default router