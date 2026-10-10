import { useRef, useState } from "react";
import Modal from "../shared/Modal";

// Exercise 7 — a dish modal with createPortal, closing on Escape and returning focus on exit.
// Left: the SAME modal rendered inline inside a card with overflow:hidden + a transform → clipped.
// Right: through a portal into #modal-root → it escapes. (Modal.jsx also traps Tab and sets role="dialog".)

const cardStyle = {
  border: "1px solid #bbb",
  borderRadius: 8,
  padding: 12,
  height: 110,
  overflow: "hidden", // clips children…
  transform: "translateZ(0)", // …and makes position:fixed relative to the card, not the screen
  marginBottom: 12,
};

function InlineModal({ onClose }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.5)", color: "#fff", padding: 12 }}>
      <p>I am clipped by the card</p>
      <button onClick={onClose}>close</button>
    </div>
  );
}

export default function Exercise7_Portal() {
  const [inlineOpen, setInlineOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [cardClicks, setCardClicks] = useState(0);
  const [stop, setStop] = useState(false);
  const triggerRef = useRef(null);

  return (
    <div>
      <h2>Exercise 7 · a modal through createPortal</h2>

      <div style={cardStyle}>
        <strong>Card A — no portal</strong>
        <br />
        <button onClick={() => setInlineOpen(true)}>Open inline modal</button>
        {inlineOpen && <InlineModal onClose={() => setInlineOpen(false)} />}
      </div>

      {/* the bubbling surprise: a click inside the portalled modal still fires THIS onClick */}
      <div style={cardStyle} onClick={() => setCardClicks((n) => n + 1)}>
        <strong>Card B — with a portal</strong> · card onClick fired {cardClicks}×
        <br />
        <button ref={triggerRef} onClick={(e) => { e.stopPropagation(); setPortalOpen(true); }}>
          Open portal modal
        </button>
        {portalOpen && (
          <Modal title="Doro wot" onClose={() => setPortalOpen(false)} returnFocusRef={triggerRef}>
            <p>Spicy chicken stew with a boiled egg. 152 ETB.</p>
            <label>
              <input type="checkbox" checked={stop} onChange={(e) => setStop(e.target.checked)} /> stop propagation on the button below
            </label>
            <p>
              <button onClick={(e) => stop && e.stopPropagation()}>Click me (watch the card counter)</button>
            </p>
            <p>Try: Tab / Shift+Tab (stays inside), Escape (closes), then see where focus lands.</p>
          </Modal>
        )}
      </div>
    </div>
  );
}
