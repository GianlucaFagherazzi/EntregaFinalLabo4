
import { Route } from "react-router-dom";
import Users from "../pages/users/users";

export function UsersRouter() {
  return (
    <>
      <Route path="/users" element={<Users />} />
    </>
  );
}
