import { Link } from "react-router-dom";

export function ProductCard({ product, mode = "public", onDelete, user }) {
  const isOwnerView = mode === "owner";
  const isLogged = Boolean(user);
  const isOwner = user && product.User && user.id === product.User.id;

  function handleAddToCart() {
    // acá después conectás tu lógica real de carrito
    alert(`Producto "${product.name}" agregado al carrito`);
  }

  return (
    <div className="card">
      <div className="product-info">
        <h2>{product.name}</h2>

        {product.User && (
          <Link to={`/users/${product.User.id}`} className="user-link">
            {product.User.name}
          </Link>
        )}

        {product.Category && (
          <p className="category">{product.Category.name}</p>
        )}

        <p>{product.description}</p>
      </div>

      <div className="product-details">
        <p className="product-price">Precio: ${product.price}</p>
        <p className="product-stock">
          <strong>Stock:</strong> {product.stock}
        </p>
      </div>

      <div className="card-actions">
        <button className="btn">Ver detalle</button>

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
