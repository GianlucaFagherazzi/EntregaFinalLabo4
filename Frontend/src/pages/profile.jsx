
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { updateUser, deactivateUser } from "../services/usersServices";
import ConfirmDialog from "../components/ConfirmDialog";

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

      // actualizamos el contexto si NO es el password
      if (editingField !== "password") {
        updateUserContext({
          [editingField]: updated.data[editingField]
        });
      }

      // si es el password se cerrar sesión
      if (editingField === "password") {
        alert("Contraseña actualizada. Debes iniciar sesión nuevamente.");
        logout();
        window.location.href = "/login";
        return;
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
      logout();
      window.location.href = "/";
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
                <div className="profile-actions">
                  <button onClick={saveEdit}>Guardar</button>
                  <button onClick={() => setEditingField(null)}>Cancelar</button>
                </div>
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

      {/* bloque para eliminar la cuenta */}
      <div className="delete-account-box">
        <button
          className="delete-account-btn"
          onClick={() => setShowDeleteConfirm(true)}
        >
          Eliminar cuenta
        </button>

        {showDeleteConfirm && (
          <ConfirmDialog
            title="Eliminar cuenta"
            message="⚠️ ¿Seguro que quiere eliminar su cuenta? No podrá acceder nunca más a ella."
            confirmText="Eliminar"
            cancelText="Cancelar"
            onConfirm={handleDeleteAccount}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
