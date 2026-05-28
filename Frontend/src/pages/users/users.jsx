
import { useEffect, useState } from "react";
import { getUsers } from "../../services/usersServices";
import UsersCard from "../../components/Cards/usersCard/usersCard";
import "../../styles/generalContainer.css";

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
    <div className="general-container">
      <h2>Listado de usuarios</h2>

      <div className="cards-grid">
        {users.map((u) => (
          <UsersCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}

export default Users;
