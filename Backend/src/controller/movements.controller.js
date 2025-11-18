import { MovementService } from '../services/movements.service.js';

export const MovementController = {
  async getAll(req, res, next) {
    try {
      const movements = await MovementService.getAll();
      res.json({ success: true, data: movements });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const movement = await MovementService.getById(Number(req.params.id));
      res.json({ success: true, data: movement });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const newMovement = await MovementService.create(req.body);
      res.status(201).json({ success: true, data: newMovement });
    } catch (err) {
      next(err);
    }
  },
};
