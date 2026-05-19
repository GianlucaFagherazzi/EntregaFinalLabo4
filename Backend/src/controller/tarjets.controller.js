import { TarjetService } from '../services/tarjets.services.js';
import { Tarjet } from '../models/index.models.js';

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

  async getByAccount(req, res, next) {
    try {
      const accountId = Number(req.params.accountId);
      const tarjets = await TarjetService.getByAccount(accountId);

      res.json({ success: true, data: tarjets });
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

  async updateBalance(req, res, next) {
    try {
      const tarjetId = Number(req.params.id);
      const { amount } = req.body;

      const tarjet = await TarjetService.topUpBalance(tarjetId, amount);
      res.json({ success: true, message: "Saldo acreditado correctamente", data: tarjet });
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
  },

  async setDefault(req, res, next) {
    try {
      const tarjetId = Number(req.params.id);
      const { accountId } = req.body;
      const tarjet = await TarjetService.setDefault(tarjetId, accountId);
      res.json({ success: true, message: "Tarjeta establecida como predeterminada", data: tarjet });
    } catch (err) {
      next(err);
    }
  },

};
