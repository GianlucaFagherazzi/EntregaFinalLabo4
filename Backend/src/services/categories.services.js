import { Category, Product } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import { Op } from 'sequelize'

// Helper reutilizable.
async function validateCategoryNameUnique(name, excludeId = null) {
  const where = { name };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  const exists = await Category.findOne({ where });
  if (exists) throw new AppError(`Ya existe una categoría llamada "${name}"`, 409);
}

export const CategoryService = {
  // Obtener todas las categorías
  async getAll() {
    try {
      return await Category.findAll({
        include: [{ model: Product, as: 'Products' }]
      });
    } catch (error) {
      throw new AppError('Error al obtener las categorías', 500, error);
    }
  },

  // Obtener categoría por ID
  async getById(id) {
    try {
      const category = await Category.findByPk(id, {
        include: [{ model: Product, as: 'Products' }] // opcional
      });
      if (!category) throw new AppError('Categoría no encontrada', 404);
      return category;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener la categoría', 500, error);
    }
  },

  // Crear categoría
  async create(data) {
    try {
      if (!data.name) throw new AppError('El nombre es obligatorio', 400);
      await validateCategoryNameUnique(data.name);
      return await Category.create(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear la categoría', 400, error);
    }
  },

  // Actualizar categoría
  async update(id, data) {
    try {
      const category = await Category.findByPk(id);
      if (!category) throw new AppError('Categoría no encontrada', 404);

      if (data.name && data.name !== category.name) {
        await validateCategoryNameUnique(data.name, id);
        data.name = data.name.trim();
      }

      return await category.update(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al actualizar la categoría', 400, error);
    }
  },

  // Eliminar categoría (hard delete)
  async delete(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) throw new AppError('Categoría no encontrada', 404);

      await category.destroy();
      return { message: 'Categoría eliminada correctamente', categoryId: id };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al eliminar la categoría', 500, error);
    }
  }
};
