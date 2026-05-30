import express from 'express'
import { AccountController } from '../controller/accounts.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js';
import { accountSchema } from '../middleware/schemas/account.schema.js'
import { validate } from '../middleware/validate.js'

const router = express.Router();

// Buscar cuentas por usuario (para "Mi Perfil") solo trae las activas
router.get('/my/:userId', authMiddleware, AccountController.getByUser);
router.post('/', authMiddleware, validate(accountSchema.create), AccountController.create);
router.put('/:id/deactivate', authMiddleware, AccountController.softDelete);
router.get('/:id', authMiddleware, AccountController.getById);


// Solo para testear
// router.get('/', authMiddleware, isAdmin, AccountController.getAll);



export default router;