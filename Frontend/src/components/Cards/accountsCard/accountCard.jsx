import "../../../styles/cards.css";
import "./accountCard.css";

export default function AccountCard({ account, onClick, isAddCard = false }) {
  if (isAddCard) {
    return (
      <div className="card add" onClick={onClick}>
        <div className="plus">+</div>
        <p>Agregar Cuenta</p>
      </div>
    );
  }

  return (
    <div className="card account-card" onClick={onClick}>
      <div className="ac-header">
        <div className="card-icon">🏦</div>
        <span className="ac-label">Cuenta N° {account.id}</span>
        <span className="ac-badge">Activa</span>
      </div>
      <p className="ac-number">{account.tipo ?? "Caja de Ahorro"}</p>
      <div className="ac-divider" />
      <p className="ac-cbu-label">CBU</p>
      <p className="ac-cbu">{account.cbu}</p>
    </div>
  );
}