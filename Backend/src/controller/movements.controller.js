import { MovementService } from '../services/movements.services.js';

export const MovementController = {
  async getAll(req, res) {
    try {
      const movements = await MovementService.getAll()
      res.json(movements)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getById(req, res) {
    try {
      const movement = await MovementService.getById(req.params.id)
      if (!movement) return res.status(404).json({ error: 'movemento no encontrado' })
      res.json(movement)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const newmovement = await MovementService.create(req.body)
      res.status(201).json(newmovement)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const updated = await MovementService.update(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async delete(req, res) {
    try {
      await MovementService.delete(req.params.id)
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}