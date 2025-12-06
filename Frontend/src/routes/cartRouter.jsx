import { Route } from "react-router-dom";
import CartLayout from "../layouts/cartLayout";
import Cart from "../pages/cart/cart";

export function CartRouter() {
  return (
    <>
      <Route path="cart" element={< CartLayout />}>
        {/* /carrito */}
        <Route index element={<Cart />} />

      </Route>
    </>
  );
}
