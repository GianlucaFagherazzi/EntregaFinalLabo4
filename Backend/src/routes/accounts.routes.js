import express from 'express'
import { AccountController } from '../controller/accounts.controller.js'

const router = express.Router();

// rutas específicas
router.get('/my/:userId', AccountController.getByUser);
router.post('/', AccountController.create);

// rutas generales
router.get('/', AccountController.getAll);
router.get('/:id', AccountController.getById);
router.put('/:id', AccountController.update);
router.put('/:id/deactivate', AccountController.softDelete);

export default router;