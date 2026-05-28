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
import "../../styles/generalContainer.css";

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
    <div className="general-container">
      <h2>Listado de categorias</h2>

      <div className="cards-grid">
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
      
      <button onClick={openCreateModal} className="btn create-btn">
        Crear categoría
      </button>
    </div>
  );
}

export default Categories;
