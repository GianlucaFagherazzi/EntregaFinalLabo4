import { sequelize } from "../config/database.js";
import { Cart, CartItem, Product, User } from "../models/index.models.js";
import { AppError } from "../utils/app.error.js";

import { MovementService } from "./movements.services.js";
import { AccountService } from "./accounts.services.js";
import { TarjetService } from "./tarjets.services.js";

export const CheckoutService = {

  async checkout(userId, accountId, tarjetId) {
    const t = await sequelize.transaction();

    try {
      // Obtener carrito del usuario
      const cart = await Cart.findOne({
        where: { userId },
        include: [
          {
            model: CartItem,
            as: "Items",
            include: [
              {
                model: Product,
                as: "Product",
                include: [{ model: User, as: "User" }]
              }
            ]
          }
        ],
        transaction: t
      });

      if (!cart || !cart.Items.length) {
        throw new AppError("El carrito está vacío", 400);
      }

      // Obtener datos del comprador
      const buyerAccount = await AccountService.getById(accountId);
      const buyerTarjet = await TarjetService.getById(tarjetId);

      // Validar ownership del comprador
      if (buyerAccount.userId !== userId)
        throw new AppError("La cuenta no pertenece al usuario", 403);

      if (buyerTarjet.accountId !== buyerAccount.id)
        throw new AppError("La tarjeta no pertenece a la cuenta", 403);

      const movementsCreated = [];

      // Procesar cada producto del carrito
      for (const item of cart.Items) {
        const product = item.Product;
        const seller = product.User;

        // Necesitamos que cada usuario tenga una cuenta y tarjeta por defecto
        const sellerAccount = await AccountService.getDefaultByUserId(seller.id);
        const sellerTarjet = await TarjetService.getDefaultByAccountId(sellerAccount.id);

        const movement = await MovementService.create({
          productId: product.id,
          quantity: item.quantity,
          movementUsers: [
            {
              userId: userId,
              accountId: buyerAccount.id,
              tarjetId: buyerTarjet.id,
              rol: "buyer"
            },
            {
              userId: seller.id,
              accountId: sellerAccount.id,
              tarjetId: sellerTarjet.id,
              rol: "seller"
            }
          ]
        });

        movementsCreated.push(movement);
      }

      // Vaciar carrito
      await CartItem.destroy({
        where: { cartId: cart.id },
        transaction: t
      });

      await t.commit();

      return {
        message: "Compra realizada con éxito",
        movements: movementsCreated
      };

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};