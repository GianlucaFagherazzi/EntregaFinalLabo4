import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home";
import { ProductsRouter } from "./productsRouter";
import { UsersRouter } from "./usersRouter";
import { CategoriesRouter } from "./categoriesRouter";
import { CartRouter } from "./cartRouter";
import { AuthRouter } from "./authRouter";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Ruta base */}
        <Route path="/" element={<Home />} />

        {/* Rutas de la api */}
        {AuthRouter()}
        {ProductsRouter()}
        {UsersRouter()}
        {CategoriesRouter()}
        {CartRouter()}


      </Route>

    </Routes>
  );
}
