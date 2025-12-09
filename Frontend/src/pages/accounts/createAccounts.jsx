import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../services/accountServices";

export default function CreateAccount() {
  const [type, setType] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    await createAccount({ type });
    navigate("/accounts");
  }

  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <select onChange={e => setType(e.target.value)} required>
          <option value="">Select type</option>
          <option value="SAVINGS">Savings</option>
          <option value="CHECKING">Checking</option>
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
