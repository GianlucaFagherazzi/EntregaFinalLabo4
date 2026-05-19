import { useEffect, useState } from "react";
import { getMyAccounts } from "../../services/accountServices";
import { getTarjetsByAccount } from "../../services/tarjetServices";
import { checkoutRequest } from "../../services/checkoutService";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import "./checkout.css";

export default function CheckoutPage() {
  const navigate = useNavigate();

  // carrito GLOBAL desde context
  const { cart, clearCart } = useCart();

  const [accounts, setAccounts] = useState([]);
  const [tarjets, setTarjets] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedTarjet, setSelectedTarjet] = useState("");
  const [loading, setLoading] = useState(false);

  // cargar cuentas al montar
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await getMyAccounts();
      setAccounts(data);
    } catch (err) {
      console.error(err);
      alert("Error cargando cuentas");
    }
  };

  // cargar tarjetas cuando cambia la cuenta
  useEffect(() => {
    if (!selectedAccount) return;
    loadTarjets(selectedAccount);
  }, [selectedAccount]);

  const loadTarjets = async (accountId) => {
    try {
      const data = await getTarjetsByAccount(accountId);
      setTarjets(data);
    } catch (err) {
      console.error(err);
      alert("Error cargando tarjetas");
    }
  };

  // total del carrito
  const total =
    cart?.reduce((acc, item) => acc + item.quantity * item.Product.price, 0) ||
    0;

  // checkout
  const handleCheckout = async () => {
    if (!selectedAccount || !selectedTarjet)
      return alert("Seleccioná cuenta y tarjeta");

    try {
      setLoading(true);

      await checkoutRequest({
        accountId: Number(selectedAccount),
        tarjetId: Number(selectedTarjet),
      });

      // sincroniza TODA la app
      await clearCart();

      alert("Compra realizada con éxito");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error al procesar compra");
    } finally {
      setLoading(false);
    }
  };

  // mientras carga context
  if (!cart) return <h2>Cargando checkout...</h2>;

  return (
    <div className="checkout-grid">

      {/* RESUMEN */}
      <div className="checkout-summary">
        <h2>Resumen de compra</h2>

        {cart.length === 0 && <p>Tu carrito está vacío</p>}

        {cart.map(item => (
          <div key={item.id} className="checkout-item">
            <div>
              <strong>{item.Product.name}</strong>
              <p>Cantidad: {item.quantity}</p>
            </div>

            <span>
              ${(item.quantity * item.Product.price).toFixed(2)}
            </span>
          </div>
        ))}

        <hr />
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>

      {/* MEDIOS DE PAGO */}
      <div className="checkout-payment">
        <h2>Medio de pago</h2>

        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option value="">Seleccionar cuenta</option>
          {accounts.map(acc => (
            <option key={acc.id} value={acc.id}>
              CBU: {acc.cbu}
            </option>
          ))}
        </select>

        {selectedAccount && (
          <select
            value={selectedTarjet}
            onChange={(e) => setSelectedTarjet(e.target.value)}
          >
            <option value="">Seleccionar tarjeta</option>
            {tarjets.map(t => (
              <option key={t.id} value={t.id}>
                Tarjeta {t.number}
              </option>
            ))}
          </select>
        )}

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading || cart.length === 0}
        >
          {loading ? "Procesando..." : "Pagar ahora"}
        </button>
      </div>
    </div>
  );
}