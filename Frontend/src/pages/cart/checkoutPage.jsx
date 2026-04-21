import { useCart } from "../../context/cartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  async function handleBuy() {
    alert("Compra simulada realizada 🎉");
    await clearCart();
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        {cart.map(item => (
          <div key={item.productId} className="checkout-item">
            <span>{item.product.title} x{item.quantity}</span>
            <span>
              ${(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}

        <hr />
        <h2>Total a pagar: ${total.toLocaleString()}</h2>

        <button className="btn-primary" onClick={handleBuy}>
          Confirmar compra
        </button>
      </div>
    </div>
  );
}