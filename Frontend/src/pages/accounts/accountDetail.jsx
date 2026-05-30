import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccountById } from "../../services/accountServices";
import { getTarjetsByAccount } from "../../services/tarjetServices";
import TarjetItem from "../../components/Cards/tarjetsCard/tarjetItem";
import AddTarjet from "../../components/Cards/tarjetsCard/addTarjet";
import "../../styles/accountDetail.css";
import "../../styles/generalContainer.css";

export default function AccountDetail() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [tarjets, setTarjets] = useState([]);

  async function loadTarjets() {
    try {
      const data = await getTarjetsByAccount(id);
      setTarjets(data);
    } catch (err) {
      console.error("Error cargando tarjetas:", err);
    }
  }

  useEffect(() => {
    async function loadAccount() {
      try {
        const data = await getAccountById(id);
        console.log(data);
        setAccount(data);
      } catch (err) {
        console.error("Error cargando cuenta:", err);
      }
    }

    loadAccount();
    loadTarjets();
  }, [id]);

  if (!account) return <p>Loading...</p>;

  return (
    <div className="general-container">
      <h2>Detalle de cuenta</h2>

      <div className="account-detail-info">
        <p><b>Número de cuenta:</b> {account.id}</p>
        <p><b>CBU:</b> {account.cbu}</p>
      </div>

      <h3>Tarjetas asociadas</h3>

      <div className="cards-grid">
        {tarjets.map(t => (
          <TarjetItem key={t.id} tarjet={t} />
        ))}
        <AddTarjet accountId={account.id} onCreated={loadTarjets} />
      </div>
    </div>
  );
}

