import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTarjet } from "../../services/tarjetServices";

export default function NewTarjet() {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    number: "",
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
      accountId: Number(accountId)
    };

    try {
      await createTarjet(newTarjet);
      navigate(`/accounts/${accountId}`);
    } catch (err) {
      alert("Error al crear tarjeta: " + err.response.data.error);
    }
  }

  return (
    <div className="new-tarjet-container">
      <h2>Nueva Tarjeta</h2>

      <form onSubmit={handleSubmit}>

        <label for="tarjetNumber">Número de tarjeta</label>
        <input
          id="tarjetNumber"
          type="text"
          name="number"
          value={form.number}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear Tarjeta</button>
      </form>
    </div>
  );
}
