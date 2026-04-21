import { useCart } from "../../context/cartContext";
import { Link } from "react-router-dom";
import CartItem from "../../components/Cards/cartsCard/cartItem";
import "./cart.css";

export default function CartPage() {
  const { cart, loading, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.Product.price,
    0
  );

  if (loading) return <p className="cart-loading">Cargando carrito...</p>;

  return (
    <div className="cart-container">
      <h1>Mi carrito</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>No tenés productos en el carrito 😢</p>
          <Link to="/products" className="btn-primary">Ver productos</Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${totalPrice.toLocaleString()}</h2>

            <div className="cart-buttons">
              <button className="btn-secondary" onClick={clearCart}>
                Vaciar carrito
              </button>

              <Link to="/checkout" className="btn-primary">
                Ir a pagar
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}