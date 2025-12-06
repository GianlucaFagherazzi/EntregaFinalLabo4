const API_URL = import.meta.env.VITE_API_URL;
const API_PORT = import.meta.env.VITE_API_PORT;

export async function getUsers() {
  const response = await fetch(`${API_URL}${API_PORT}/api/users`);
  const data = await response.json();
  return data.data; // solo el array de usuarios
}
