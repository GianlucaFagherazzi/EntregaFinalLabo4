import { Category, Product } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'

export const CategoryService = {
  
  async getAll() {
    try {
      return await Category.findAll({
        include: [
          { model: Product, as: 'Products' }
        ]
      })
    } catch (error) {
      throw new AppError('Error al obtener las categorías', 500, error)
    }
  },

  async getById(id) {
    try {
      const category = await Category.findByPk(id, {
        include: [
          { model: Product, as: 'Products' }
        ]
      })

      if (!category) throw new AppError('Categoría no encontrada', 404)

      return category

    } catch (error) {
      throw new AppError('Error al obtener la categoría', 500, error)
    }
  },
  
  async create(data) {
    return await Category.create(data)
  },

  async update(id, data) {
    const category = await Category.findByPk(id)
    if (!category) throw new AppError('Categoría no encontrada', 404)
    return await category.update(data)
  },

  async delete(id) {
    const category = await Category.findByPk(id)
    if (!category) throw new AppError('Categoría no encontrada', 404)
    return await category.destroy()
  }

}