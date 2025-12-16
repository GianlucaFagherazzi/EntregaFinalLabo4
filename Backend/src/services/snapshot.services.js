import { Snapshot } from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';

export const SnapshotService = {
  async getAll() {
    try {
      return await Snapshot.findAll();
    } catch (error) {
      throw new AppError('Error al obtener los snapshots', 500, error);
    }
  },

  async getById(id) {
    try {
      const snapshot = await Snapshot.findByPk(id);
      if (!snapshot) throw new AppError('Snapshot no encontrado', 404);
      return snapshot;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener el snapshot', 500, error);
    }
  },

  async create(data, options = {}) {
    try {
      return await Snapshot.create(data, {
        transaction: options.transaction || null
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear el snapshot', 400, error);
    }
  },
};
