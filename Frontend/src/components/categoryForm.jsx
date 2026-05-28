import { useState, useEffect } from "react";

function CategoryForm({ initialData, onSubmit, onCancel, error }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setName(initialData.name);
    else setName("");
  }, [initialData]);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!name.trim()) return;

    try {
      setLoading(true);
      await onSubmit({ name: name.trim() });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="category-form" noValidate>
      <label>Nombre</label>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la categoría"
      />

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <div className="buttons">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>

        <button type="button" className="btn" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
