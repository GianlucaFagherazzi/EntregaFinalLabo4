import "../../../styles/cards.css";
import "./accountCard.css";

export default function AccountCard({ account, onClick, isAddCard = false }) {
  if (isAddCard) {
    return (
      <div className="card add" onClick={onClick}>
        <h3>➕ Agregar Cuenta</h3>
      </div>
    );
  }

  return (
    <div className="card account-card" onClick={onClick}>
      <h3>Cuenta N° {account.id}</h3>
      <p>
        <strong>CBU:</strong> {account.cbu}
      </p>
    </div>
  );
}
