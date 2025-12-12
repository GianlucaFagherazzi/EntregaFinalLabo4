import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTarjetById, updateTarjetBalance } from "../../services/tarjetServices";

export default function TarjetDetail() {
  const { id } = useParams();
  const [tarjet, setTarjet] = useState(null);

  async function loadTarjet() {
    try {
      const data = await getTarjetById(id);
      setTarjet(data); // 🔥 Este setTarjet es lo que hace que React renderice de nuevo
    } catch (err) {
      console.error("Error cargando tarjeta", err);
    }
  }

  useEffect(() => {
    loadTarjet();
  }, [id]);

  async function handleAcreditar() {
    const monto = Number(prompt("Ingrese monto a acreditar:"));

    if (!monto || monto <= 0) {
      return alert("Monto inválido");
    }

    await updateTarjetBalance(id, monto);
    await loadTarjet();
    alert("Saldo acreditado con éxito");
  }

  if (!tarjet) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Datos de la Tarjeta</h2>

      <p><b>Número:</b> {tarjet.number}</p>
      <p><b>Balance actual:</b> ${tarjet.balance}</p>

      <button onClick={handleAcreditar}>Acreditar saldo</button>
    </div>
  );
}
