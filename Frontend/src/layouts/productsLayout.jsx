import { Outlet, Link } from "react-router-dom";

export default function ProductsLayout() {
  return (
    <div>
      <div >
        <Link to="/products">Artículos</Link> | 
        <Link to="/products">Crear un artículo propio</Link>
      </div>

      <Outlet />
    </div>
  );
}
