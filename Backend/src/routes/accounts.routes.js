import express from 'express'
import { AccountController } from '../controller/accounts.controller.js'

const router = express.Router();

router.get('/my/:userId', AccountController.getByUser);
router.post('/', AccountController.create);
router.get('/', AccountController.getAll);
router.get('/:id', AccountController.getById);
router.put('/:id', AccountController.update);
router.put('/:id/deactivate', AccountController.softDelete);

export default router;