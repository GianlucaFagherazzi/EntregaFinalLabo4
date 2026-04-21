import { Link } from "react-router-dom";
import { useCart } from "../../../context/cartContext";

export function ProductCard({ product, mode = "public", onDelete, user }) {
  const isOwnerView = mode === "owner";
  const isLogged = Boolean(user);
  const isOwner = user && product.User && user.id === product.User.id;
  const { addToCart } = useCart();

  async function handleAddToCart() {
  try {
    await addToCart(product.id, 1);
    alert("Producto agregado al carrito 🛒");
  } catch (err) {
    alert("Error agregando al carrito");
  }
}

  return (
    <div className="card">
      <div className="product-info">
        <h2>{product.name}</h2>

        {product.User && (
          <Link to={`/users/${product.User.id}`} className="user-link">
            Vendido por {product.User.name}
          </Link>
        )}

        {product.Category && (
          <p className="category"> {product.Category.name}</p>
        )}

        <p>Descripción: {product.description}</p>
      </div>

      <div className="product-details">
        <p className="product-price">Precio: ${product.price}</p>
        <p className="product-stock">
          <strong>Stock:</strong> {product.stock}
        </p>
      </div>

      <div className="card-actions">
        <Link to={`/products/${product.id}`} state={{ product }} className="btn">
          Ver detalle
        </Link>
        {/* COMPRA */}
        {isLogged && !isOwner && (
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        )}


        {/* ACCIONES DE DUEÑO */}
        {isOwnerView && onDelete && (
          <>
            <Link
              to={`/products/edit/${product.id}`}
              className="btn btn-secondary"
            >
              Editar
            </Link>

            <button
              className="btn btn-danger"
              onClick={() => onDelete(product.id)}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
