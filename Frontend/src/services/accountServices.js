const API_URL = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
// mis cuentas (yo soy el usuario)
export async function getMyAccounts() {
  const user = getUser();

  const response = await fetch(`${API_URL}/accounts/my/${user.id}`, {
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

// obtenoge el detalle de una cuenta por id
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

