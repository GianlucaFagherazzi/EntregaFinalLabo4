import { Account, User, Tarjet } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'

export const AccountService = {

  async getAll() {
    try {
      return await Account.findAll({
        include: [
          { model: User, as: 'User', attributes: ['id', 'name', 'surname'] },
          { model: Tarjet, as: 'Tarjets' }
        ]
      })
    } catch (error) {
      throw new AppError('Error al obtener las cuentas', 500, error)
    }
  },

  async getById(id) {
    try {
      const account = await Account.findByPk(id, {
        include: [
          { model: User, as: 'User', attributes: ['id', 'name', 'surname'] },
          { model: Tarjet, as: 'Tarjets' }
        ]
      })

      if (!account) throw new AppError('Cuenta no encontrada', 404)

      return account

    } catch (error) {
      throw new AppError('Error al obtener la cuenta', 500, error)
    }
  },

  async create(data) {
    try {
      // Verificar que exista el usuario
      const user = await User.findByPk(data.userId)
      if (!user) throw new AppError('Usuario no encontrado', 404)

      return await Account.create(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al crear la cuenta', 400, error)
    }
  },

  async update(id, data) {
    try {
      const account = await Account.findByPk(id)
      if (!account) throw new AppError('Cuenta no encontrada', 404)

      // Si intenta cambiar el userId, verificar que exista
      if (data.userId) {
        const user = await User.findByPk(data.userId)
        if (!user) throw new AppError('Usuario no encontrado', 404)
      }

      return await account.update(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al actualizar la cuenta', 400, error)
    }
  },

  async delete(id) {
    try {
      const account = await Account.findByPk(id)
      if (!account) throw new AppError('Cuenta no encontrada', 404)

      await account.destroy()
      return true

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al eliminar la cuenta', 500, error)
    }
  }

}