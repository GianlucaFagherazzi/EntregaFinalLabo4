import { CartService } from '../services/cart.services.js';

export const CartController = {
	async getMyCart(req, res, next) {
		try {
			const cart = await CartService.getMyCart(req.user.id);
			res.json({ success: true, data: cart });
		} catch (err) {
			next(err);
		}
	},

	async addItemToCart(req, res, next) {
		try {
			const { productId, quantity } = req.body;
			const cart = await CartService.addItemToCart(req.user.id, productId, quantity);
			res.json({ success: true, data: cart });
		} catch (err) {
			next(err);
		}
	},

	async removeItemFromCart(req, res, next) {
		try {
			const { productId } = req.params;
			const cart = await CartService.removeItemFromCart(req.user.id, productId);
			res.json({ success: true, data: cart });
		} catch (err) {
			next(err);
		}
	},

	async clearCart(req, res, next) {
		try {
			const cart = await CartService.clearCart(req.user.id);
			res.json({ success: true, data: cart });
		} catch (err) {
			next(err);
		}
	}
}