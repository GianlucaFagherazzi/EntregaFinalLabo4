import { Product, User, Category} from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import { Op, where } from 'sequelize'

import { UserService } from './users.services.js'
import { CategoryService } from './categories.services.js'

async function validateProductNameUnique(name, userId, excludeId = null) {
  const where = { name: name.trim(), userId, isActive: true }

  if (excludeId) {
    where.id = { [Op.ne]: excludeId }
  }

  const exists = await Product.findOne({ where })
  if (exists) {
    throw new AppError(`El usuario ya tiene un producto llamado "${name}"`, 409)
  }
}

export const ProductService = {
  async getAll(filters) {
    try {
      const products = await Product.findAll({
        where: {
          isActive: true,
          ...filters,
        },
        include: [
          { model: User, as: 'User', attributes: ['id', 'name'] },
          { model: Category, as:'Category', attributes: ['id', 'name'] }
        ]
      })

      return products

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener los productos', 500, error)
    }
  },


  async getById(id) {
    try {
      const product = await Product.findByPk(id, {
        where: { isActive: true },
      })

      if (!product) throw new AppError('Producto no encontrado', 404);

      return product
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener el producto', 500, error);
    }
  },

  async create(data) {
    try {
      await UserService.getById(data.userId);
      if (data.categoryId) await CategoryService.getById(data.categoryId);
      await validateProductNameUnique(data.name.trim(), data.userId);

      data.name = data.name.trim();

      return await Product.create(data);

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear el producto', 400, error);
    }
  },

  async update(id, data) {
    try {
      const product = await this.getById(id)

      // Detectar si hubo cambios en el artículo
      const current = product.toJSON()
      const incoming = { ...current, ...data }
      const noRealChanges = JSON.stringify(current) === JSON.stringify(incoming)

      if (noRealChanges) {
        return { noChanges: true, product }
      }

      // Resolver usuario final (si no viene, queda el actual)
      const finalUserId = data.userId ?? product.userId

      // Validar nombre SOLO si cambia realmente
      if (data.name && data.name !== product.name) {
        await validateProductNameUnique(data.name, finalUserId, id)
      }

      // Validar categoría si se envía
      if (data.categoryId) {
        await CategoryService.getById(data.categoryId)
      }

      // Validar usuario si se envía userId
      if (data.userId) {
        await UserService.getById(data.userId)
      }

      return await product.update(data)

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al actualizar el producto', 400, error)
    }
  },

  async softDelete(id) {
    try {
      const product = await this.getById(id);

      await product.update({ isActive: false })
      return { message: 'Producto desactivado correctamente', productId: id };

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al desactivar el producto', 500, error)
    }
  },

}

