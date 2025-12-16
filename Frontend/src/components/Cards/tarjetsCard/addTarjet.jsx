import { useNavigate, useParams } from "react-router-dom";
import "./tarjetCard.css";

export default function AddTarjet() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div
      className="tarjet-card"
      onClick={() => navigate(`/nueva-tarjeta/${id}`)}
    >
      <h3>➕ Agregar Tarjeta</h3>
    </div>
  );
}
