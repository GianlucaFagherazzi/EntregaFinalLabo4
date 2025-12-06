import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const VARIANTS = {
  view: {
    text: "Agregar al carrito",
    action: (product, ctx) => ctx.addToCart(product),
  },
  edit: {
    text: "Modificar artículo",
    action: (product, ctx) => ctx.editProduct(product),
  },
  admin: {
    text: "Eliminar producto",
    action: (product, ctx) => ctx.deleteProduct(product),
  }
};

export function ProductCard({ product, variant = "view" }) {
  // Ejemplo: Acciones globales
  const ctx = useContext(CartContext);

  const config = VARIANTS[variant];

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-stock">
        <strong>Stock:</strong> {product.stock}
      </p>

      <button onClick={() => config.action(product, ctx)}>
        {config.text}
      </button>
    </div>
  );
}
