import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import * as cartService from "../services/cartServices";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  async function loadCart() {
    try {
      const data = await cartService.getMyCart();
      setCart(data?.Items || []);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Error cargando carrito", err);
      }
      setCart([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    loadCart();
  }, [user]);

  async function addToCart(productId, quantity = 1) {
    const updatedCart = await cartService.addItem(productId, quantity);
    setCart(updatedCart.Items);
  }

  async function removeFromCart(productId) {
    const updatedCart = await cartService.removeItem(productId);
    setCart(updatedCart.Items);
  }

  async function clearCart() {
    await cartService.clearCart();
    setCart([]);
  }

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);