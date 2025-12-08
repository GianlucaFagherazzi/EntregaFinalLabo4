import { ProductService } from '../services/products.services.js';
import { Op } from 'sequelize';

export const ProductController = {
  async getAll(req, res, next) {
    try {
      const filters = {
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.categoryId && { categoryId: req.query.categoryId }),
      }

      if (req.query.minPrice || req.query.maxPrice) {
        filters.price = {}
        if (req.query.minPrice) filters.price[Op.gte] = Number(req.query.minPrice)
        if (req.query.maxPrice) filters.price[Op.lte] = Number(req.query.maxPrice)
      }
      const result = await ProductService.getAll(filters)

      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  },

  async getById(req, res, next) {
    try {
      const product = await ProductService.getById(Number(req.params.id))
      res.json({ success: true, data: product })
    }
    catch (error) {
      next(error)
    }
  },

  async create(req, res, next) {
    try {
      const newProduct = await ProductService.create(req.body)
      res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const result = await ProductService.update(Number(req.params.id), req.body)

      if (result.noChanges) {
        return res.status(200).json({ success: true, message: "No se realizaron cambios porque los datos son iguales", data: result.product })
      }

      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  },

  async softDelete(req, res, next) {
    try {
      await ProductService.softDelete(Number(req.params.id));
      res.json({ success: true, message: 'Producto desactivado' });
    } catch (error) {
      next(error);
    }
  }
}
