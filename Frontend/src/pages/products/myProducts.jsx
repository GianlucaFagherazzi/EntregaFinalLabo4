import { useEffect, useState, useContext } from "react";
import { getProducts } from "../../services/productsServices";
import { ProductCard } from "../../components/Cards/productsCard";
import { AuthContext } from "../../context/authContext";

export default function MyProducts() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        if (!user?.id) return;

        // Filtro: obtener solo productos cuyo userId coincida
        const productos = await getProducts({ userId: user.id });
        setProducts(productos);
      } catch (err) {
        console.error("Error al cargar mis productos", err);
      }
    }
    load();
  }, [user]);

  return (
    <div className="products-page">
      <h1 className="products-title">Mis Productos</h1>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p>No tenés productos cargados.</p>
        )}
      </div>
    </div>
  );
}
