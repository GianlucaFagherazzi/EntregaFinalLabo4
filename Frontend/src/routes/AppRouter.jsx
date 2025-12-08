import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/home";

import { ProductsRouter } from "./productsRouter";
import { CategoriesRouter } from "./categoriesRouter";
import { AuthRouter } from "./authRouter";

import { UsersRouter } from "./usersRouter";
import { CartRouter } from "./cartRouter";

import ProtectedRoute from "../routes/protectedRouter";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        
        {/* ✅ RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        {AuthRouter()}
        {ProductsRouter()}
        {CategoriesRouter()}

        {/* 🔐 RUTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>
          {UsersRouter()}
          {CartRouter()}
        </Route>

      </Route>
    </Routes>
  );
}
