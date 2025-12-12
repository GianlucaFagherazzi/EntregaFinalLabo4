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

  async updateBalance(req, res) {
    try {
      const { id } = req.params;
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Monto inválido" });
      }

      const tarjet = await Tarjet.findByPk(id);

      if (!tarjet) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }

      tarjet.balance = Number(tarjet.balance) + Number(amount);
      await tarjet.save();

      res.json({
        message: "Saldo acreditado correctamente",
        data: tarjet
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
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
