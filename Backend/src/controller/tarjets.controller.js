import { TarjetService } from '../services/tarjets.services.js';

export const TarjetController = {
  async getAll(req, res, next) {
    try {
      const tarjets = await TarjetService.getAll();
      res.json({ success: true, data: tarjets });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const tarjet = await TarjetService.getById(Number(req.params.id));
      res.json({ success: true, data: tarjet });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const newTarjet = await TarjetService.create(req.body);
      res.status(201).json({ success: true, data: newTarjet });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const updated = await TarjetService.update(Number(req.params.id), req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  async softDelete(req, res, next) {
    try {
      await TarjetService.softDelete(Number(req.params.id));
      res.json({ success: true, message: 'Tarjeta desactivada' });
    } catch (err) {
      next(err);
    }
  }
};
