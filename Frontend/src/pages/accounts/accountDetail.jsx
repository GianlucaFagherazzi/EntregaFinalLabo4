import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccountById } from "../../services/accountServices";
import { getTarjetsByAccount } from "../../services/tarjetServices";
import TarjetItem from "../../components/Cards/tarjetsCard/tarjetItem";
import AddTarjet from "../../components/Cards/tarjetsCard/addTarjet";
import "../../styles/accountDetail.css";

export default function AccountDetail() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [tarjets, setTarjets] = useState([]);

  async function loadTarjets() {
    const data = await getTarjetsByAccount(id);
    setTarjets(data);
  }

  useEffect(() => {
    async function loadAccount() {
      const data = await getAccountById(id);
      setAccount(data);
    }

    loadAccount();
    loadTarjets();
  }, [id]);

  if (!account) return <p>Loading...</p>;

  return (
    <div>
      <h2>Detalle de cuenta</h2>

      <p><b>Número de cuenta:</b> {account.id}</p>
      <p><b>CBU:</b> {account.cbu}</p>

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

