import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../services/accountServices";
import { AuthContext } from "../../context/authContext";
import "./createAccounts.css";
import "../../styles/generalContainer.css";
import "../../styles/buttons.css";

export default function CreateAccount() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newAccount = {
        userId: user.id,
        cbu: generateCBU()
      };

      await createAccount(newAccount);
      navigate("/accounts");

    } catch (err) {
      alert("Error al crear la cuenta");
      console.error(err);
    }
  }

  function generateCBU() {
    let cbu = "";
    for (let i = 0; i < 12; i++) {
      cbu += Math.floor(Math.random() * 10);
    }
    return cbu;
  }

  return (
    <div className="general-container create-account-container">
      <h2>Crear Cuenta</h2>

      <form onSubmit={handleSubmit}>
        <button className="btn" type="submit">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}
