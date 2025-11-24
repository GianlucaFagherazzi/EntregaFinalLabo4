import { Tarjet } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import { Op } from 'sequelize'

import { AccountService } from '../services/accounts.services.js'

export const TarjetService = {

  async getAll() {
    try {
      return await Tarjet.findAll({
        where: { isActive: true }
      })
    } catch (error) {
      throw new AppError('Error al obtener las tarjetas', 500, error)
    }
  },

  async getById(id) {
    try {
      const tarjet = await Tarjet.findOne({
        where: { id, isActive: true }
      })

      if (!tarjet) throw new AppError('Tarjeta no encontrada', 404)

      return tarjet

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener la tarjeta', 500, error)
    }
  },

  async create(data) {
    try {
      // Verificar existencia de la cuenta
      await AccountService.getById(data.accountId)

      // verifica que no exista una tarjeta con el mismo numero en la misma cuenta
      const existing = await Tarjet.findOne({ where: { number: data.number, accountId: data.accountId, isActive: true } })
      if (existing) throw new AppError('Ya existe una tarjeta con ese número en la cuenta especificada', 400)

      return await Tarjet.create(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al crear la tarjeta', 400, error)
    }
  },

  async update(id, data) {
    try {
      const tarjet = await this.getById(id)

      // Si cambia la cuenta, verificar existencia
      if (data.accountId) {
        await AccountService.getById(data.accountId)
      }

      // validar numero de tarjeta unico en la cuenta.
      if (data.number) {
        data.number = data.number.trim()
        const existing = await Tarjet.findOne({
          where: { number: data.number, accountId: data.accountId ?? tarjet.accountId, isActive: true, id: { [Op.ne]: id } }
        })
        if (existing) throw new AppError('Ya existe una tarjeta con ese número en la cuenta especificada', 409)
      }

      return await tarjet.update(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al actualizar la tarjeta', 400, error)
    }
  },

  async updateBalance(tarjetId, newBalance, options = {}) {
    const tarjet = await Tarjet.findByPk(tarjetId, {
      transaction: options.transaction
    });

    if (!tarjet) throw new AppError("Tarjeta no encontrada", 404);

    await tarjet.update(
      { balance: newBalance },
      { transaction: options.transaction }
    );

    return tarjet;
  },

  async softDelete(id) {
    try {
      const tarjet = await this.getById(id)

      await tarjet.update({ isActive: false });

      return { message: 'Tarjeta desactivada correctamente', tarjetId: id };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al desactivar la tarjeta', 500, error);
    }
  }

}
