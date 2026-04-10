import { Route } from "react-router-dom";
import Users from "../pages/users/users";
import Categories from "../pages/categories/categories";
// import Movements from "../pages/movements/movements";

export function AdminControlPanel() {
  return (
    <>
      <Route path="/users" element={<Users />} />
      <Route path="/categories" element={<Categories />} />
      {/* <Route path="/movementsControl" element={<Movements />} /> */}
    </>
  );
}