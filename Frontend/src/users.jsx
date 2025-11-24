import { useEffect, useState } from "react";

function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:3000/api/users";

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();

                console.log("DATA RECIBIDA:", data);

                if (Array.isArray(data.data)) {
                    setUsers(data.data);
                } else {
                    console.error("La API no devolvió un array:", data);
                }


            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.id} - {u.name} - {u.surname} - {u.email} 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;
