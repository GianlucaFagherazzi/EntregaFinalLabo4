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

  async getByAccount(accountId) {
    try {
      return await Tarjet.findAll({
        where: {
          accountId,
          isActive: true
        }
      });
    } catch (error) {
      throw new AppError('Error al obtener tarjetas por cuenta', 500, error);
    }
  },

  async create(data) {
    try {
      // normalizar número: quitar espacios y asegurar string
      data.number = String(data.number).replace(/\s+/g, '');

      // Verificar existencia de la cuenta
      await AccountService.getById(data.accountId)

      // verificar duplicados en la misma cuenta
      const existing = await Tarjet.findOne({
        where: { number: data.number, accountId: data.accountId, isActive: true }
      })

      if (existing) {
        throw new AppError('Ya existe una tarjeta con ese número en la cuenta especificada', 400)
      }

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

      // normalizar número
      if (data.number) {
        data.number = String(data.number).replace(/\s+/g, '');
      }

      // validar número único
      if (data.number) {
        const existing = await Tarjet.findOne({
          where: {
            number: data.number,
            accountId: data.accountId ?? tarjet.accountId,
            isActive: true,
            id: { [Op.ne]: id }
          }
        })

        if (existing) {
          throw new AppError('Ya existe una tarjeta con ese número en la cuenta especificada', 409)
        }
      }

      return await tarjet.update(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al actualizar la tarjeta', 400, error)
    }
  },

  async updateBalance(tarjetId, amount) {
    const tarjet = await Tarjet.findByPk(tarjetId, {
      transaction: options.transaction,
    });

    if (!tarjet) throw new AppError("Tarjeta no encontrada", 404);

    const nuevoBalance = Number(tarjet.balance) + Number(amount);

    await tarjet.update(
      { balance: nuevoBalance },
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
