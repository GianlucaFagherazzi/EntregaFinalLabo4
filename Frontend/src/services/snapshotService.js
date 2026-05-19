import api from "./api";

export const getSnapshots = async () => {
  try {
    const res = await api.get("/snapshots");
    return res.data.data;
  } catch (err) {
    console.error("Error cargando snapshots", err);
    throw err;
  }
};

export const getMyPurchases = async () => {
  const { data } = await api.get("/snapshots/my-purchases");
  return data;
};

export const getMySales = async () => {
  const { data } = await api.get("/snapshots/my-sales");
  return data;
};