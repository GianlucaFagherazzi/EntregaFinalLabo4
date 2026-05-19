import { useEffect, useState } from "react";
import { getMyPurchases } from "../../services/snapshotService";
// import "./orders.css";

export default function PurchasesPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getMyPurchases();
      setOrders(data);
    } catch {
      alert("Error cargando compras");
    }
  }

  return (
    <div className="orders-container">
      <h1>Mis compras</h1>

      {orders.length === 0 && <p>No realizaste compras aún</p>}

      {orders.map(o => (
        <div key={o.id} className="order-card">
          <h3>{o.productName}</h3>
          <p>Vendedor: {o.sellerName}</p>
          <p>Cantidad: {o.quantity}</p>
          <p>Monto: ${o.amount}</p>
          <p>Tarjeta: **** {o.last4Tarjet}</p>
          <small>{new Date(o.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}