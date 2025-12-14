import "../styles/confirmDialog.css";

export default function ConfirmDialog({
  title = "Confirmación",
  message,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel
}) {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">

        <h3 className="confirm-title">{title}</h3>

        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>

          <button className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>
        </div>

      </div>
    </div>
  );
}
