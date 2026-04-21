import { useCart } from "../../../context/cartContext";

export default function CartItem({ item }) {
  const { removeFromCart, addToCart } = useCart();

  const { Product: product, quantity } = item;

  function increase() {
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
      <img src={product.imageUrl} alt={product.title} />

      <div className="cart-item-info">
        <h3>{product.title}</h3>
        <p>${product.price.toLocaleString()}</p>

        <div className="cart-quantity">
          <button onClick={decrease}>-</button>
          <span>{quantity}</span>
          <button onClick={increase}>+</button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        ${(product.price * quantity).toLocaleString()}
      </div>

      <button
        className="cart-remove"
        onClick={() => removeFromCart(product.id)}
      >

      </button>
    </div>
  );
}