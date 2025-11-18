import { Movement, Product} from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';
import { MovementUserService } from './movementUser.service.js';
import { SnapshotService } from './snapshot.service.js';

// Helper: validar producto
async function validateProduct(productId) {
  const product = await Product.findByPk(productId);
  if (!product || !product.isActive) throw new AppError('Producto no existe o está inactivo', 404);
  return product;
}

export const MovementService = {
  async getAll() {
    try {
      return await Movement.findAll({
        include: [
          { model: Product, as: 'Product' },
          { model: SnapshotService.model, as: 'Snapshot' }, // snapshot incluido
          { model: MovementUserService.model, as: 'MovementUsers' } // movementUsers incluidos
        ]
      });
    } catch (error) {
      throw new AppError('Error al obtener los movimientos', 500, error);
    }
  },

  async getById(id) {
    try {
      const movement = await Movement.findByPk(id, {
        include: [
          { model: Product, as: 'Product' },
          { model: SnapshotService.model, as: 'Snapshot' },
          { model: MovementUserService.model, as: 'MovementUsers' }
        ]
      });
      if (!movement) throw new AppError('Movimiento no encontrado', 404);
      return movement;
    } catch (error) {
      throw new AppError('Error al obtener el movimiento', 500, error);
    }
  },

  async create(data) {
    try {
      const product = await validateProduct(data.productId);

      const totalAmount = data.quantity * product.price;

      const movement = await Movement.create({
        productId: data.productId,
        quantity: data.quantity,
        totalAmount,
        date: data.date || new Date()
      });

      // Delegar creación de movementUsers
      for (const mu of data.movementUsers || []) {
        await MovementUserService.create({
          movementId: movement.id,
          userId: mu.userId,
          accountId: mu.accountId,
          tarjetId: mu.tarjetId,
          rol: mu.rol
        });
      }

      // Delegar creación de snapshot
      if (data.snapshot) {
        await SnapshotService.create({
          movementId: movement.id,
          buyerName: data.snapshot.buyerName,
          sellerName: data.snapshot.sellerName,
          productName: product.name,
          numberTarjet: data.snapshot.numberTarjet,
          quantity: data.quantity,
          amount: totalAmount,
          date: data.date || new Date()
        });
      }

      return await this.getById(movement.id);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear el movimiento', 400, error);
    }
  },
};