import { useState, useEffect } from "react";

function CategoryForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) setName(initialData.name);
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name });
  }

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <label>Nombre</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la categoría"
      />

      <div className="form-buttons">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;