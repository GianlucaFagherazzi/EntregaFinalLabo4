import { useEffect, useState, useContext } from "react";
import { getProducts, deleteProduct } from "../../services/productsServices";
import { ProductCard } from "../../components/Cards/productsCard/productsCard";
import AddProductCard from "../../components/Cards/productsCard/addProductsCard";
import { AuthContext } from "../../context/authContext";

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
    <div className="products-page">
      <div className="products-container">

        <h1 className="products-title">Mis Productos</h1>

        {/* mensaje si no hay productos */}
        {products.length === 0 && (
          <p className="empty-message">
            No tenés productos cargados.
          </p>
        )}

        {/* grid SIEMPRE visible */}
        <div className="products-grid">
          {products.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              mode="owner"
              onDelete={handleDelete}
            />
          ))}

          {/* card de agregar producto */}
          <AddProductCard />
        </div>

      </div>
    </div>
  );
}