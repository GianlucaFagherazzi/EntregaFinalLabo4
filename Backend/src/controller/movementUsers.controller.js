import { MovementUserService } from '../services/movementUser.service.js';

export const MovementUserController = {
  async getAll(req, res, next) {
    try {
      const movementUsers = await MovementUserService.getAll();
      res.json({ success: true, data: movementUsers });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const movementUser = await MovementUserService.getById(Number(req.params.id));
      res.json({ success: true, data: movementUser });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const newMovementUser = await MovementUserService.create(req.body);
      res.status(201).json({ success: true, data: newMovementUser });
    } catch (err) {
      next(err);
    }
  }
};
