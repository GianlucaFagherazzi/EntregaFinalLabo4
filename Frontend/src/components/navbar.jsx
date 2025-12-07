import { useState, useContext  } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/authContext";
import "./navbar.css";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!open);
    const { user, logout, isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <Link to="/">MiWeb</Link>
            </div>

            <button className="navbar__toggle" onClick={toggleMenu}>
                {open ? <X /> : <Menu />}
            </button>

            <ul className={`navbar__links ${open ? "open" : ""}`}>
                <li>
                    <NavLink to="/" end onClick={() => setOpen(false)}>Inicio</NavLink>
                </li>
                {!isAuthenticated  ? (
                    <>
                        <li>
                        <NavLink to="/register" onClick={() => setOpen(false)}>
                            Registrarse
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to="/login" onClick={() => setOpen(false)}>
                            Login
                        </NavLink>
                        </li>
                    </>
                    ) : (
                    <>
                        <li className="navbar-user">
                        👤 {user.name}
                        </li>
                        <li>
                        <button onClick={logout} className="logout-btn">
                            Cerrar sesión
                        </button>
                        </li>
                    </>
                    )}

                <li>
                    <NavLink to="/users" onClick={() => setOpen(false)}>Usuarios</NavLink>
                </li>
                <li>
                    <NavLink to="/categories" onClick={() => setOpen(false)}>Categoria</NavLink>
                </li>
                <li>
                    <NavLink to="/products" onClick={() => setOpen(false)}>Productos</NavLink>
                </li>
                <li>
                    <NavLink to="/cart" onClick={() => setOpen(false)}>Carrito</NavLink>
                </li>
            </ul>
        </nav>
    );
}