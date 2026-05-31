import express from 'express'
import { SnapshotController } from '../controller/snapshots.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router()

router.get('/', authMiddleware, isAdmin, SnapshotController.getAll);

router.get("/my-purchases", authMiddleware, SnapshotController.getMyPurchases);
router.get("/my-sales", authMiddleware, SnapshotController.getMySales);

// Solo para testeos
// las snapshots se crean automáticamente al realizar una compra, no deberían crearse manualmente
// router.post('/', authMiddleware, isAdmin, SnapshotController.create);

// No es necesario obtener snapshots por ID, ya que se pueden obtener las compras/ventas del usuario autenticado
// router.get('/:id', authMiddleware, SnapshotController.getById);

export default router