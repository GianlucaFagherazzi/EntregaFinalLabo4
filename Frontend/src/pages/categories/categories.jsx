import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, deleteCategory } from "../../services/categoriesServices";
import CategoryCard from "../../components/Cards/categoriesCard/categoriesCard.jsx";
import AddCategoryCard from "../../components/Cards/categoriesCard/addCategoryCard.jsx";
import "../../styles/categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error al cargar categorías", err);
    }
  }

  async function handleDelete(id) {
    const confirmed = confirm("¿Eliminar categoría?");
    if (!confirmed) return;

    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error eliminando categoría", err);
    }
  }

  return (
    <div className="categories-page">
      <div className="categories-container">

        <h1 className="categories-title">Categorías</h1>

        {categories.length === 0 && (
          <p className="empty-message">
            No hay categorías creadas.
          </p>
        )}

        <div className="categories-grid">
          {categories.map(c => (
            <CategoryCard
              key={c.id}
              category={c}
              onEdit={() => navigate(`/categories/edit/${c.id}`)}
              onDelete={() => handleDelete(c.id)}
            />
          ))}

          <AddCategoryCard />
        </div>

      </div>
    </div>
  );
}