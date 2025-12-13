
import { Route } from "react-router-dom";
import Users from "../pages/users/users";
// import UserProfile from "../pages/users/userProfile";

export function UsersRouter() {
  return (
    <>
      <Route path="/users" element={<Users />} />
    </>
  );
}
