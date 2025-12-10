import { Route } from "react-router-dom";
import MyAccounts from "../pages/accounts/myAccounts";
import CreateAccount from "../pages/accounts/createAccounts";
import AccountDetail from "../pages/accounts/accountDetail";
import NewTarjet from "../pages/tarjets/newTarjet.jsx";

export function AccountRouter() {
  return (
    <>
      <Route path="/accounts" element={<MyAccounts />} />
      <Route path="/accounts/create" element={<CreateAccount />} />
      <Route path="/accounts/:id" element={<AccountDetail />} />
      <Route path="/nueva-tarjeta/:accountId" element={<NewTarjet />} />
    </>
  );
}

