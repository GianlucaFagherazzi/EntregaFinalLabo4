const API_URL = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

// Obtener tarjeta por ID
export async function getTarjetById(id) {
  const res = await fetch(`${API_URL}/tarjets/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data.data;
}

// Acreditar saldo
export async function updateTarjetBalance(id, amount) {
  const res = await fetch(`${API_URL}/tarjets/balance/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ amount })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al acreditar saldo");
  }

  return data.data;
}


// Crear tarjeta
export const createTarjet = async (tarjetData) => {
  const res = await fetch(`${API_URL}/tarjets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(tarjetData)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear tarjeta");
  }

  return data;
};


export async function getTarjetsByAccount(accountId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/tarjets/account/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener tarjetas");
  }

  const data = await res.json();
  return data.data;
}
