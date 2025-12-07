import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoriesServices";
import CategoriesCard from "../../components/Cards/categoriesCard";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (err) {
        console.error("Error al cargar las categorias", err);
      }
    }
    load();
  }, []);

  return (
    <div className="categories-container">
      <h1 className="categories-title">Listado de categorias</h1>

      <div className="categories-grid">
        {categories.map((c) => (
          <CategoriesCard key={c.id} category={c} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
