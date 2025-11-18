import express from 'express'
import { SnapshotController } from '../controller/snapshots.controller.js'

const router = express.Router()

router.get('/', SnapshotController.getAll);
router.get('/:id', SnapshotController.getById);
router.post('/', SnapshotController.create);

export default router