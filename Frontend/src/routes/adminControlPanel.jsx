import { Route } from "react-router-dom";
import Users from "../pages/users/users";
import Categories from "../pages/categories/categories";
import CategoryForm from "../components/categoryForm";
// import Movements from "../pages/movements/movements";

export function AdminControlPanel() {
  return (
    <>
      <Route path="/users" element={<Users />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/create" element={<CategoryForm />} />
      <Route path="/categories/edit/:id" element={<CategoryForm />} />
      {/* <Route path="/movementsControl" element={<Movements />} /> */}
    </>
  );
}