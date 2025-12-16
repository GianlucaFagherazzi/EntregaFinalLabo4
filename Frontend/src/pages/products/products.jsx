import { useEffect, useState, useContext } from "react";
import { getProducts } from "../../services/productsServices";
import { ProductCard } from "../../components/Cards/productsCard/productsCard.jsx";
import { AuthContext } from "../../context/authContext";
import Filters from "../../components/filters.jsx";

function Products() {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState({
    categoryId: null,
    minPrice: null,
    maxPrice: null,
  });

  useEffect(() => {
    async function load() {
      try {
        const productos = await getProducts(filterData);
        setProducts(productos);
      } catch (err) {
        console.error("Error al cargar productos", err);
      }
    }
    load();
  }, [filterData]);

  return (
    <div className="products-page">

      <aside className="sidebar">
        <Filters onFilterChange={setFilterData} />
      </aside>

      <div className="products-container">
        <h1 className="products-title">Listado de productos</h1>

        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} user={user}  />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
