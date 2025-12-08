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

// Traer un producto por ID
export async function getProductById(id) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data.data;
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err)
    throw err
  }
}
