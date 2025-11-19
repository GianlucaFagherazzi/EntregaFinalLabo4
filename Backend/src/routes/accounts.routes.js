import express from 'express'
import { AccountController } from '../controller/accounts.controller.js'

const router = express.Router();

router.get('/', AccountController.getAll);
router.get('/:id', AccountController.getById);
router.post('/', AccountController.create);
router.put('/:id', AccountController.update);
router.put('/:id/deactivate', AccountController.softDelete);

export default router;