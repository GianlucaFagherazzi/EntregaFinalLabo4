import { Route } from "react-router-dom";
import CartPage from "../pages/cart/cartPage";
import CheckoutPage from "../pages/cart/checkoutPage";

export function CartRouter() {
  return (
    <>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </>
  );
}