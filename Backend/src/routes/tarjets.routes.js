import express from 'express'
import { TarjetController } from '../controller/tarjets.controller.js'

const router = express.Router();

router.get('/', TarjetController.getAll);
router.get('/:id', TarjetController.getById);
router.post('/', TarjetController.create);
router.put('/:id', TarjetController.update);
router.put('/:id/deactivate', TarjetController.softDelete);

export default router