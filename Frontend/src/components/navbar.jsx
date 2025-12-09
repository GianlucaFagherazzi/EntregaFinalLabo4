import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { AuthContext } from "../context/authContext";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const toggleMenu = () => setOpen(!open);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
    setOpen(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/products?search=${search}`);
    setSearch("");
    setOpen(false);
  }

  return (
  <nav className="navbar">

    {/* ✅ BLOQUE IZQUIERDO: LOGO + BUSCADOR */}
    <div className="navbar-left">

      <div className="navbar__brand">
        <Link to="/">MiWeb</Link>
      </div>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

    </div>

    {/* ✅ BOTÓN MOBILE */}
    <button className="navbar__toggle" onClick={toggleMenu}>
      {open ? <X /> : <Menu />}
    </button>

    {/* ✅ LINKS DERECHA */}
    <ul className={`navbar__links ${open ? "open" : ""}`}>

      <li>
        <NavLink to="/categories" onClick={() => setOpen(false)}>Categoria</NavLink>
      </li>

      <li>
        <NavLink to="/products" onClick={() => setOpen(false)}>Productos</NavLink>
      </li>

      <li>
        <NavLink to="/users" onClick={() => setOpen(false)}>Usuarios</NavLink>
      </li>

      {!user ? (
        <>
          <li>
            <NavLink to="/register" onClick={() => setOpen(false)}>Registrarse</NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
          </li>
        </>
      ) : (
        <li className="navbar-user-dropdown">
          <span className="navbar-user-name">👤 {user.name}</span>

          <ul className="dropdown-menu">
            <li><NavLink to="/profile">Mi perfil</NavLink></li>
            <li><NavLink to="/orders">Mis compras</NavLink></li>
            <li><NavLink to="/sales">Mis ventas</NavLink></li>
            <li><NavLink to="/accounts">Mis cuentas</NavLink></li>
            <li><NavLink to="/favorites">Favoritos</NavLink></li>
            <li><NavLink to="/settings">Configuración</NavLink></li>
            <li><NavLink to="/products/myProducts">Mis artículos</NavLink></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </li>
      )}

      <li>
        <NavLink to="/cart" onClick={() => setOpen(false)} className="cart-icon">
          <ShoppingCart size={22} />
        </NavLink>
      </li>

    </ul>
  </nav>
);

}
