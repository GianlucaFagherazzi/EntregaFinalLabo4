
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function Cart() {
    const { cart, addToCart, decreaseQty, removeFromCart, clearCart, total  } =
        useContext(CartContext);

    return (
        <div>
            <h2>Carrito</h2>

            {cart.map(item => (
                <div key={item.id} style={{ marginBottom: 10 }}>
                    <strong>{item.name}</strong> - ${item.price}

                    <div> 
                        <button className="btn"  onClick={() => decreaseQty(item.id)}>-</button>

                        <span>  x   {item.qty}</span>

                        <button className="btn"  onClick={() => addToCart(item)}>+</button>

                        <button className="btn"  onClick={() => removeFromCart(item.id)}>X</button>

                    </div>
                </div>
            ))}

            <p><strong>Total:</strong> ${total}</p>

            {cart.length > 0 && (
                <button className="btn"  onClick={clearCart}>Vaciar carrito</button>
            )}
        </div>
    );
}
