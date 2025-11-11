import { or, where } from 'sequelize'
import { User } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'

export const UserService = {
  async getAll() {
    try {
      return await User.findAll({ include: ['Products', 'Accounts', 'Movements'] })
    } catch (error) {
      throw new AppError('Error al obtener los usuarios', 500)
    }
  },

  async getById(id) {
    const user = await User.findByPk(id, { include: ['Products', 'Accounts', 'Movements'] })
    if (!user) throw new AppError('Usuario no encontrado', 404)
    return user
  },

  async create(data) {
    const userByEmail = await User.findOne({ where: { email: data.email } })
    if (userByEmail) throw new AppError('Ya existe un usuario con ese email', 409)

    const userByDni = await User.findOne({ where: { dni: data.dni } })
    if (userByDni) throw new AppError('Ya existe un usuario con ese DNI', 409)

    try {
      return await User.create(data)
    } catch (error) {
      throw new AppError('Error al crear el usuario. Verifica los datos enviados.', 400)
    }
  },

  async update(id, data) {
    const user = await User.findByPk(id)
    if (!user) throw new AppError('Usuario no encontrado', 404)

    // Ejemplo: no permitir duplicar emails al actualizar
    if (data.email) {
      const emailInUse = await User.findOne({ where: { email: data.email } })
      if (emailInUse && emailInUse.id !== id) {
        throw new AppError('El email ya está en uso por otro usuario', 409)
      }
    }

    if (data.dni) {
      const dniInUse = await User.findOne({ where: { dni: data.dni } })
      if (dniInUse && dniInUse.id !== id) {
        throw new AppError('El dni ya está en uso por otro usuario', 409)
      }
    }

    try {
      return await user.update(data)
    } catch (error) {
      throw new AppError('Error al actualizar el usuario', 400)
    }
  },

  async delete(id) {
    const user = await User.findByPk(id)
    if (!user) throw new AppError('Usuario no encontrado', 404)

    try {
      await user.destroy()
      return true
    } catch (error) {
      throw new AppError('Error al eliminar el usuario', 500)
    }
  }
}
