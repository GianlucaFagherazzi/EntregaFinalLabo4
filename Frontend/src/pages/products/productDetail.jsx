import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/productsServices";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("ID desde params:", id);
    load();
  }, [id]);

  async function load() {
    try {
      const data = await getProductById(id);
      console.log("Producto recibido:", data);
      setProduct(data);
    } catch (error) {
      console.error("Error cargando producto:", error);
    }
  }

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <h3>{product.name}</h3>
      <p>ID: {product.id}</p>
      <p>Precio: {product.price}</p>
    </div>
  );
}
