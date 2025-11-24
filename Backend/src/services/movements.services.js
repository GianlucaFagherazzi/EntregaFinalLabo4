import { Movement } from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';
import { sequelize } from '../config/database.js';

// Servicios especializados
import { ProductService } from './products.services.js';
import { AccountService } from './accounts.services.js';
import { TarjetService } from './tarjets.services.js';
import { MovementUserService } from './movementUser.services.js';
import { SnapshotService } from './snapshot.services.js';
import { UserService } from './users.services.js';

import { extractLast4, validateProduct, validateBuyerSeller } from '../utils/helpers.js';

export const MovementService = {

  async getAll() {
    try {
      return await Movement.findAll();
    } catch (error) {
      throw new AppError('Error al obtener los movimientos', 500, error);
    }
  },

  async getById(id) {
    try {
      const movement = await Movement.findByPk(id);
      if (!movement) throw new AppError('Movimiento no encontrado', 404);
      return movement;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener el movimiento', 500, error);
    }
  },




  async getAllMovementsByProductId(productId) { },

  async getAllMovementsByUserId(userId) { },

  async getAllMovementsByTarjetId(tarjetId) { },




  async create(data) {
    const t = await sequelize.transaction();

    try {
      /*{
  "productId": 1,
  "quantity": 2,
  "movementUsers": [
    {
      "userId": 2,
      "accountId": 2,
      "tarjetId": 2,
      "rol": "buyer"
    },
    {
      "userId": 1,
      "accountId": 2,
      "tarjetId": 1,
      "rol": "seller"
    }
  ]
}*/

      // Se validan los datos de los usuarios del movimiento
      const { buyer: buyerMU, seller: sellerMU } = validateBuyerSeller(data.movementUsers);

      // Validar si los usuarios existen y están activos
      const buyerUser = await UserService.getById(buyerMU.userId);
      const sellerUser = await UserService.getById(sellerMU.userId);

      // Validar si el producto existe y está activo
      const product = await ProductService.getById(data.productId);

      // Se validan las cuentas asociadas a los usuarios
      await AccountService.getById(buyerMU.accountId);
      await AccountService.getById(sellerMU.accountId);

      // Se validan las tarjetas asociadas a los usuarios
      const buyerTarjet = await TarjetService.getById(buyerMU.tarjetId);
      const sellerTarjet = await TarjetService.getById(sellerMU.tarjetId);

      // Validar cantidad y monto total      
      const totalAmount = validateProduct(product, data.quantity);

      // Validar fondos suficientes en la tarjeta del comprador
      if (buyerTarjet.balance < totalAmount) {
        throw new AppError('Fondos insuficientes en la tarjeta del comprador', 400);
      }
      const last4Seller = extractLast4(sellerTarjet.number);

      // Crear el movimiento
      const movement = await Movement.create({
        productId: data.productId,
        quantity: data.quantity,
        totalAmount,
        date: data.date || new Date()
      }, { transaction: t });

      // Crear los registros de movementUser asociados
      for (const mu of data.movementUsers) {
        await MovementUserService.create(
          { ...mu, movementId: movement.id },
          { transaction: t }
        );
      }

      // Actualizar balances de las tarjetas
      await TarjetService.updateBalance(buyerTarjet.id, buyerTarjet.balance - totalAmount, { transaction: t });
      await TarjetService.updateBalance(sellerTarjet.id, sellerTarjet.balance + totalAmount, { transaction: t });

      // Crear snapshot del movimiento
      await SnapshotService.create({
        movementId: movement.id,
        buyerName: `${buyerUser.name} ${buyerUser.surname}`,
        sellerName: `${sellerUser.name} ${sellerUser.surname}`,
        productName: product.name,
        last4Tarjet: last4Seller,
        quantity: data.quantity,
        amount: totalAmount,
        date: data.date || new Date()
      }, { transaction: t });

      await t.commit();

      return await this.getById(movement.id);

    } catch (error) {
      await t.rollback();
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear el movimiento', 500, error);
    }
  }
};