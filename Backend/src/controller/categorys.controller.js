import { CategoryService } from '../services/categorys.services.js';

export const CategoryController = {
  async getAll(req, res) {
    try {
      const categorys = await CategoryService.getAll()
      res.json(categorys)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getById(req, res) {
    try {
      const category = await CategoryService.getById(req.params.id)
      if (!category) return res.status(404).json({ error: 'categoryo no encontrado' })
      res.json(category)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const newcategory = await CategoryService.create(req.body)
      res.status(201).json(newcategory)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const updated = await CategoryService.update(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async delete(req, res) {
    try {
      await CategoryService.delete(req.params.id)
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}