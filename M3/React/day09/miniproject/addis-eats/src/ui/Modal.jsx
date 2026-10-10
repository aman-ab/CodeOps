import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

// A modal people can actually use:
//   focus moves in         -> keyboard users start inside it, not behind it
//   focus is trapped       -> Tab / Shift+Tab cycle inside, never into the page beneath
//   Escape closes it       -> and so does a click on the dimmed backdrop
//   focus returns on close -> to the button that opened it (returnFocusRef), else the previous element
//   role="dialog" + label  -> a screen reader announces what opened
//
// createPortal moves the DOM node to #modal-root (index.html), outside any clipping/stacking ancestor.
// It is still a CHILD in the React tree: it reads the same context, and its events bubble to its React
// parent — not to #modal-root. (A click inside the modal also fires onClick handlers on the card that
// rendered it; call e.stopPropagation() inside if that is not what you want.)
// Styles are inline because style.css is not edited.

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  zIndex: 1000,
};

const panelStyle = {
  background: "#fff",
  color: "#222",
  borderRadius: 8,
  padding: 20,
  maxWidth: 420,
  width: "100%",
  textAlign: "center",
};

function Modal({ title, onClose, returnFocusRef, children }) {
  const panelRef = useRef(null);
  const titleId = useId();

  // move focus in on open, and back out on close; stop the page scrolling behind
  useEffect(() => {
    // the element to give focus back to: the button that opened us (it already exists), else whatever had focus
    const returnTarget = returnFocusRef?.current ?? document.activeElement;
    const panel = panelRef.current;
    (panel.querySelector(FOCUSABLE) ?? panel).focus();

    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
      if (returnTarget && document.contains(returnTarget)) returnTarget.focus();
    };
  }, [returnFocusRef]);

  // Escape closes; Tab is trapped inside the panel
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      const focusable = Array.from(panel.querySelectorAll(FOCUSABLE));
      if (focusable.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!panel.contains(active)) {
        e.preventDefault(); // focus escaped somehow: pull it back in
        first.focus();
      } else if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      style={overlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // only a click on the backdrop itself
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={panelStyle}
      >
        <button onClick={onClose} aria-label="Close" style={{ float: "right" }}>
          ✕
        </button>
        <h2 id={titleId}>{title}</h2>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") ?? document.body,
  );
}

export default Modal;
