import { Product } from '../models/index.models.js'

export const ProductService = {
  async getAll() {
    return await Product.findAll()
  },

  async getById(id) {
    return await Product.findByPk(id)
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
