import { Route } from "react-router-dom";
import Users from "../pages/users/users";
import Categories from "../pages/categories/categories";
import CategoryForm from "../components/categoryForm";
import SnapshotsPage from "../pages/admin/snapshotsPage";

export function AdminControlPanel() {
  return (
    <>
      <Route path="/users" element={<Users />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/create" element={<CategoryForm />} />
      <Route path="/categories/edit/:id" element={<CategoryForm />} />
      <Route path="/snapshots" element={<SnapshotsPage />} />
    </>
  );
}