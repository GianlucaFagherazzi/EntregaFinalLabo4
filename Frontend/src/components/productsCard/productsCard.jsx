
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-stock">
        <strong>Stock:</strong> {product.stock}
      </p>
    </div>
  );
}

export default ProductCard;
