import Exercise1_GuardedHook from "./exercises/Exercise1_GuardedHook";
import Exercise2_SplitProviders from "./exercises/Exercise2_SplitProviders";
import Exercise3_WhatRerenders from "./exercises/Exercise3_WhatRerenders";
import Exercise4_ZustandStore from "./exercises/Exercise4_ZustandStore";
import Exercise5_Selectors from "./exercises/Exercise5_Selectors";
import Exercise6_Persist from "./exercises/Exercise6_Persist";
import Exercise7_ReduxSlice from "./exercises/Exercise7_ReduxSlice";

function App() {
  return (
    <div>
      <h1>Day 32 · Context API &amp; State Management — Exercises</h1>
      <Exercise1_GuardedHook />
      <hr />
      <Exercise2_SplitProviders />
      <hr />
      <Exercise3_WhatRerenders />
      <hr />
      <Exercise4_ZustandStore />
      <hr />
      <Exercise5_Selectors />
      <hr />
      <Exercise6_Persist />
      <hr />
      <Exercise7_ReduxSlice />
    </div>
  );
}

export default App;
