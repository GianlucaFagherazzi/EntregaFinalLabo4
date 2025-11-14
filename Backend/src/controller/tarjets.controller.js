import { TarjetService } from '../services/tarjets.services.js';

export const TarjetController = {
  async getAll(req, res) {
    try {
      const tarjets = await TarjetService.getAll()
      res.json(tarjets)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getById(req, res) {
    try {
      const tarjet = await TarjetService.getById(req.params.id)
      if (!tarjet) return res.status(404).json({ error: 'tarjeta no encontrada' })
      res.json(tarjet)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const newtarjet = await TarjetService.create(req.body)
      res.status(201).json(newtarjet)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const updated = await TarjetService.update(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async delete(req, res) {
    try {
      await TarjetService.delete(req.params.id)
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}