import { Link } from "react-router-dom";

export function ProductCard({ product}) {
  // Ejemplo: Acciones globales

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
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-stock"><strong>Stock:</strong> {product.stock}</p>
      </div>

      <button className="btn" onClick={() => ""}> View Details </button>
    </div>
  );
}
