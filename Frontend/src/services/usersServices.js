
export async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users");
  const data = await response.json();
  return data.data; // solo el array de usuarios
}
