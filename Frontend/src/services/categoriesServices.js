
export async function getCategories() {
  const response = await fetch("http://localhost:3000/api/categories");
  const data = await response.json();
  return data.data; // solo el array de categorias
}
