import { Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

export function AuthRouter() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  );
}
