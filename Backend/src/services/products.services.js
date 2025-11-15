import { Product, Category, User } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import { Op } from 'sequelize'

// Helpers reutilizables
async function validateCategory(categoryId) {
  const category = await Category.findByPk(categoryId)
  if (!category) throw new AppError('La categoría especificada no existe', 404)
}

async function validateUser(userId) {
  const user = await User.findByPk(userId)
  if (!user) throw new AppError('El usuario especificado no existe', 404)
}

async function validateProductNameUnique(name, userId, excludeId = null) {
  const where = { name, userId }

  if (excludeId) {
    where.id = { [Op.ne]: excludeId }
  }

  const exists = await Product.findOne({ where })
  if (exists) {
    throw new AppError(`El usuario ya tiene un producto llamado "${name}"`, 409)
  }
}


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

      if (!product) throw new AppError('Producto no encontrado', 404)

      return product
    } catch (error) {
      throw new AppError('Error al obtener el producto', 500, error)
    }
  },

  async create(data) {
    try {
      await validateUser(data.userId)
      await validateCategory(data.categoryId)
      await validateProductNameUnique(data.name, data.userId)

      return await Product.create(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al crear el producto', 400, error)
    }
  },

  async update(id, data) {
    try {
      const product = await Product.findByPk(id)
      if (!product) throw new AppError('Producto no encontrado', 404)

      // Detectar si hubo cambios en el artículo
      const current = product.toJSON()
      const incoming = { ...current, ...data }
      const noRealChanges = JSON.stringify(current) === JSON.stringify(incoming)

      if (noRealChanges) {
        return { noChanges: true, product }
      }

      // Resolver usuario final (si no viene, queda el actual)
      const finalUserId = data.userId ?? product.userId

      // Validar nombre SOLO si cambia realmente ---
      if (data.name && data.name !== product.name) {
        await validateProductNameUnique(data.name, finalUserId, id)
      }

      // Validar categoría si se envía ---
      if (data.categoryId) {
        await validateCategory(data.categoryId)
      }

      // Validar usuario si se envía userId ---
      if (data.userId) {
        await validateUser(data.userId)
      }

      const updatedProduct = await product.update(data)
      return updatedProduct

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al actualizar el producto', 400, error)
    }
  },

  async softDelete(id) {
    try {
      const product = await Product.findByPk(id)
      if (!product) throw new AppError('Producto no encontrado', 404)

      await product.update({ isActive: false })
      return true

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al desactivar el producto', 500, error)
    }
  },

  async hardDelete(id) {
    try {
      const product = await Product.findByPk(id)
      if (!product) throw new AppError('Producto no encontrado', 404)

      await product.destroy()
      return true

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al eliminar el producto definitivamente', 500, error)
    }
  }
}

