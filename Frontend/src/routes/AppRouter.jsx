import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/home";
import { AuthRouter } from "./authRouter";
import { ProductsRouter } from "./productsRouter";
import { CategoriesRouter } from "./categoriesRouter";
import { UsersRouter } from "./usersRouter";
import { CartRouter } from "./cartRouter";
import ProtectedRoute from "../routes/protectedRouter";
import { UserSectionsRoutes } from "./userSectionsRouter";
import { AccountRouter } from "./accountRouter"; // Asegurate del nombre y path exacto

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {AuthRouter()}
        {ProductsRouter()}
        {CategoriesRouter()}

        <Route element={<ProtectedRoute />}>
          {UsersRouter()}
          {CartRouter()}
          {UserSectionsRoutes()}
          {AccountRouter()}
        </Route>
      </Route>
    </Routes>
  );
}
