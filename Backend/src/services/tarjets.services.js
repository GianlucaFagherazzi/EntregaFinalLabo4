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
      if (!data.number) {
        throw new AppError('El número de tarjeta es obligatorio', 400);
      }

      // normalizar número (quitar espacios)
      data.number = String(data.number).replace(/\s+/g, '');

      // validar que sean solo números
      if (!/^\d+$/.test(data.number)) {
        throw new AppError('La tarjeta solo puede contener números', 400);
      }

      // Verificar existencia de la cuenta
      await AccountService.getById(data.accountId)

      // verificar duplicados en la misma cuenta
      const existing = await Tarjet.findOne({
        where: {
          number: data.number,
          accountId: data.accountId,
          isActive: true
        }
      });

      if (existing) {
        throw new AppError('Ya existe una tarjeta con ese número en la cuenta especificada', 400)
      }

      const existingTarjets = await Tarjet.count({
        where: {
          accountId: data.accountId,
          isActive: true
        }
      });

      const tarjet = await Tarjet.create({
        ...data,
        isDefault: existingTarjets === 0
      });

      return tarjet;

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

  async topUpBalance(tarjetId, amount, options = {}) {
    try {
      // validar existencia
      if (amount === undefined || amount === null) {
        throw new AppError("El monto es obligatorio", 400);
      }

      // convertir a número
      const parsedAmount = Number(amount);

      // validar número válido
      if (Number.isNaN(parsedAmount)) {
        throw new AppError("El monto debe ser un número válido", 400);
      }

      // no permitir negativos
      if (parsedAmount < 0) {
        throw new AppError("No se pueden cargar montos negativos", 400);
      }

      // no permitir cero
      if (parsedAmount === 0) {
        throw new AppError("El monto debe ser mayor a 0", 400);
      }

      // limitar monto máximo por operación (ajustable)
      const MAX_TOPUP = 1_000_000; // 1 millón
      if (parsedAmount > MAX_TOPUP) {
        throw new AppError(
          `El monto máximo por carga es ${MAX_TOPUP.toLocaleString()}`,
          400
        );
      }

      // redondear a 2 decimales (evitar floats raros)
      const safeAmount = Number(parsedAmount.toFixed(2));

      const tarjet = await Tarjet.findByPk(tarjetId, {
        transaction: options.transaction || null,
      });

      if (!tarjet) throw new AppError("Tarjeta no encontrada", 404);

      const nuevoBalance = Number(tarjet.balance) + safeAmount;

      await tarjet.update(
        { balance: nuevoBalance },
        { transaction: options.transaction }
      );

      return tarjet;

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error al actualizar el balance de la tarjeta", 500, error);
    }
  },

  async chargeBalance(tarjetId, amount, options = {}) {
    if (amount <= 0) throw new AppError("Monto inválido", 400);

    const tarjet = await Tarjet.findByPk(tarjetId, { transaction: options.transaction });
    if (!tarjet) throw new AppError("Tarjeta no encontrada", 404);

    if (tarjet.balance < amount) {
      throw new AppError("Fondos insuficientes", 400);
    }

    const nuevoBalance = Number(tarjet.balance) - Number(amount.toFixed(2));

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
  },

  async getDefaultByAccountId(accountId) {
    try {
      const tarjet = await Tarjet.findOne({
        where: {
          accountId,
          isDefault: true
        }
      });

      if (!tarjet) {
        throw new AppError(
          "La cuenta del vendedor no tiene tarjeta por defecto",
          400
        );
      }

      return tarjet;

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error al obtener la tarjeta por defecto", 500, error);
    }
  },

  async setDefault(tarjetId, accountId) {
    try {
      // quitar default a todas las tarjetas de la cuenta
      await Tarjet.update(
        { isDefault: false },
        { where: { accountId } }
      );

      const tarjet = await this.getById(tarjetId);

      if (tarjet.accountId !== accountId) {
        throw new AppError("La tarjeta no pertenece a la cuenta", 403);
      }

      await tarjet.update({ isDefault: true });

      return tarjet;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error al establecer tarjeta por defecto", 500, error);
    }
  }

}
