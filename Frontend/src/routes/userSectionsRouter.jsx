import { Route, Navigate } from "react-router-dom";
import Profile from "../pages/profile";
import Settings from "../pages/settings";
import MyProducts from "../pages/products/myProducts";
import Favorites from "../pages/favorites";
import Sales from "../pages/users/salesPage";
import Orders from "../pages/users/purchasesPage";

export function UserSectionsRoutes() {
  return (
    <>
      <Route path="/profile/:id?" element={<Profile />} />

      <Route path="/orders" element={<Orders />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/products/myProducts" element={<MyProducts />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/myAccounts" element={<Navigate to="/accounts" replace />} />
      <Route path="/favorites" element={<Favorites />} />
    </>
  );
}
