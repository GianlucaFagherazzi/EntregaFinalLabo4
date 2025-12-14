import api from './api'

// Traer todos los productos
export async function getProducts(filters) {
  try {
    console.log('Fetching products with filters:', filters)
    const clean = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, v]) => v !== null && v !== "" && v !== undefined
      )
    )

    const params = new URLSearchParams(clean).toString()
    const res = await api.get(`/products?${params}`)

    console.log('Fetched products:', res.data.data)
    return res.data.data
  } catch (err) {
    console.error('Error fetching products:', err)
    throw err
  }
}

export async function getProductById(id) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data.data;
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    throw err;
  }
}

export async function createProduct(data) {
  try {
    const res = await api.post("/products", data);
    return res.data.data;
  } catch (err) {
    console.error("Error creating product:", err)
    throw err
  }
}

export async function updateProduct(id, data) {
  try {
    const res = await api.put(`/products/${id}`, data);
    return res.data.data;
  } catch (err) {
    console.error(`Error updating product ${id}:`, err)
    throw err
  }
}

export async function deleteProduct(id) {
  try {
    return await api.put(`/products/${id}/deactivate`);
  } catch (err) {
    console.error("Error deleting product", err);
    throw err;
  }
}
