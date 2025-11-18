import { SnapshotService } from '../services/snapshot.services.js';

export const SnapshotController = {
  async getAll(req, res, next) {
    try {
      const snapshots = await SnapshotService.getAll();
      res.json({ success: true, data: snapshots });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const snapshot = await SnapshotService.getById(Number(req.params.id));
      res.json({ success: true, data: snapshot });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const newSnapshot = await SnapshotService.create(req.body);
      res.status(201).json({ success: true, data: newSnapshot });
    } catch (err) {
      next(err);
    }
  }
};
