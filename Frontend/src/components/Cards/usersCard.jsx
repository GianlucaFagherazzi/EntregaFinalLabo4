import { useNavigate } from "react-router-dom";

function UsersCard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h2>{user.name} {user.surname}</h2>
      <p>Email: {user.email}</p>
      <p>Dni: {user.dni}</p>
      <p>Estado: {user.isActive ? "Activo" : "Inactivo"}</p>

      <button 
        className="card-button" 
        onClick={() => navigate(`/profile/${user.id}`)}
      >
        Editar usuario
      </button>
    </div>
  );
}

export default UsersCard;