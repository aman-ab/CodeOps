import { useState } from "react";
import Exercise1_OneState from "./exercises/Exercise1_OneState";
import Exercise2_InputTypes from "./exercises/Exercise2_InputTypes";
import Exercise3_Validate from "./exercises/Exercise3_Validate";
import Exercise4_Touched from "./exercises/Exercise4_Touched";
import Exercise5_Accessible from "./exercises/Exercise5_Accessible";
import Exercise6_Submitting from "./exercises/Exercise6_Submitting";
import Exercise7_Failure from "./exercises/Exercise7_Failure";
import Homework_ReactHookForm from "./exercises/Homework_ReactHookForm";

// One exercise at a time: every form uses the same field ids (name, phone, …),
// so showing them together would put duplicate ids on the page.
const EXERCISES = [
  ["1", Exercise1_OneState],
  ["2", Exercise2_InputTypes],
  ["3", Exercise3_Validate],
  ["4", Exercise4_Touched],
  ["5", Exercise5_Accessible],
  ["6", Exercise6_Submitting],
  ["7", Exercise7_Failure],
  ["Homework", Homework_ReactHookForm],
];

function App() {
  const [current, setCurrent] = useState("1");
  const Current = EXERCISES.find(([label]) => label === current)[1];

  return (
    <div>
      <h1>Day 33 · Forms &amp; Controlled Components — Exercises</h1>
      <nav>
        {EXERCISES.map(([label]) => (
          <button
            key={label}
            onClick={() => setCurrent(label)}
            aria-pressed={label === current}
            style={{ fontWeight: label === current ? "bold" : "normal", marginRight: 6 }}
          >
            {label}
          </button>
        ))}
      </nav>
      <hr />
      <Current key={current} />
    </div>
  );
}

export default App;
