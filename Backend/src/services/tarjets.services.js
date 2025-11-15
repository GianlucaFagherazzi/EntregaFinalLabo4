import { Tarjet, Account, Movement } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'

export const TarjetService = {

  async getAll() {
    try {
      return await Tarjet.findAll({
        include: [
          { model: Account, as: 'Account' },
          { model: Movement, as: 'Movements' }
        ]
      })
    } catch (error) {
      throw new AppError('Error al obtener las tarjetas', 500, error)
    }
  },

  async getById(id) {
    try {
      const tarjet = await Tarjet.findByPk(id, {
        include: [
          { model: Account, as: 'Account' },
          { model: Movement, as: 'Movements' }
        ]
      })

      if (!tarjet) throw new AppError('Tarjeta no encontrada', 404)

      return tarjet

    } catch (error) {
      throw new AppError('Error al obtener la tarjeta', 500, error)
    }
  },

  async create(data) {
    try {
      // Verificar existencia de la cuenta
      const account = await Account.findByPk(data.accountId)
      if (!account) throw new AppError('Cuenta asociada no encontrada', 404)

      return await Tarjet.create(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al crear la tarjeta', 400, error)
    }
  },

  async update(id, data) {
    try {
      const tarjet = await Tarjet.findByPk(id)
      if (!tarjet) throw new AppError('Tarjeta no encontrada', 404)

      // Si cambia la cuenta, verificar existencia
      if (data.accountId) {
        const account = await Account.findByPk(data.accountId)
        if (!account) throw new AppError('Cuenta asociada no encontrada', 404)
      }

      return await tarjet.update(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al actualizar la tarjeta', 400, error)
    }
  },

  async delete(id) {
    try {
      const tarjet = await Tarjet.findByPk(id)
      if (!tarjet) throw new AppError('Tarjeta no encontrada', 404)

      await tarjet.destroy()
      return true

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al eliminar la tarjeta', 500, error)
    }
  }

}
