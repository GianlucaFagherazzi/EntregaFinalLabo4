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
          <img className="logo" src="Logo.png" alt="Logo" />
          <h1>My Store</h1>
        </div>
      ) : (
        <div className="header-logged">
          <img className="logo" src="Logo.png" alt="Logo" />
          <h1>My Store</h1>
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
