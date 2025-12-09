const API_URL = "http://localhost:3000/api";

function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}

// ✅ GET my accounts
export async function getMyAccounts() {
  const response = await fetch(`${API_URL}/accounts/my`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    throw new Error("Error fetching accounts");
  }

  const data = await response.json();
  return data.data;
}

// ✅ GET account detail
export async function getAccountById(id) {
  const response = await fetch(`${API_URL}/accounts/${id}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    throw new Error("Error fetching account");
  }

  const data = await response.json();
  return data.data;
}

// ✅ CREATE account
export async function createAccount(accountData) {
  const response = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(accountData)
  });

  if (!response.ok) {
    throw new Error("Error creating account");
  }

  return response.json();
}
