// cart.jsx
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
    const { cart, addToCart, decreaseQty, removeFromCart, clearCart, total  } =
        useContext(CartContext);

    return (
        <div>
            <h2>Carrito</h2>

            {cart.map(item => (
                <div key={item.id} style={{ marginBottom: 10 }}>
                    <strong>{item.name}</strong> - ${item.price}

                    <div style={{ display: "inline-flex", gap: 10, marginLeft: 20 }}>
                        <button onClick={() => decreaseQty(item.id)}>-</button>

                        <span>x {item.qty}</span>

                        <button onClick={() => addToCart(item)}>+</button>

                        <button onClick={() => removeFromCart(item.id)}>X</button>

                    </div>
                </div>
            ))}

            {/* mostrar total */}
            <p><strong>Total:</strong> ${total}</p>

            {cart.length > 0 && (
                <button onClick={clearCart}>Vaciar carrito</button>
            )}
        </div>
    );
}
