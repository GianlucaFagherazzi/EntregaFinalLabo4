import { Route } from "react-router-dom";
import ProductsLayout from "../layouts/productsLayout";
import Products from "../pages/products/products";
//  import ProductDetail from "../pages/products/productDetail";

export function ProductsRouter() {
  return (
    <>
      {/* /products */}
      <Route path="products" element={<Products />} />

      {/* {<Route path="/:id" element={<ProductDetail />} />} */}
    </>
  );
}
