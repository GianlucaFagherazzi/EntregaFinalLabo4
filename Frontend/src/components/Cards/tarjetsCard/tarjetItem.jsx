import "./tarjetCard.css";

export default function TarjetItem({ tarjet }) {
  return (
    <div className="tarjet-card">
      <p><b>Tarjeta Nº:</b> {tarjet.id}</p>
      <p><b>Número:</b> {tarjet.number}</p>
      <p><b>Saldo:</b> ${tarjet.balance}</p>
    </div>
  );
}
