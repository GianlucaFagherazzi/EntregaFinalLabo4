function CategoriesCard({ category, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2>{category.name}</h2>

      <div className="card-buttons">
        <button onClick={() => onEdit(category)}>Editar</button>
        <button onClick={() => onDelete(category.id)}>Borrar</button>
      </div>
    </div>
  );
}
export default CategoriesCard;