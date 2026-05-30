import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../styles/generalContainer.css"
import "../../styles/buttons.css"

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newUser = {
        name,
        surname,
        dni,
        email,
        password,
      };

      await registerUser(newUser);

      setSuccess("Usuario registrado correctamente ");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      const msg =
        error.response?.data?.error ??
        error.message;

      alert(msg);
      console.error(error);
    }
  }

  return (
    <div className="general-container auth-container">
      <h2>Registrarse</h2>

      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Register;
