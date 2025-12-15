import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import ThemeSelector from "../components/themeSelector";
import "../styles/header.css";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">

      {!user ? (
        <div className="header-logout">
          <img className="logo" src="0a356142c7184ae283480e277bf81dda.gif" alt="Logo" />
          <h1>Mi Tienda</h1>
        </div>
      ) : (
        <div className="header-logged">
          <img className="logo" src="7f7db2e0d39ad48e344a4d551dcf5b08.jpg" alt="Logo" />
          <h1>Mi Tienda</h1>
          <p>Bienvenido, {user.name}</p>
        </div>
      )}

      <div className="theme-container">
        <ThemeSelector />
      </div>

    </header>
  );
}

export default Header;
