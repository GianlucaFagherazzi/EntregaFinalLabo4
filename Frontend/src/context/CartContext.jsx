import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                // sumamos cantidad
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            // si no está, lo agregamos con qty 1
            return [...prev, { ...product, qty: 1 }];
        });
    }

    // eliminamos el producto del carrito
    function removeFromCart(id) {
        setCart(prev => prev.filter(p => p.id !== id));
    }

    function clearCart() {
        setCart([]);
    }

    function decreaseQty(id) {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0) // si llega a 0 se elimina del carrito
        );
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQty,
        total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}