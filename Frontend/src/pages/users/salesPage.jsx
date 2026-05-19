import { useEffect, useState } from "react";
import { getMySales } from "../../services/snapshotService";
// import "./orders.css";

export default function SalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    try {
      const data = await getMySales();
      setSales(data);
    } catch {
      alert("Error cargando ventas");
    }
  }

  return (
    <div className="orders-container">
      <h1>Mis ventas</h1>

      {sales.length === 0 && <p>No realizaste ventas aún</p>}

      {sales.map(s => (
        <div key={s.id} className="order-card">
          <h3>{s.productName}</h3>
          <p>Comprador: {s.buyerName}</p>
          <p>Cantidad: {s.quantity}</p>
          <p>Monto: ${s.amount}</p>
          <small>{new Date(s.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}