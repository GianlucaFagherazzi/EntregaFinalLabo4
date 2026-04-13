import api from './api'

export async function getCategories() {
  try {
    const res = await api.get('/categories')
    return res.data.data
  } catch (err) {
    console.error('Error fetching categories:', err)
    throw err
  }
}

export async function createCategory(data) {
  try {
    const res = await api.post("/categories", data);
    return res.data;
  } catch (err) {
    console.error("Error creating category:", err);
    throw err;
  }
}

export async function updateCategory(id, data) {
  try {
    const res = await api.put(`/categories/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating category:", err);
    throw err;
  }
}

export async function deleteCategory(id) {
  try {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message;

    throw new Error(message);
  }
}
