import { MovementUser } from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';

export const MovementUserService = {
  // Obtener todos
  async getAll() {
    try {
      return await MovementUser.findAll( );
    } catch (error) {
      throw new AppError('Error al obtener los registros de movementUser', 500, error);
    }
  },

  // Obtener por ID
  async getById(id) {
    try {
      const mu = await MovementUser.findByPk(id);
      if (!mu) throw new AppError('Registro de movementUser no encontrado', 404);
      return mu;
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener el registro de movementUser', 500, error);
    }
  },

  // Crear registro
  async create(data, options = {}) {
    try {
        return await MovementUser.create(data, {
        transaction: options.transaction || null
      });
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al crear el registro de movementUser', 400, error);
    }
  },
};
