import { useCart } from "../../../context/cartContext";
import "../../../styles/buttons.css";

export default function CartItem({ item }) {
  const { removeFromCart, addToCart } = useCart();

  const { Product: product, quantity } = item;

  console.log("CartItem:", item);

  function increase() {
    if (quantity >= product.stock) {
      alert("No hay más stock disponible");
      return;
    }
    addToCart(product.id, 1);
  }

  function decrease() {
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id, -1);
    }
  }

  return (
    <div className="cart-item">
      <img
        className="item-img"
        src={product.imageUrl || "/NotFound.png"}
        alt={product.name}
      />

      <div className="cart-item-info">
        <h3>{product.name}</h3>
        <p>${product.price.toLocaleString()}</p>

        <div className="cart-quantity">
          <button onClick={decrease}> - </button>
          <span>{quantity}</span>
          <button onClick={increase} disabled={quantity >= product.stock}> + </button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        ${(product.price * quantity).toLocaleString()}
      </div>

      <button
        className="btn"
        onClick={() => removeFromCart(product.id)}
      >
        Remove
      </button>
    </div>
  );
}