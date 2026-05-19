import { useEffect, useState } from "react";
import { getMyAccounts } from "../../services/accountServices";
import { getTarjetsByAccount } from "../../services/tarjetServices";
import { checkoutRequest } from "../../services/checkoutService";
import { getMyCart } from "../../services/cartServices";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [tarjets, setTarjets] = useState([]);
  const [cart, setCart] = useState(null);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedTarjet, setSelectedTarjet] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAccounts();
    loadCart();
  }, []);

  // cargar carrito
  const loadCart = async () => {
    try {
      const data = await getMyCart();
      setCart(data);
    } catch (err) {
      console.error(err);
      alert("Error cargando carrito");
    }
  };

  // cargar cuentas
  const loadAccounts = async () => {
    try {
      const data = await getMyAccounts();
      setAccounts(data);
    } catch (err) {
      alert("Error cargando cuentas");
    }
  };

  // cargar tarjetas al cambiar cuenta
  useEffect(() => {
    if (!selectedAccount) return;
    loadTarjets(selectedAccount);
  }, [selectedAccount]);

  const loadTarjets = async (accountId) => {
    try {
      const data = await getTarjetsByAccount(accountId);
      setTarjets(data);
    } catch (err) {
      alert("Error cargando tarjetas");
    }
  };

  // total carrito
  const total = cart?.Items?.reduce(
    (acc, item) => acc + item.quantity * item.Product.price,
    0
  ) || 0;

  // checkout
  const handleCheckout = async () => {
    if (!selectedAccount || !selectedTarjet)
      return alert("Seleccioná cuenta y tarjeta");

    try {
      setLoading(true);

      await checkoutRequest({
        accountId: Number(selectedAccount),
        tarjetId: Number(selectedTarjet)
      });

      alert("Compra realizada con éxito");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error al procesar compra");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <h2>Cargando checkout...</h2>;

  return (
    <div className="checkout-grid">

      {/* RESUMEN */}
      <div className="checkout-summary">
        <h2>Resumen de compra</h2>

        {cart.Items.length === 0 && <p>Tu carrito está vacío</p>}

        {cart.Items.map(item => (
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

      {/* PAGO */}
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
          disabled={loading || cart.Items.length === 0}
        >
          {loading ? "Procesando..." : "Pagar ahora"}
        </button>
      </div>

    </div>
  );
}