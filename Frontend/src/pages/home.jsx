import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productsServices";
import { ProductCard } from "../components/Cards/productsCard/productsCard.jsx";
import { AuthContext } from "../context/authContext";
import pngMacotaTriste from "../../public/MascotaTriste.png";
import "../styles/home.css";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const productos = await getProducts();

        setProducts(productos.slice(0, 6));
      } catch (err) {
        console.error("Error al cargar productos", err);
      }
    }

    load();
  }, []);

  console.log("home renderizando");
  return (
    <div className="home-page">
      <h1 className="home-title">Últimas novedades</h1>

      {products.length === 0 ? (
        <div className="empty-state">
          <img src={pngMacotaTriste} alt="Sin productos" />
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} user={user} />
            ))}
          </div>

          <div className="ver-mas-container">
            <button
              className="ver-mas-btn"
              onClick={() => navigate("/products")}
            >
              Ver todos los productos
            </button>
          </div>
        </>
      )}
    </div>
  );
}