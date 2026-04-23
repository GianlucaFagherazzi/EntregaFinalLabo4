import { Route } from "react-router-dom";
import ProductForm from "../components/productsForm";

export function ProtectedProductsRouter() {
  return (
    <>
      {/* /products */}
      <Route path="/products/create" element={ <ProductForm />} />
      <Route path="/products/edit/:id" element={ <ProductForm /> }/>
    </>
  );
}
