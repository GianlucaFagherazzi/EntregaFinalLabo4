import express from 'express'
import { TarjetController } from '../controller/tarjets.controller.js'

const router = express.Router()

router.get('/', TarjetController.getAll)
router.get('/:id', TarjetController.getById)
router.post('/', TarjetController.create)
router.put('/:id', TarjetController.update)
router.delete('/:id', TarjetController.delete)

export default router