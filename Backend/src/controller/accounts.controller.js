import { AccountService } from '../services/accounts.services.js';

export const AccountController = {
  async getAll(req, res, next) {
    try {
      const accounts = await AccountService.getAll();
      res.json({ success: true, data: accounts });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const account = await AccountService.getById(Number(req.params.id));
      res.json({ success: true, data: account });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const newAccount = await AccountService.create(req.body);
      res.status(201).json({ success: true, data: newAccount });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const updated = await AccountService.update(Number(req.params.id), req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  async softDelete(req, res, next) {
    try {
      await AccountService.softDelete(Number(req.params.id));
      res.json({ success: true, message: 'Cuenta desactivada' });
    } catch (err) {
      next(err);
    }
  },

  async getByUser(req, res, next) {
    try {
      const userId = Number(req.params.userId);
      const accounts = await AccountService.getByUser(userId);
      res.json({ success: true, data: accounts });
    } catch (err) {
      next(err);
    }
  }

};
