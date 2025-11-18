import { MovementUser, User, Tarjet, Account } from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';

// Helpers de validación
async function validateUser(userId) {
  const user = await User.findByPk(userId);
  if (!user || !user.isActive) throw new AppError('Usuario no existe o está inactivo', 404);
  return user;
}

async function validateAccount(accountId) {
  const account = await Account.findByPk(accountId);
  if (!account) throw new AppError('Cuenta no encontrada', 404);
  return account;
}

async function validateTarjet(tarjetId) {
  const tarjet = await Tarjet.findByPk(tarjetId);
  if (!tarjet || !tarjet.isActive) throw new AppError('Tarjeta no existe o está inactiva', 404);
  return tarjet;
}

export const MovementUserService = {
  model: MovementUser, // para incluirlo en MovementService

  // Obtener todos
  async getAll() {
    try {
      return await MovementUser.findAll({
        include: [
          { model: User, as: 'User', attributes: ['id', 'name', 'surname'] },
          { model: Account, as: 'Account' },
          { model: Tarjet, as: 'Tarjet' }
        ]
      });
    } catch (error) {
      throw new AppError('Error al obtener los registros de movementUser', 500, error);
    }
  },

  // Obtener por ID
  async getById(id) {
    try {
      const mu = await MovementUser.findByPk(id, {
        include: [
          { model: User, as: 'User', attributes: ['id', 'name', 'surname'] },
          { model: Account, as: 'Account' },
          { model: Tarjet, as: 'Tarjet' }
        ]
      });
      if (!mu) throw new AppError('Registro de movementUser no encontrado', 404);
      return mu;
    } catch (error) {
      throw new AppError('Error al obtener el registro de movementUser', 500, error);
    }
  },

  // Crear registro
  async create(data) {
    try {
      await validateUser(data.userId);
      await validateAccount(data.accountId);
      if (data.tarjetId) await validateTarjet(data.tarjetId);

      return await MovementUser.create({
        movementId: data.movementId,
        userId: data.userId,
        accountId: data.accountId,
        tarjetId: data.tarjetId ?? null,
        rol: data.rol
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear el registro de movementUser', 400, error);
    }
  },
};
