import api from "./api";

export async function getMyCart() {
	try {
		const res = await api.get("/cart");
				console.log("get cart", res.data);

		return res.data.data;
	} catch (err) {
		console.error("Error fetching cart:", err);
		throw err;
	}
}

export async function addItem(productId, quantity) {
	try {
		const res = await api.post("/cart/items", { productId, quantity });
				console.log("add item cart", res.data);

		return res.data.data;
	} catch (err) {
		console.error("Error adding item to cart:", err);
		throw err;
	}
}

export async function removeItem(productId) {
	try {
		const res = await api.delete(`/cart/items/${productId}`);
				console.log("remove item cart", res.data);
		return res.data.data;
	} catch (err) {
		console.error("Error removing item from cart:", err);
		throw err;
	}
}

export async function clearCart() {
	try {
		const res = await api.delete("/cart");
		console.log("clear cart", res.data);
		return res.data.data;
	} catch (err) {
		console.error("Error clearing cart:", err);
		throw err;
	}
}