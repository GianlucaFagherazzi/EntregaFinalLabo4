import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAccounts } from "../services/accountServices";
import AccountCard from "../components/Cards/accountsCard/accountCard";
import "../styles/myAccounts.css";

export default function MyAccounts() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAccounts() {
      const data = await getMyAccounts();
      setAccounts(data);
    }

    loadAccounts();
  }, []);

  return (
    <div className="my-accounts-container">
      <h2>My Accounts</h2>

      <div className="cards-grid">
        {accounts.map(account => (
          <AccountCard
            key={account.id}
            account={account}
            onClick={() => navigate(`/accounts/${account.id}`)}
          />
        ))}

        <AccountCard
          isAddCard
          onClick={() => navigate("/accounts/create")}
        />
      </div>
    </div>
  );
}
