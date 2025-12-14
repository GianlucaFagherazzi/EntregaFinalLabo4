import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTarjetById, updateTarjetBalance, deleteTarjet } from "../../services/tarjetServices"; // Asegúrate de tener la función deleteTarjet en el servicio
import ConfirmDialog from "../../components/ConfirmDialog";

export default function TarjetDetail() {
  const { id } = useParams();
  const [tarjet, setTarjet] = useState(null);

  // Estados para el modal de acreditación y de confirmación de eliminación
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);  // Estado para mostrar el modal de eliminación

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

  // Lógica para eliminar la tarjeta
  async function handleDeleteTarjet() {
    try {
      console.log(id);
      await deleteTarjet(id);  
      alert("Tarjeta eliminada con éxito.");
      window.location.href = "/tarjetas";  // Redirige al listado de tarjetas o página de inicio
    } catch (err) {
      alert("Error al eliminar la tarjeta");
    } finally {
      setShowDeleteConfirm(false); // Cierra el modal de confirmación de eliminación
    }
  }


  if (!tarjet) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Datos de la Tarjeta</h2>

      <p><b>Número:</b> {tarjet.number}</p>
      <p><b>Balance actual:</b> ${tarjet.balance}</p>

      <button onClick={handleAcreditar}>Acreditar saldo</button>

      {/* ConfirmDialog para Acreditación */}
      {showConfirm && (
        <ConfirmDialog
          title="Acreditar saldo"
          message={
            <>
              <p>Ingrese el monto a acreditar:</p>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </>
          }
          confirmText="Acreditar"
          cancelText="Cancelar"
          onConfirm={handleAcreditar}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* ConfirmDialog para eliminar tarjeta */}
      <button 
        onClick={() => setShowDeleteConfirm(true)} 
          style={{
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            border: "none"
          }}
        >
        Eliminar tarjeta
      </button>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Eliminar tarjeta"
          message="⚠️ ¿Está seguro que quiere eliminar esta tarjeta? No podrá acceder a ella nuevamente."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDeleteTarjet}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
