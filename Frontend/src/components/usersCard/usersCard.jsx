
function UsersCard({ user }) {
  return (
    <div className="user-card">
      <h2>{user.name} {user.surname}</h2>
      <p>{"Email: "}{user.email}</p>
      <p>{"Dni: "}{user.dni}</p>
      <p>{"Estado: "}{user.isActive ? "Activo" : "Inactivo"}</p>
      {/*<p className="user-role">{user.role}</p>*/}
    </div>
  );
}

export default UsersCard;
