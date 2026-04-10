import api from "./api";

export async function getUsers() {
  try {
    const res = await api.get("/users")
    return res.data.data
  } catch (err) {
    console.error("Error fetching users:", err)
    throw err
  }
}

export async function getUserById(id) {
  try {
    const res = await api.get(`/users/${id}/parsed`)
    return res.data.data.user
  } catch (err) {
    console.error("Error fetching user by ID:", err)
    throw err
  } 
}

export async function updateUser(id, data) {
  try {
    const res = await api.put(`/users/${id}`, data)
    return res.data
  } catch (err) {
    console.error("Error updating user:", err)
    throw err
  }
}

export async function deactivateUser(id) {
  try {
    const res = await api.put(`/users/${id}/deactivate`)
    return res.data.data
  } catch (err) {
    console.error("Error deactivating user:", err)
    throw err
  }
}

export async function activateUser(id) {
  try {
    const res = await api.put(`/users/${id}/activate`)
    return res.data.data
  } catch (err) {
    console.error("Error activating user:", err)
    throw err
  }
}