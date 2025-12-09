import api from "./api";

export function getUsers() {
  return api.get("/users")
    .then(res => res.data.data)
    .catch(err => {
      console.error("Error fetching users:", err);
      throw err;
    });
}

export async function updateUser(id, data) {
  const token = localStorage.getItem("token"); // ✅ SIN JSON.parse

  console.log("TOKEN EN PUT:", token); // 👈 dejalo por ahora

  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error actualizando usuario");
  }

  return response.json();
} 

export function deactivateUser(id) {
  return api.put(`/users/${id}/deactivate`)
    .then(res => res.data.data)
    .catch(err => {
      console.error("Error al desactivar cuenta:", err);
      throw err;
    });
}
/*
export async function deactivateUser(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/users/${id}/deactivate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al desactivar cuenta");
  }

  return response.json();
}
*/
