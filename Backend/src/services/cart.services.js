import { AppError } from '../utils/app.error.js'
import { Cart, CartItem, Product } from '../models/index.models.js';

export const CartService = {
	async getMyCart(userId) {
		try {
			const cart = await Cart.findOne({
				where: { userId },
				include: [{
					model: CartItem,
					as: "Items",
					include: [{ model: Product, as: "Product" }]
				}]
			});

			if (cart) return cart;

			// Si no existe, lo creamos
			const newCart = await Cart.create({ userId });

			return await Cart.findByPk(newCart.id, {
				include: [{
					model: CartItem,
					as: "Items",
					include: [{ model: Product, as: "Product" }]
				}]
			});

		} catch (error) {
			throw new AppError('Error al obtener el carrito', 500, error);
		}
	},

	async addItemToCart(userId, productId, quantity) {
		try {
			const cart = await this.getMyCart(userId);

			const existingItem = await CartItem.findOne({
				where: { cartId: cart.id, productId }
			});

			if (existingItem) {
				existingItem.quantity += quantity;
				await existingItem.save();
			} else {
				await CartItem.create({
					cartId: cart.id,
					productId,
					quantity
				});
			}

			return await this.getMyCart(userId);

		} catch (error) {
			throw new AppError('Error al agregar el producto al carrito', 500, error);
		}
	},

	async removeItemFromCart(userId, productId) {
		try {
			const cart = await this.getMyCart(userId);

			const item = await CartItem.findOne({
				where: { cartId: cart.id, productId }
			});

			if (!item) throw new AppError('Producto no encontrado en el carrito', 404);

			await item.destroy();

			return await this.getMyCart(userId);

		} catch (error) {
			throw new AppError('Error al eliminar el producto del carrito', 500, error);
		}
	},

	async clearCart(userId) {
		try {
			const cart = await this.getMyCart(userId);

			await CartItem.destroy({
				where: { cartId: cart.id }
			});

			return await this.getMyCart(userId);

		} catch (error) {
			throw new AppError('Error al vaciar el carrito', 500, error);
		}
	}
}