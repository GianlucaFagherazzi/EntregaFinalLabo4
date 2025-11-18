import { CategoryService } from '../services/categories.services.js';

export const CategoryController = {
  async getAll(req, res, next) {
    try {
      const categories = await CategoryService.getAll();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const category = await CategoryService.getById(Number(req.params.id));
      res.json({ success: true, data: category });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const newCategory = await CategoryService.create(req.body);
      res.status(201).json({ success: true, data: newCategory });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const updated = await CategoryService.update(Number(req.params.id), req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await CategoryService.delete(Number(req.params.id));
      res.json({ success: true, message: 'Categoría eliminada' });
    } catch (err) {
      next(err);
    }
  }
};
