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
			// Validar cantidad
			if (!quantity || quantity === 0) {
				throw new AppError('Cantidad inválida', 400);
			}

			// Verificar producto
			const product = await Product.findByPk(productId);
			if (!product) throw new AppError('Producto no encontrado', 404);

			if (product.stock <= 0) {
				throw new AppError('El producto no tiene stock disponible', 400);
			}

			const cart = await this.getMyCart(userId);

			const existingItem = await CartItem.findOne({
				where: { cartId: cart.id, productId }
			});

			// SI YA EXISTE EN CARRITO
			if (existingItem) {
				const newQuantity = existingItem.quantity + quantity;

				// Si queda en 0 o menos → eliminar item
				if (newQuantity <= 0) {
					await existingItem.destroy();
					return await this.getMyCart(userId);
				}

				// No permitir superar stock
				if (newQuantity > product.stock) {
					throw new AppError(
						`Solo hay ${product.stock} unidades disponibles`,
						400
					);
				}

				existingItem.quantity = newQuantity;
				await existingItem.save();
			}
			// SI NO EXISTE → CREAR ITEM
			else {
				// No permitir crear con cantidad negativa
				if (quantity < 0) {
					throw new AppError('No se puede agregar cantidad negativa', 400);
				}

				// No permitir superar stock
				if (quantity > product.stock) {
					throw new AppError(
						`Solo hay ${product.stock} unidades disponibles`,
						400
					);
				}

				await CartItem.create({
					cartId: cart.id,
					productId,
					quantity
				});
			}

			return await this.getMyCart(userId);

		} catch (error) {
			if (error instanceof AppError) throw error;
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