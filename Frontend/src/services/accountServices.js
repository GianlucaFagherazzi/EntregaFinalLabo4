import api from "./api"

// mis cuentas
export async function getMyAccounts() {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    const res = await api.get(`/accounts/my/${user.id}`)
    return res.data.data
  } catch (err) {
    console.error("Error fetching accounts:", err)
    throw err
  }
}

export async function getAccountById(id) {
  try {
    const res = await api.get(`/accounts/${id}`)
    return res.data.data
  } catch (err) {
    console.error("Error fetching account:", err)
    throw err
  }
}

export async function createAccount(accountData) {
  try {
    const res = await api.post("/accounts", accountData)
    return res.data
  } catch (err) {
    console.error("Error creating account:", err)
    throw err
  }
}