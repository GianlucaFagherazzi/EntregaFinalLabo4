import { Route } from "react-router-dom";
import Products from "../pages/products/products";
import ProductForm from "../components/productsForm";
import ProductDetail from "../pages/products/productDetail";

export function ProductsRouter() {
  return (
    <>
      {/* /products */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/create" element={ <ProductForm />} />
      <Route path="/products/edit/:id" element={ <ProductForm /> }/>
    </>
  );
}
