import { Outlet, Link } from "react-router-dom";

export default function CartLayout() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/cart">Pagar</Link> | 
        <Link to="/cart">Limpiar carrito</Link>
      </div>

      <Outlet />
    </div>
  );
}
