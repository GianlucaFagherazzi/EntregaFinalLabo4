import { ProductService } from '../services/products.services.js';

export const ProductController = {
  async getAll(req, res, next) {
    try {
      const products = await ProductService.getAll()
      res.json({ success: true, data: products })
    } catch (error) {
      next(error)
    }
  },

  async getById(req, res, next) {
    try {
      const product = await ProductService.getById(Number(req.params.id))
      res.json({ success: true, data: product })
    } catch (error) {
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
