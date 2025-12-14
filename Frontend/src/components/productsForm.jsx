import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProductById, updateProduct } from "../services/productsServices";
import { getCategories } from "../services/categoriesServices";
import { AuthContext } from "../context/authContext";

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
    categoryId: ""
  });
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    loadCategories();

    if (isEdit) {
      loadProduct();
    }
  }, [id]);

  async function loadCategories() {
    const cats = await getCategories();
    setCategories(cats);
  }

  async function loadProduct() {
    const product = await getProductById(id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId ?? ""
    });
  }


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
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
        userId: user.id
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
    <div className="form-container">
      <h1>{isEdit ? "Editar producto" : "Crear producto"}</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button className="btn" disabled={loading}>
          {loading
            ? "Guardando..."
            : isEdit
              ? "Guardar cambios"
              : "Crear producto"}
        </button>

      </form>
    </div>
  );
}
