import { useEffect, useState } from "react";
import { getMyPurchases } from "../../services/snapshotService";
import "../../styles/orders.css";
import "../../styles/generalContainer.css";


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
    <div className="general-container">
      <h2>Mis compras</h2>

      {orders.length === 0 ? (
        <p>No realizaste compras aún</p>
      ) : (
        orders.map(o => (
          <div key={o.id} className="order-card">
            <h3>{o.productName}</h3>
            <p>Vendedor: {o.sellerName}</p>
            <p>Cantidad: {o.quantity}</p>
            <p>${o.amount.toLocaleString()}</p>
            <p>**** {o.last4Tarjet}</p>
            <small>{new Date(o.date).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}