import { Product, Category, User } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'

export const ProductService = {
  async getAll() {
    try {
      return await Product.findAll({
        include: [
          { model: Category, as: 'Category' },
          {
            model: User,
            as: 'User',
            attributes: ['id', 'name', 'surname']
          }
        ]
      })

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener los productos', 500, error)
    }
  },

  async getById(id) {
    try {
      const product = await Product.findByPk(id, {
        include: [
          { model: Category, as: 'Category' },
          { 
            model: User, 
            as: 'User', 
            attributes: ['id', 'name', 'surname'] 
          }
        ]
      })

      if (!product) {
        throw new AppError('Producto no encontrado', 404)
      }

      return product

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener el usuario', 500, error)
    }
  },


  async create(data) {
    return await Product.create(data)
  },

  async update(id, data) {
    const product = await Product.findByPk(id)
    if (!product) throw new Error('Producto no encontrado')
    return await product.update(data)
  },

  async delete(id) {
    const product = await Product.findByPk(id)
    if (!product) throw new Error('Producto no encontrado')
    return await product.destroy()
  }
}
