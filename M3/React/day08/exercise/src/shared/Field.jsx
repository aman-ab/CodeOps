// One field = real label + control + hint + message, with the aria wiring done once.
//   htmlFor/id        connect the label to the control (and enlarge the tap target)
//   aria-invalid      marks the field as wrong
//   aria-describedby  ties the hint and the message to the control
//   role="alert"      makes a screen reader announce the message
// Colour is never the only signal: the message is in words, with a ⚠ mark,
// and Checkout moves focus to the first invalid field.
function Field({ id, label, hint, error, as: Control = "input", children, ...props }) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div style={{ margin: "14px 0" }}>
      <label htmlFor={id}>{label}</label>{" "}
      <Control
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </Control>
      {hint && <small id={hintId}> {hint}</small>}
      {error && (
        <p id={errorId} role="alert">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;
