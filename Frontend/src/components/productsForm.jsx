import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProductById, updateProduct,} from "../services/productsServices";
import { getCategories } from "../services/categoriesServices";
import { AuthContext } from "../context/authContext";
import "../styles/productForm.css";

export default function ProductForm() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    if (isEdit) loadProduct();
  }, [id]);

  async function loadCategories() {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      console.error("Error cargando categorías", err);
    }
  }

  async function loadProduct() {
    try {
      const product = await getProductById(id);
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        categoryId: product.categoryId ?? "",
      });
    } catch (err) {
      console.error("Error cargando producto", err);
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
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
        userId: user.id,
      };

      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }

      navigate("/products/myProducts");
    } catch (err) {
      setError("No se pudo guardar el producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">

        <h1 className="form-title">
          {isEdit ? "Editar producto" : "Crear producto"}
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
              required
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* PRECIO + STOCK */}
          <div className="form-row">
            <div className="form-group">
              <label>Precio</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* CATEGORÍA */}
          <div className="form-group">
            <label>Categoría</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* BOTÓN */}
          <button className="submit-btn" disabled={loading}>
            {loading
              ? "Guardando..."
              : isEdit
              ? "Guardar cambios"
              : "Crear producto"}
          </button>

        </form>
      </div>
    </div>
  );
}