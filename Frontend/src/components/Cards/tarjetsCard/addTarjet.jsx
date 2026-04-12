import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/cards.css";
import "./tarjetsCard.css";

export default function AddTarjet() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div
      className="card add"
      onClick={() => navigate(`/nueva-tarjeta/${id}`)}
    >
      <h3>➕ Agregar Tarjeta</h3>
    </div>
  );
}
