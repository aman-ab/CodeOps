import Exercise1_BasicRoutes from "./exercises/Exercise1_BasicRoutes";
import Exercise2_LinkNavLink from "./exercises/Exercise2_LinkNavLink";
import Exercise3_Layout from "./exercises/Exercise3_Layout";
import Exercise4_IndexNotFound from "./exercises/Exercise4_IndexNotFound";
import Exercise5_Params from "./exercises/Exercise5_Params";
import Exercise6_SearchParams from "./exercises/Exercise6_SearchParams";
import Exercise7_RequireAuth from "./exercises/Exercise7_RequireAuth";

// Each exercise has its own <MemoryRouter>, so all seven routers live on one page.
function App() {
  return (
    <div>
      <h1>Day 31 · React Router v6 — Exercises</h1>
      <Exercise1_BasicRoutes />
      <hr />
      <Exercise2_LinkNavLink />
      <hr />
      <Exercise3_Layout />
      <hr />
      <Exercise4_IndexNotFound />
      <hr />
      <Exercise5_Params />
      <hr />
      <Exercise6_SearchParams />
      <hr />
      <Exercise7_RequireAuth />
    </div>
  );
}

export default App;
