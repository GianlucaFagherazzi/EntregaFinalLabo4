import "../../../styles/buttons.css";

function CategoriesCard({ category, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2>{category.name}</h2>

      <div className="buttons">
        <button className="btn" onClick={() => onEdit(category)}>Editar</button>
        <button className="btn outline" onClick={() => onDelete(category.id)}>Borrar</button>
      </div>
    </div>
  );
}
export default CategoriesCard;