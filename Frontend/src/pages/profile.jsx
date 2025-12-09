import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { updateUser, deactivateUser } from "../services/usersServices";
import "../styles/profile.css";

export default function Profile() {
  const { user, updateUser: updateUserContext, logout } = useContext(AuthContext);

  const [editingField, setEditingField] = useState(null);
  const [value, setValue] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return <p>No hay usuario autenticado</p>;

  function startEdit(field, currentValue) {
    setEditingField(field);
    setValue(currentValue);
  }

  async function saveEdit() {
    try {
      const updated = await updateUser(user.id, {
        [editingField]: value
      });

      // ✅ Solo actualizamos contexto si NO es password
      if (editingField !== "password") {
        updateUserContext({
          [editingField]: updated.data[editingField]
        });
      }

      // ✅ Si es password → cerrar sesión
      if (editingField === "password") {
        alert("Contraseña actualizada. Debes iniciar sesión nuevamente.");
        logout();
        window.location.href = "/login";
        return; // ⛔ cortamos la ejecución acá
      }

      setEditingField(null);
      setValue("");

    } catch (err) {
      alert("Error al actualizar el dato");
    }
  }


  async function handleDeleteAccount() {
    try {
      await deactivateUser(user.id);

      alert("Tu cuenta fue desactivada correctamente.");
      logout();              // ✅ Cierra sesión automáticamente
      window.location.href = "/";  // ✅ Redirige al home

    } catch (err) {
      alert("Error al eliminar la cuenta");
    }
  }

  const fields = [
    { key: "name", label: "Nombre" },
    { key: "surname", label: "Apellido" },
    { key: "email", label: "Email" },
    { key: "dni", label: "DNI" },
    { key: "password", label: "Contraseña", isPassword: true }
  ];

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>

      <ul className="profile-list">
        {fields.map((field) => (
          <li key={field.key} className="profile-item">

            <span className="profile-label">{field.label}:</span>

            {editingField === field.key ? (
              <>
                <input
                  type={field.isPassword ? "password" : "text"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={field.isPassword ? "Nueva contraseña" : ""}
                />

                <button onClick={saveEdit}>Guardar</button>
                <button onClick={() => setEditingField(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span className="profile-value">{user[field.key]}</span>
                <button onClick={() => startEdit(field.key, user[field.key])}>
                  Editar
                </button>
              </>
            )}

          </li>
        ))}
      </ul>

      {/* ✅ BLOQUE ELIMINAR CUENTA */}
      <div className="delete-account-box">
        <button className="delete-account-btn" onClick={() => setShowDeleteConfirm(true)}>
          Eliminar cuenta
        </button>

        {showDeleteConfirm && (
          <div className="delete-confirm-box">
            <p className="mensaje">
              ⚠️ ¿Seguro que quiere eliminar su cuenta?  
              No podrá acceder nunca más a ella.
            </p>

            <div className="confirm-actions">
              <button className="confirm-btn" onClick={handleDeleteAccount}>
                Aceptar
              </button>

              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
