
import { useEffect, useState } from "react";
import { getUsers } from "../../services/usersServices";
import UsersCard from "../../components/usersCard/usersCard";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const usuarios = await getUsers();
        setUsers(usuarios);
      } catch (err) {
        console.error("Error al cargar usuarios", err);
      }
    }
    load();
  }, []);

  return (
    <div className="users-container">
      <h1 className="users-title">Listado de usuarios</h1>

      <div className="users-grid">
        {users.map((u) => (
          <UsersCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}

export default Users;
