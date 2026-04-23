import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  updateCategory,
  getCategories,
} from "../services/categoriesServices";
import "../styles/productForm.css";

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) loadCategory();
  }, [id]);

  async function loadCategory() {
    try {
      const categories = await getCategories();
      const cat = categories.find((c) => c.id === Number(id));

      if (cat) {
        setForm({
          name: cat.name || "",
        });
      }
    } catch (err) {
      console.error("Error cargando categoría", err);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (isEdit) {
        await updateCategory(id, form);
      } else {
        await createCategory(form);
      }

      navigate("/categories");
    } catch (err) {
      setError("No se pudo guardar la categoría");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/categories");
  }

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          {isEdit ? "Editar categoría" : "Crear categoría"}
        </h1>

        {error && <p className="error">{error}</p>}

        <form className="form-grid" onSubmit={handleSubmit}>

          {/* NOMBRE */}
          <div className="form-group">
            <label>Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre de la categoría"
              required
            />
          </div>

          {/* BOTONES */}
          <div className="form-row">
            <button className="submit-btn" disabled={loading}>
              {loading
                ? "Guardando..."
                : isEdit
                ? "Guardar cambios"
                : "Crear categoría"}
            </button>

            <button
              type="button"
              className="submit-btn cancel-btn"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}