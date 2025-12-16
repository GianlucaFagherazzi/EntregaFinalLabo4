import { useEffect, useState, useContext } from "react";
import { getProducts, deleteProduct } from "../../services/productsServices";
import { ProductCard } from "../../components/Cards/productsCard/productsCard";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      if (!user?.id) return;

      const productos = await getProducts({ userId: user.id });
      setProducts(productos);
    }
    load();
  }, [user]);

  async function handleDelete(id) {
    const confirmed = confirm("¿Eliminar producto?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("No se pudo eliminar", err);
    }
  }

  return (
    <div className="my-products-page">

      <div className="my-products-container">
        <h1 className="my-products-title">Mis Productos</h1>

        <aside className="my-products-sidebar">
          <Link to="/products/create" className="btn create-btn">
            + Crear producto
          </Link>
        </aside>

        <div className="my-products-grid">
          {products.length ? (
            products.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                mode="owner"
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No tenés productos cargados.</p>
          )}
        </div>
      </div>

    </div>
  );

}
