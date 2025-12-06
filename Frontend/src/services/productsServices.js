const API_URL = import.meta.env.VITE_API_URL;
const API_PORT = import.meta.env.VITE_API_PORT;

export async function getProducts() {
  const response = await fetch(`${API_URL}${API_PORT}/api/products`);
  const data = await response.json();
  return data.data; // solo el array de productos
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}${API_PORT}/api/products/${id}`);
  const data = await response.json();
  return data.data; // solo el producto
}
