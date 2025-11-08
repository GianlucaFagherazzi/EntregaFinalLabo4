import { ProductService } from '../services/products.services.js';

export const ProductController = {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAll()
      res.json(products)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getById(req, res) {
    try {
      const product = await ProductService.getById(req.params.id)
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' })
      res.json(product)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async create(req, res) {
    try {
      const newProduct = await ProductService.create(req.body)
      res.status(201).json(newProduct)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async update(req, res) {
    try {
      const updated = await ProductService.update(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async delete(req, res) {
    try {
      await ProductService.delete(req.params.id)
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
