// Generic and reusable -- doesn't know about carts or dishes, just shows a
// message and two buttons. That's what earns it a place in ui/.
function Modal({ open, title, children, onConfirm, onCancel, confirmLabel = "Confirm", cancelLabel = "Cancel" }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3>{title}</h3>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className="danger">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
