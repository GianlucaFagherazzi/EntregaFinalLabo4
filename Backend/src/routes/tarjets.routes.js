import express from 'express'
import { TarjetController } from '../controller/tarjets.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { tarjetSchema } from '../middleware/schemas/tarjet.schema.js'
import { validate} from '../middleware/validate.js'


const router = express.Router();

router.get('/account/:accountId', authMiddleware, TarjetController.getByAccount);
router.put('/balance/:id', authMiddleware, TarjetController.updateBalance);
router.put('/:id/deactivate', authMiddleware, TarjetController.softDelete);
router.get('/:id', authMiddleware, TarjetController.getById);
router.post('/', authMiddleware, validate(tarjetSchema.create), TarjetController.create);

// Ruta para testing
// router.get('/', TarjetController.getAll);
// router.put('/:id', authMiddleware, validate(tarjetSchema.update), TarjetController.update);


export default router;
