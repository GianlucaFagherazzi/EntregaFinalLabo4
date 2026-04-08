import api from "./api";

export async function registerUser(userData) {
  try {
    const res = await api.post("/users", userData)
    return res.data
  } catch (err) {
    console.error("Error registering user:", err)
    throw err
  }
}

export async function loginUser(credentials) {
  try {
    const res = await api.post("/users/login", credentials)
    return res.data
  } catch (err) {
    console.error("Error al iniciar sesion:", err)
    throw err
  }
}
