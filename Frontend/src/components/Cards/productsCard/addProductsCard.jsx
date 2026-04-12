import { useNavigate } from "react-router-dom";
import "../../../styles/cards.css";

export default function AddProductCard() {
  const navigate = useNavigate();

  return (
    <div
      className="card add"
      onClick={() => navigate("/products/create")}
    >
      <span className="plus">+</span>
      <p>Añadir producto</p>
    </div>
  );
}