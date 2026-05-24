import { useCart } from "../../context/cartContext";
import { Link } from "react-router-dom";
import CartItem from "../../components/Cards/cartsCard/cartItem";
import "./cart.css";
import "../../styles/buttons.css";

export default function CartPage() {
  const { cart, loading, clearCart } = useCart();

const totalPrice = cart.reduce(
  (acc, item) => acc + item.quantity * item.Product.price,
  0
);

  if (loading) return <p className="cart-loading">Cargando carrito...</p>;

  return (
    <div className="cart-wrap">
      <div className="cart-header">
        <h1>Mi carrito</h1>
        <span className="cart-count-badge">{cart.length} productos</span>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>No tenés productos en el carrito 😢</p>
          <Link to="/products" className="btn-browse">Ver productos</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>

          <div className="cart-summary-card">
            <p className="summary-title">Resumen</p>

            <div className="free-shipping">
              <i className="ti ti-truck" aria-hidden="true" />
              Envío gratis en todos los productos
            </div>

            <div className="summary-row"><span>Subtotal</span><span>${totalPrice.toLocaleString()}</span></div>
            <div className="summary-row"><span>Envío</span><span style={{ color: '#1a7a4a', fontWeight: 500 }}>Gratis</span></div>
            <div className="summary-row total"><span>Total</span><span>${totalPrice.toLocaleString()}</span></div>

            <Link to="/checkout" className="btn-checkout">
              <i className="ti ti-lock" aria-hidden="true" />
              Finalizar compra
            </Link>
            <button className="btn-clear" onClick={clearCart}>Vaciar carrito</button>
          </div>
        </div>
      )}
    </div>
  );
}