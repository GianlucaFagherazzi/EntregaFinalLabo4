
import { Route } from "react-router-dom";
import Products from "../pages/products/products";
// import ProductDetail from "../pages/products/productDetail";

export function ProductsRouter() {
  return (
    <>
      <Route path="/products" element={<Products />} />
      {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
    </>
  );
}
