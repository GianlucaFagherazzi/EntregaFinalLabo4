import { Account, User, Tarjet } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import { Op } from 'sequelize'

// Helper: validar usuario.
async function validateUser(userId) {
  const user = await User.findByPk(userId);
  if (!user || !user.isActive) throw new AppError('El usuario especificado no existe o está inactivo', 404);
}

// Helper: validar CBU único por usuario.
async function validateCbuUnique(cbu, userId, excludeId = null) {
  const where = { cbu, userId };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  const exists = await Account.findOne({ where });
  if (exists) throw new AppError(`El usuario ya tiene una cuenta con el CBU "${cbu}"`, 409);
}

export const AccountService = {
  // Obtener todas las cuentas activas
  async getAll() {
    try {
      return await Account.findAll({
        where: { isActive: true },
        include: [
          { model: Tarjet, as: 'Tarjets' }
        ]
      });
    } catch (error) {
      throw new AppError('Error al obtener las cuentas', 500, error);
    }
  },

  // Obtener cuenta por ID
  async getById(id) {
    try {
      const account = await Account.findOne({
        where: { id, isActive: true },
        include: [
          { model: User, as: 'User', attributes: ['id', 'name', 'surname', 'email'] },
          { model: Tarjet, as: 'Tarjets' }
        ]
      });
      if (!account) throw new AppError('Cuenta no encontrada', 404);
      return account;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener la cuenta', 500, error);
    }
  },

  // Crear cuenta
  async create(data) {
    try {
      if (!data.cbu) throw new AppError('El CBU es obligatorio', 400);
      if (!data.userId) throw new AppError('El usuario es obligatorio', 400);

      await validateUser(data.userId);
      await validateCbuUnique(data.cbu, data.userId);

      return await Account.create(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear la cuenta', 400, error);
    }
  },

  // Actualizar cuenta
  async update(id, data) {
    try {
      const account = await Account.findOne({ where: { id, isActive: true } });
      if (!account) throw new AppError('Cuenta no encontrada', 404);

      // Validar usuario si se intenta cambiar
      if (data.userId && data.userId !== account.userId) {
        await validateUser(data.userId);
      }

      // Validar CBU único si se cambia
      if (data.cbu && data.cbu !== account.cbu) {
        await validateCbuUnique(data.cbu, data.userId ?? account.userId, id);
      }

      return await account.update(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al actualizar la cuenta', 400, error);
    }
  },

  // Soft delete
  async softDelete(id) {
    try {
      const account = await Account.findOne({ where: { id, isActive: true } });
      if (!account) throw new AppError('Cuenta no encontrada', 404);

      await account.update({ isActive: false });
      return { message: 'Cuenta desactivada correctamente', accountId: id };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al desactivar la cuenta', 500, error);
    }
  }
};
