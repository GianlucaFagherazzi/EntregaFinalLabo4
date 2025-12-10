import "./accountCard.css";

export default function AccountCard({ account, onClick, isAddCard = false }) {
  if (isAddCard) {
    return (
      <div className="account-card add-card" onClick={onClick}>
        <span className="plus">+</span>
        <p>Añadir cuenta</p>
      </div>
    );
  }

  return (
    <div className="account-card" onClick={onClick}>
      <h3>Cuenta N° {account.id}</h3>

      <p>
        <strong>CBU:</strong> {account.cbu}
      </p>
    </div>
  );
}
