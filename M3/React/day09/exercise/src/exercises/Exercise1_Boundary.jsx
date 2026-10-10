import { useState } from "react";
import ErrorBoundary from "../shared/ErrorBoundary";
import { dishes } from "../shared/dishes";

// Exercise 1 — write an ErrorBoundary class that takes a fallback prop, and wrap the menu in it
// (the class is in shared/ErrorBoundary.jsx).

function Menu({ broken }) {
  if (broken) throw new Error("The menu blew up while rendering"); // a RENDER error: caught
  return (
    <ul>
      {dishes.map((d) => (
        <li key={d.id}>
          {d.name} — {d.price} ETB
        </li>
      ))}
    </ul>
  );
}

export default function Exercise1_Boundary() {
  const [broken, setBroken] = useState(false);
  const [handlerMessage, setHandlerMessage] = useState("");

  async function failingRequest() {
    throw new Error("the request failed"); // stands in for a rejected fetch
  }

  return (
    <div>
      <h2>Exercise 1 · an ErrorBoundary around the menu</h2>

      <ErrorBoundary
        name="menu"
        onReset={() => setBroken(false)}
        fallback={({ reset }) => (
          <p role="alert">
            ⚠ The menu is unavailable right now. <button onClick={reset}>Try again</button>
          </p>
        )}
      >
        <Menu broken={broken} />
      </ErrorBoundary>
      <button onClick={() => setBroken(true)}>Break the menu (render error → caught)</button>

      <h3>What a boundary does NOT catch</h3>
      <p>
        <button
          onClick={() => {
            throw new Error("thrown inside an event handler");
          }}
        >
          Throw in a click handler
        </button>{" "}
        <button onClick={() => failingRequest()}>Reject a promise</button>
      </p>
      <p>
        Open the console: both errors are logged, the page is <strong>not</strong> replaced by a fallback —
        handlers and promises are outside the render. They need try/catch:
      </p>
      <button
        onClick={async () => {
          try {
            await failingRequest();
          } catch (e) {
            setHandlerMessage(`Handled: ${e.message}`); // the Day 29 error state
          }
        }}
      >
        Reject a promise, with try/catch
      </button>
      <p role="status">{handlerMessage}</p>
    </div>
  );
}
