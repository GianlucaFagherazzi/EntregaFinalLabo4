import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ThemeSelector from "../components/themeSelector";
import "../styles/header.css";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">

      {!user ? (
        <div className="header-logout">
          <Link to="/" className="logo-link">
            <img className="logo" src="Logo.png" alt="Logo" />
            <h1>My Store</h1>
          </Link>
        </div>
      ) : (
        <div className="header-logged">
          <Link to="/" className="logo-link">
            <img className="logo" src="Logo.png" alt="Logo" />
            <h1>My Store</h1>
          </Link>
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
