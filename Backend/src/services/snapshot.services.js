import { Snapshot, Movement } from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';

// Helper de validación
async function validateMovement(movementId) {
  const movement = await Movement.findByPk(movementId);
  if (!movement) throw new AppError('Movimiento no existe', 404);
  return movement;
}

export const SnapshotService = {
  model: Snapshot, // para incluirlo en MovementService

  // Obtener todos
  async getAll() {
    try {
      return await Snapshot.findAll();
    } catch (error) {
      throw new AppError('Error al obtener los snapshots', 500, error);
    }
  },

  // Obtener por ID
  async getById(id) {
    try {
      const snapshot = await Snapshot.findByPk(id);
      if (!snapshot) throw new AppError('Snapshot no encontrado', 404);
      return snapshot;
    } catch (error) {
      throw new AppError('Error al obtener el snapshot', 500, error);
    }
  },

  // Crear snapshot
  async create(data) {
    try {
      await validateMovement(data.movementId);

      return await Snapshot.create({
        movementId: data.movementId,
        buyerName: data.buyerName,
        sellerName: data.sellerName,
        productName: data.productName,
        numberTarjet: data.numberTarjet,
        quantity: data.quantity,
        amount: data.amount,
        date: data.date || new Date()
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear el snapshot', 400, error);
    }
  },
};
