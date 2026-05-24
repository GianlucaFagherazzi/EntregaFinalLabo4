import { useNavigate } from "react-router-dom";
import "./userCard.css";
import "../../../styles/buttons.css";

function UsersCard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="card user-card">
      <h2>{user.name} {user.surname}</h2>
      <p>Email: {user.email}</p>
      <p>Dni: {user.dni}</p>
      <p className={`status ${user.isActive ? "active" : "inactive"}`}>
        {user.isActive ? "Activo" : "Inactivo"}
      </p>
      <button
        className="btn"
        onClick={() => navigate(`/profile/${user.id}`)}
      >
        Editar usuario
      </button>
    </div>
  );
}

export default UsersCard;