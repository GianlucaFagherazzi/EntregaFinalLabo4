import api from "./api";

export const checkoutRequest = async (data) => {
  try {
    const res = await api.post("/checkout", data);
    return res.data;
  } catch (err) {
    console.error("Error en el checkout:", err);
    throw err;
  }
};