
import { Routes } from "react-router-dom";
import { ProductsRouter } from "./productsRouter";
import { UsersRouter } from "./usersRouter";
import { CategoriesRouter } from "./categoriesRouter";

export function AppRoutes() {
  return (
    <Routes>
      {ProductsRouter()}
      {UsersRouter()}
      {CategoriesRouter()}
    </Routes>
  );
}
