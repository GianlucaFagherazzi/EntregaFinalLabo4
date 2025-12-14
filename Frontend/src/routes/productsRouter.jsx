import { Route } from "react-router-dom";
import Products from "../pages/products/products";
import ProductForm from "../components/productsForm";

export function ProductsRouter() {
  return (
    <>
      {/* /products */}
      <Route path="/products" element={<Products />} />
      <Route
        path="/products/create"
        element={
            <ProductForm />
        }
      />

      <Route
        path="/products/edit/:id"
        element={
            <ProductForm />
        }
      />
      {/* {<Route path="/:id" element={<ProductDetail />} />} */}
    </>
  );
}
