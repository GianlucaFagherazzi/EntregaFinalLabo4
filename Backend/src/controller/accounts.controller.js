import { AccountService } from '../services/accounts.services.js';

export const AccountController = {
  async getAll(req, res) {
    try {
      const accounts = await AccountService.getAll()
      res.json(accounts)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getById(req, res) {
    try {
      const account = await AccountService.getById(req.params.id)
      if (!account) return res.status(404).json({ error: 'Cuenta no encontrada' })
      res.json(account)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const newAccount = await AccountService.create(req.body)
      res.status(201).json(newAccount)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const updated = await AccountService.update(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async delete(req, res) {
    try {
      await AccountService.delete(req.params.id)
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}