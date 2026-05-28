import { useParams, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "../../styles/buttons.css";
import "../../styles/generalContainer.css";


function ProductDetail() {
  const { id } = useParams();
  const { state } = useLocation(); 
  const { user } = useContext(AuthContext);

  const product = state?.product; 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Caso importante: si el usuario entra directo por URL
  if (!product) {
    return <p>No hay datos del producto (recarga la página o venís por URL directa)</p>;
  }

  const isOwner = user && product.User && user.id === product.User.id;

  return (
    <div className="general-container product-detail">
      <h2>{product.name}</h2>

      <p><strong>Vendedor:</strong> {product.User?.name}</p>
      <p><strong>Categoría:</strong> {product.Category?.name}</p>

      <p>{product.description}</p>

      <h2>Precio: ${product.price}</h2>
      <p>Stock disponible: {product.stock}</p>

      {!isOwner && user && (
        <button className="btn btn-primary">
          Agregar al carrito
        </button>
      )}
    </div>
  );
}

export default ProductDetail;