import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { loginUser } from "../../services/authService";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext); // ✅ agarramos el login global
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      login(response.data); // ✅ ahora sí guardás SOLO el usuario
      navigate("/");        // ✅ redirige al home

    } catch (error) {
      alert("Correo o contraseña incorrectos ❌");
      console.error(error);
    }
  }

  return (
    <div className="auth-container">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      <p>
        ¿No tenés cuenta? <a href="/register">Registrate</a>
      </p>
    </div>
  );
}

export default Login;
