
import { useNavigate } from "react-router-dom";
import "../../../styles/cards.css";
import "./tarjetsCard.css";

export default function TarjetItem({ tarjet }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/tarjets/${tarjet.id}`);
  }

  return (
    <div className="card tarjet-card" onClick={handleClick}>
      <p><b>Tarjeta Nº:</b> {tarjet.id}</p>
      <p><b>Número:</b> {tarjet.number}</p>
      <p><b>Saldo:</b> ${tarjet.balance}</p>
    </div>
  );
}
