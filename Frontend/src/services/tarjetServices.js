const API_URL = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

// Obtener todas las tarjets de una cuenta
export async function getTarjetsByAccount(accountId) {
  const response = await fetch(`${API_URL}/tarjets`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener tarjetas");
  }

  const data = await response.json();

  // filtramos solo las de esta cuenta
  return data.data.filter(t => t.accountId === Number(accountId));
}

// Crear tarjet
export const createTarjet = async (tarjetData) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/tarjets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tarjetData)
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

