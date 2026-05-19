import express from 'express'
import { SnapshotController } from '../controller/snapshots.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router()

router.get('/', authMiddleware, SnapshotController.getAll);
router.get('/:id', authMiddleware, SnapshotController.getById);
router.post('/', authMiddleware, isAdmin, SnapshotController.create);

export default router