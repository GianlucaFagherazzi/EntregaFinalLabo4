import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

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
      alert("Error al registrar usuario ");
      console.error(error);
    }
  }

  return (
    <div className="auth-container">
      <h1>Registrarse</h1>

      {/* MENSAJE CORRECTAMENTE UBICADO */}
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
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Register;
