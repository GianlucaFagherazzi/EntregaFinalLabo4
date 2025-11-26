import { Route } from "react-router-dom";
import Categories from "../pages/categories/categories.jsx";

export function CategoriesRouter() {
  return (
    <>
      <Route path="/categories" element={<Categories />} />
    </>
  );
}
