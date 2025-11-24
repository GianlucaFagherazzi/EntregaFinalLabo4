import { Movement, Product, MovementUser, Tarjet, User, Account } from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';
import { MovementUserService } from './movementUser.services.js';
import { SnapshotService } from './snapshot.services.js';
import { sequelize } from '../config/database.js';

// ---------------------- VALIDACIONES -------------------------

function validateProductForSnapshot(product) {
  if (!product.name) throw new AppError('El producto debe tener nombre', 400);
  if (!product.price || product.price <= 0)
    throw new AppError('El producto debe tener un precio válido', 400);
}

function validateMovementData(quantity, totalAmount) {
  if (!quantity || quantity <= 0)
    throw new AppError('La cantidad debe ser mayor a cero', 400);

  if (!totalAmount || totalAmount <= 0)
    throw new AppError('Monto total inválido', 400);
}

// --- 🆕 VALIDAR QUE LA CUENTA EXISTA Y ESTE ACTIVA ---
async function validateAccount(accountId) {
  const acc = await Account.findByPk(accountId);

  if (!acc || !acc.isActive)
    throw new AppError('Cuenta inválida o inactiva', 400);

  return acc;
}

// validar que una tarjeta tiene saldo suficiente
async function validateTarjetHasBalance(tarjetId, amountNeeded) {
  const tarjet = await Tarjet.findByPk(tarjetId);

  if (!tarjet || !tarjet.isActive)
    throw new AppError('La tarjeta no existe o está inactiva', 404);

  if (tarjet.balance < amountNeeded)
    throw new AppError(
      `Saldo insuficiente. Saldo: ${tarjet.balance}, Necesario: ${amountNeeded}`,
      400
    );

  return tarjet;
}

function extractLast4(number) {
  if (!number) return null;
  return String(number).slice(-4);
}


// --------------------------------------------------------------

export const MovementService = {
  async getAll() {
    return Movement.findAll();
  },

  async getById(id) {
    return Movement.findByPk(id, {
      include: [
        { model: Product, as: 'Product' },
        { model: MovementUser, as: 'MovementUsers' },
        { model: SnapshotService.model, as: 'Snapshot' }
      ]
    });
  },

  // -------------------------- CREATE --------------------------

  async create(data) {
    const t = await sequelize.transaction();

    try {
      // 1. Obtener producto
      const product = await Product.findByPk(data.productId);
      if (!product) throw new AppError('Producto no encontrado', 404);

      validateProductForSnapshot(product);

      const totalAmount = data.quantity * product.price;

      validateMovementData(data.quantity, totalAmount);

      // 2. Validar movementUsers buyer/seller
      if (!data.movementUsers || data.movementUsers.length < 2) {
        throw new AppError('Debe haber buyer y seller en el movimiento', 400);
      }

      const buyerMU = data.movementUsers.find(mu => mu.rol === 'buyer');
      const sellerMU = data.movementUsers.find(mu => mu.rol === 'seller');
      
      if (!buyerMU || !sellerMU)
        throw new AppError('Debe existir buyer y seller', 400);

      // --- 🆕 VALIDAR CUENTAS ---
      await validateAccount(buyerMU.accountId);
      await validateAccount(sellerMU.accountId);

      // 3. Validar saldo suficiente del comprador
      const buyerTarjet = await validateTarjetHasBalance(buyerMU.tarjetId, totalAmount);

      // 4. Obtener tarjeta del vendedor
      const sellerTarjet = await Tarjet.findByPk(sellerMU.tarjetId);
      if (!sellerTarjet)
        throw new AppError('Tarjeta del vendedor no encontrada', 404);

      const last4Seller = extractLast4(sellerTarjet.number);

      // 5. Obtener usuarios reales
      const buyerUser = await User.findByPk(buyerMU.userId);
      const sellerUser = await User.findByPk(sellerMU.userId);

      if (!buyerUser || !sellerUser)
        throw new AppError('Usuario buyer o seller no encontrado', 404);

      // 6. Crear movimiento
      const movement = await Movement.create({
        productId: data.productId,
        quantity: data.quantity,
        totalAmount,
        date: data.date || new Date()
      }, { transaction: t });

      // 7. Registrar movementUsers
      for (const mu of data.movementUsers) {
        await MovementUserService.create({
          movementId: movement.id,
          userId: mu.userId,
          accountId: mu.accountId,
          tarjetId: mu.tarjetId,
          rol: mu.rol
        }, t);
      }
      
      // 8. Descontar saldo comprador
      await buyerTarjet.update({
        balance: buyerTarjet.balance - totalAmount
      }, { transaction: t });

      // 9. Acreditar saldo vendedor
      await sellerTarjet.update({
        balance: sellerTarjet.balance + totalAmount
      }, { transaction: t });

      // 10. Crear snapshot
      await SnapshotService.create({
        movementId: movement.id,
        buyerName: `${buyerUser.name} ${buyerUser.surname}`,
        sellerName: `${sellerUser.name} ${sellerUser.surname}`,
        productName: product.name,
        last4Tarjet: last4Seller,
        quantity: data.quantity,
        amount: totalAmount,
        date: data.date || new Date()
      }, t);

      await t.commit();

      return await this.getById(movement.id);

    } catch (error) {
      await t.rollback();

      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear el movimiento', 400, error);
    }
  }
};
