import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTarjet } from "../../services/tarjetServices";

export default function NewTarjet() {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    number: "",
    balance: 0
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const newTarjet = {
      number: form.number,
      balance: Number(form.balance) || 0, 
      accountId: Number(accountId)
    };

    try {
      await createTarjet(newTarjet);
      navigate(`/accounts/${accountId}`);
    } catch (err) {
      alert("Error al crear tarjeta");
    }
  }

  return (
    <div className="new-tarjet-container">
      <h2>Nueva Tarjeta</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="number"
          placeholder="Número de tarjeta"
          value={form.number}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="balance"
          placeholder="Balance inicial"
          value={form.balance}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear Tarjeta</button>
      </form>
    </div>
  );
}
