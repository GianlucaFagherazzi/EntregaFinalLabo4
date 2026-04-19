import { useNavigate } from "react-router-dom";
import "../../../styles/cards.css";
import "./categoriesCard.css";

export default function AddCategoryCard() {
  const navigate = useNavigate();

  return (
    <div
      className="card add category-card"
      onClick={() => navigate("/categories/create")}
    >
      <h3>➕ Agregar Categoria</h3>
    </div>
  );
}