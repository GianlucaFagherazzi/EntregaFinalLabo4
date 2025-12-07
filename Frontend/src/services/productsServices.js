import api from './api'

// Traer todos los productos
export function getProducts() {
  try {
    return api.get('/products').then(res => res.data.data)
  } catch (err) {
    console.error('Error fetching products:', err)
    throw err
  }
}

// Traer un producto por ID
export function getProductById(id) {
  try {
    return api.get(`/products/${id}`).then(res => res.data.data)
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err)
    throw err
  }
}
