import "./userCard.css";

function UsersCard({ user }) {
  return (
    <div className="card user-card">
      <h2>{user.name} {user.surname}</h2>
      <p>{"Email: "}{user.email}</p>
      <p>{"Dni: "}{user.dni}</p>
      <p className={`status ${user.isActive ? "active" : "inactive"}`}
      >
        {user.isActive ? "Activo" : "Inactivo"}
        </p>
      </div>
  );
}

export default UsersCard;
