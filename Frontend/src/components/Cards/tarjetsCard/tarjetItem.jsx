
import { useNavigate } from "react-router-dom";
import "../../../styles/cards.css";
import "./tarjetsCard.css";

export default function TarjetItem({ tarjet }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/tarjets/${tarjet.id}`);
  }

  return (
    <div className="card tarjet-card" onClick={() => navigate(`/tarjets/${tarjet.id}`)}>
      <div className="tc-header">
        <div className="tc-icon">💳</div>
        <span className="tc-badge">Activa</span>
      </div>
      <p className="tc-id">Tarjeta N° {tarjet.id}</p>
      <p className="tc-number">{tarjet.number}</p>
      <div className="tc-divider" />
      <p className="tc-balance-label">Saldo disponible</p>
      <p className="tc-balance">${tarjet.balance.toLocaleString()}</p>
    </div>
  );
}
