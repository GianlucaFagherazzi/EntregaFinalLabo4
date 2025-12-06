import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./navbar.css";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!open);

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