import { useEffect, useState } from "react";
import { getSnapshots } from "../../services/snapshotService";
import "./snapshots.css";
import "../../styles/generalContainer.css";

export default function SnapshotsPage() {
  const [snapshots, setSnapshots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSnapshots();
  }, []);

  const loadSnapshots = async () => {
    try {
      const data = await getSnapshots();
      setSnapshots(data);
    } catch (err) {
      alert("Error cargando snapshots");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Cargando snapshots...</h2>;

  return (
    <div className="general-container">
      <h2>Historial de Compras</h2>

      <div className="snapshots-table">
        <div className="snapshots-header">
          <span>Fecha</span>
          <span>Comprador</span>
          <span>Vendedor</span>
          <span>Producto</span>
          <span>Cant.</span>
          <span>Monto</span>
          <span>Tarjeta</span>
        </div>

        {snapshots.map(s => (
          <div key={s.id} className="snapshot-row">
            <span>{new Date(s.date).toLocaleString()}</span>
            <span>{s.buyerName}</span>
            <span>{s.sellerName}</span>
            <span>{s.productName}</span>
            <span>{s.quantity}</span>
            <span>${s.amount.toLocaleString()}</span>
            <span>**** {s.last4Tarjet}</span>
          </div>
        ))}

        {!snapshots.length && <p>No hay compras registradas</p>}
      </div>
    </div>
  );
}