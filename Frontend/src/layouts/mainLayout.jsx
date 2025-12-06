import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

export default function MainLayout() {
  return (
    <div style={{ padding: 20 }}>
      <Navbar />

      <div style={{ marginTop: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}
