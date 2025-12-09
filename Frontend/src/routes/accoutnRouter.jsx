import { Route } from "react-router-dom";
import CreateAccount from "../components/createAccount";

export function AccountRouter() {
  return (
    <Route path="/create-account" element={<CreateAccount />} />
  );
}
