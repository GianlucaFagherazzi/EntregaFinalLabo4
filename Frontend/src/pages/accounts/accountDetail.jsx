import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountById } from "../../services/accountServices";

export default function AccountDetail() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function loadAccount() {
      const data = await getAccountById(id);
      setAccount(data);
    }

    loadAccount();
  }, [id]);

  if (!account) return <p>Loading...</p>;

  return (
    <div>
      <h2>Account Detail</h2>
      <p><b>Type:</b> {account.type}</p>
      <p><b>Number:</b> {account.number}</p>
      <p><b>Balance:</b> ${account.balance}</p>
      <p><b>Created At:</b> {account.createdAt}</p>
    </div>
  );
}
