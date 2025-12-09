import "./accountCard.css";

export default function AccountCard({ account, onClick, isAddCard }) {
  if (isAddCard) {
    return (
      <div className="account-card add-card" onClick={onClick}>
        <h3>➕ Add Account</h3>
      </div>
    );
  }

  return (
    <div className="account-card" onClick={onClick}>
      <h3>{account.type}</h3>
      <p>Account Nº: {account.number}</p>
      <p>Balance: ${account.balance}</p>
    </div>
  );
}
