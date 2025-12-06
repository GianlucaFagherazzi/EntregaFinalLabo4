import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function MainLayout() {
  return (
    <div className="app-container">

      <Header />     {/* Encabezado */}
      
      <Navbar />     {/* Navegación */}
      
      <main className="main-content">
        <Outlet />   {/* Cuerpo dinámico */}
      </main>

      <Footer />     {/* Pie de página */}

    </div>
  );
}
