import { useNavigate, useParams } from "react-router-dom";
import "./tarjetCard.css";

export default function AddTarjet() {
  const navigate = useNavigate();
  const { id } = useParams(); // id de la cuenta

  return (
    <div
      className="tarjet-card add"
      onClick={() => navigate(`/nueva-tarjeta/${id}`)}
    >
      <h3>➕ Agregar Tarjeta</h3>
    </div>
  );
}
