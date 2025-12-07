import { Route } from "react-router-dom";
import CartLayout from "../layouts/cartLayout";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../pages/cart/cart";

export function CartRouter() {
  return (
    <>
      <Route
        path="cart"
        element={
          <ProtectedRoute>
            <CartLayout />
          </ProtectedRoute>
        }
      >
        {/* /cart */}
        <Route index element={<Cart />} />
      </Route>
    </>
  );
}
