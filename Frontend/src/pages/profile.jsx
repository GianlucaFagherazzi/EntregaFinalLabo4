import { useParams } from "react-router-dom";
import { getUserById } from "../services/usersServices";
import { useEffect } from "react";

import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { updateUser, deactivateUser, activateUser } from "../services/usersServices";
import ConfirmDialog from "../components/confirmDialog";

import "../styles/profile.css";

export default function Profile() {
  const { user, updateUser: updateUserContext, logout, isAdmin } = useContext(AuthContext);

  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);

  const [editingField, setEditingField] = useState(null);
  const [value, setValue] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActivateConfirm, setShowActivateConfirm] = useState(false);

  useEffect(() => {
    console.log("id:", id);
    console.log("isAdmin:", isAdmin);
    console.log("user:", user);
    console.log("profileUser:", profileUser);
    if (!user) return;

    async function loadUser() {
      try {
        if (id && isAdmin) {
          const userData = await getUserById(id);
          setProfileUser(userData);
        } else {
          setProfileUser(user);
        }
      } catch (error) {
        alert("Error al cargar el usuario");
      }
    }

    loadUser();
  }, [id, user, isAdmin]);

  if (!profileUser) return <p>Cargando...</p>;

  function startEdit(field, currentValue) {
    setEditingField(field);
    setValue(currentValue);
  }

  async function saveEdit() {
    try {
      const updated = await updateUser(profileUser.id, {
        [editingField]: value
      });

      setProfileUser(prev => ({
        ...prev,
        [editingField]: updated.data[editingField]
      }));

      // Solo actualizar contexto si edito MI usuario
      if (!id && editingField !== "password") {
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
      await deactivateUser(profileUser.id);

      alert("Tu cuenta fue desactivada correctamente.");
      if (id) {
        // Si es admin desactivando otra cuenta, lo vuelve a la lista de usuarios
        window.location.href = "/users";
      } else {
        // Si es el usuario desactivando su propia cuenta, se cierra sesión
        logout();
        window.location.href = "/";
      }
    } catch (err) {
      alert("Error al eliminar la cuenta");
    }
  }

  async function handleActivateAccount() {
    try {
      const updatedUser = await activateUser(profileUser.id);
      setProfileUser(updatedUser);
      alert("Cuenta reactivada correctamente");
      window.location.href = "/users";
    } catch (err) {
      alert("Error al reactivar la cuenta");
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
      <h1>{id ? "Perfil del usuario" : "Mi Perfil"}</h1>

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
                <span className="profile-value">{profileUser?.[field.key] ?? "-"}</span>
                <button onClick={() => startEdit(field.key, profileUser[field.key])}>
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
            message="¿Seguro que quiere eliminar su cuenta? Esta acción no se puede deshacer."
            confirmText="Eliminar"
            cancelText="Cancelar"
            onConfirm={handleDeleteAccount}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </div>
      {isAdmin && !profileUser.isActive && (
        <div className="Activate-account-box">
          <button onClick={() => setShowActivateConfirm(true)}>
            Activar cuenta
          </button>
          {showActivateConfirm && (
            <ConfirmDialog
              title="Activar cuenta"
              message="¿Seguro que quiere activar esta cuenta?"
              confirmText="Activar"
              cancelText="Cancelar"
              onConfirm={handleActivateAccount}
              onCancel={() => setShowActivateConfirm(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
