import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/home";
import { AuthRouter } from "./authRouter";
import { ProductsRouter } from "./productsRouter";
import { ProtectedProductsRouter } from "./protectedProductsRouter";
import ProtectedRoute from "./protectedRouter";
import { UserSectionsRoutes } from "./userSectionsRouter";
import { AccountRouter } from "./accountRouter";
import AdminRoute from "./adminRouter";
import { AdminControlPanel } from "./adminControlPanel";
import { CartRouter } from "./cartRouter";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {AuthRouter()}
        {ProductsRouter()}

        <Route element={<ProtectedRoute />}>
          {UserSectionsRoutes()}
          {AccountRouter()}
          {ProtectedProductsRouter()}
          {CartRouter()}

          <Route element={<AdminRoute />}>
            {AdminControlPanel()}
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}
