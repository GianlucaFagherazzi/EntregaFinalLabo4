import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTarjetById, updateTarjetBalance, deleteTarjet } from "../../services/tarjetServices";
import ConfirmDialog from "../../components/confirmDialog";
import "./tarjetDetail.css";
import "../../styles/buttons.css";
import "../../styles/generalContainer.css";

export default function TarjetDetail() {
  const { id } = useParams();
  const [tarjet, setTarjet] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  async function loadTarjet() {
    try {
      const data = await getTarjetById(id);
      setTarjet(data);
    } catch (err) {
      console.error("Error cargando tarjeta", err);
    }
  }

  useEffect(() => {
    loadTarjet();
  }, [id]);

  async function handleAcreditar() {
    const monto = Number(prompt("Ingrese el monto a acreditar:"));

    if (!monto || monto <= 0) {
      return alert("Monto inválido");
    }

    await updateTarjetBalance(id, monto);
    await loadTarjet();
    alert("Saldo acreditado con éxito");
  }

  // logica para eliminar la tarjeta
  async function handleDeleteTarjet() {
    try {
      await deleteTarjet(id);  
      alert("Tarjeta eliminada con éxito.");
      window.location.href = "/accounts";  // redirige al listado de cuentas
    } catch (err) {
      alert("Error al eliminar la tarjeta");
    } finally {
      setShowDeleteConfirm(false); // cierra el modal de confirmación de eliminación
    }
  }


  if (!tarjet) return <p>Cargando...</p>;

  return (
    <div className="general-container tarjet-detail-container">
      <h2>Datos de la Tarjeta</h2>

      <div className="tarjet-detail-info">
        <p><b>Número:</b> {tarjet.number}</p>
        <p><b>Balance actual:</b> ${tarjet.balance.toLocaleString()}</p>
      </div>

      <div className="tarjet-detail-actions">
        <button className="btn" onClick={handleAcreditar}>
          Acreditar saldo
        </button>
        <button className="btn" onClick={() => setShowDeleteConfirm(true)}>
          Eliminar tarjeta
        </button>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Eliminar tarjeta"
          message="¿Está seguro que quiere eliminar esta tarjeta? No podrá acceder a ella nuevamente."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDeleteTarjet}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
