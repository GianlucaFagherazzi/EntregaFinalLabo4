import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./header.css";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">
      {!user ? (

        // CUANDO NO HAY SESIÓN
        <div className="header-simple">
          <img src="/logo.png" alt="Logo" />
          <h1>Mi Tienda</h1>
        </div>
      ) : (
        
        // CUANDO HAY SESIÓN
        <div className="header-completo">
          <img src="/logo.png" alt="Logo" />
          <h1>Mi Tienda</h1>
          <p>Bienvenido, {user.name}</p>
        </div>
      )}
    </header>
  );
}

export default Header;
