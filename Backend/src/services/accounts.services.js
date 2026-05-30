import { Account, User, Tarjet } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import { Op } from 'sequelize'

import { UserService } from './users.services.js'

// Helper: validar CBU único por usuario.
async function validateCbuUnique(cbu, userId, excludeId = null) {
  const where = { cbu, userId };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  const exists = await Account.findOne({ where });
  if (exists) throw new AppError(`El usuario ya tiene una cuenta con el CBU "${cbu}"`, 409);
}

export const AccountService = {
  async getAll() {
    try {
      return await Account.findAll();
    } catch (error) {
      throw new AppError('Error al obtener las cuentas', 500, error);
    }
  },

  async findById(id) {
    const account = await Account.findOne({
      where: {
        id,
        isActive: true
      }
    });

    if (!account) {
      throw new AppError('Cuenta no encontrada', 404);
    }

    return account;
  },

  async getById(id, user) {
    try {
      const account = await this.findById(id);

      const isOwner = account.userId === user.id;
      const isAdmin = user.role === "admin";

      if (!isOwner && !isAdmin) {
        throw new AppError('No autorizado', 403);
      }

      return account;

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener la cuenta', 500, error);
    }
  },

  async create(data) {
    try {
      await UserService.getById(data.userId);

      const existingAccounts = await Account.count({
        where: {
          userId: data.userId,
          isActive: true
        }
      });

      const account = await Account.create({
        ...data,
        cbu: await generateCBU(),
        isDefault: existingAccounts === 0
      });

      return account;

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear la cuenta', 400, error);
    }
  },

  async softDelete(id) {
    try {
      const account = await this.getById(id);

      await account.update({ isActive: false });
      return { message: 'Cuenta desactivada correctamente', accountId: id };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al desactivar la cuenta', 500, error);
    }
  },

  async getByUser(userId) {
    try {
      return await Account.findAll({
        where: {
          userId,
          isActive: true
        }
      });
    } catch (error) {
      throw new AppError('Error al obtener cuentas del usuario', 500, error);
    }
  },

  async getDefaultByUserId(userId) {
    try {
      const account = await Account.findOne({
        where: {
          userId,
          isDefault: true
        }
      });

      if (!account) {
        throw new AppError(
          "El usuario vendedor no tiene una cuenta por defecto configurada",
          400
        );
      }

      return account;

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error al obtener la cuenta por defecto", 500, error);
    }
  },

  async setDefault(accountId, userId) {
    try {
      await Account.update(
        { isDefault: false },
        { where: { userId } }
      );

      const account = await this.getById(accountId);

      if (account.userId !== userId)
        throw new AppError("La cuenta no pertenece al usuario", 403);

      await account.update({ isDefault: true });

      return account;
    }
    catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Error al configurar la cuenta por defecto", 500, error);
    }

  }
}
