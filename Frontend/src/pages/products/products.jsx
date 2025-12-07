
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productsServices";
import { ProductCard } from "../../components/Cards/productsCard";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const productos = await getProducts();
        setProducts(productos);
      } catch (err) {
        console.error("Error al cargar productos", err);
      }
    }
    load();
  }, []);

  return (
    <div className="products-container">
      <h1 className="products-title">Listado de productos</h1>

      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} mode={""}/>
        ))}
      </div>
    </div>
  );
}

export default Products;
