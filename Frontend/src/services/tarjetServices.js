import api from "./api"

export async function getTarjetById(id) {
  try {
    const res = await api.get(`/tarjets/${id}`)
    return res.data.data
  } catch (err) {
    console.error("Error getting tarjet:", err)
    throw err
  }
}

export async function updateTarjetBalance(id, amount) {
  try {
    const res = await api.put(`/tarjets/balance/${id}`, { amount })
    return res.data.data
  } catch (err) {
    console.error("Error updating balance:", err)
    throw err
  }
}

export async function createTarjet(tarjetData) {
  try {
    const res = await api.post("/tarjets", tarjetData)
    return res.data
  } catch (err) {
    console.error("Error creating tarjet:", err)
    throw err
  }
}

export async function getTarjetsByAccount(accountId) {
  try {
    const res = await api.get(`/tarjets/account/${accountId}`)
    return res.data.data
  } catch (err) {
    console.error("Error getting tarjets:", err)
    throw err
  }
}

export async function deleteTarjet(id) {
  try {
    const res = await api.put(`/tarjets/${id}/deactivate`)
    return res.data
  } catch (err) {
    console.error("Error deleting tarjet:", err)
    throw err
  }
}