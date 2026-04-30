<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../services/categoriesServices";
import Modal from "../../components/modal";
import CategoryForm from "../../components/categoryForm";
import CategoriesCard from "../../components/Cards/categoriesCard/categoriesCard";
import "../../styles/categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formError, setFormError] = useState(null);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error al cargar las categorias", err);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openCreateModal() {
    setEditingCategory(null);
    setFormError(null); 
    setIsModalOpen(true);
  }

  function handleEdit(category) {
    setEditingCategory(category);
    setFormError(null);
    setIsModalOpen(true);
  }

  // guardar (crear o editar) con manejo de error del backend
  async function handleSubmitCategory(data) {
    try {
      setFormError(null);

      if (editingCategory) {
        await updateCategory(editingCategory.id, data);
      } else {
        await createCategory(data);
      }

      setIsModalOpen(false);
      setEditingCategory(null);
      await loadCategories();
    } catch (err) {
      const backendMessage = err.response?.data?.error || "Error al guardar la categoría";

      setFormError(backendMessage); 
    }
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("¿Seguro que querés eliminar?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      await loadCategories();
      alert("Categoría eliminada correctamente");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="categories-container">
      <h1 className="categories-title">Listado de categorias</h1>

      <button onClick={openCreateModal} className="btn-create">
        Crear categoría
      </button>

      <div className="categories-grid">
        {categories.map((c) => (
          <CategoriesCard
            key={c.id}
            category={c}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Editar categoría" : "Nueva categoría"}
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSubmitCategory}
          onCancel={() => setIsModalOpen(false)}
          error={formError}
        />
      </Modal>
    </div>
  );
}

export default Categories;
>>>>>>> origin/Gianluca
