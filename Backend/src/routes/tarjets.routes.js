import express from 'express'
import { TarjetController } from '../controller/tarjets.controller.js'

const router = express.Router();

router.get('/account/:accountId', TarjetController.getByAccount);
router.put('/balance/:id', TarjetController.updateBalance);
router.put('/:id/deactivate', TarjetController.softDelete);
router.get('/', TarjetController.getAll);
router.get('/:id', TarjetController.getById);
router.post('/', TarjetController.create);
router.put('/:id', TarjetController.update);

export default router;
