// Exercise 7 — the cart as a Redux Toolkit slice, NOT wired in.
// Open src/redux/cartSlice.js next to src/stores/cartStore.js and compare.
// (Nothing from Redux is imported here on purpose: no store, no <Provider>.)

export default function Exercise7_ReduxSlice() {
  return (
    <div>
      <h2>Exercise 7 · Redux Toolkit slice (compare the files)</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Task</th>
            <th>Zustand — stores/cartStore.js</th>
            <th>Redux Toolkit — redux/cartSlice.js</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Define state</td>
            <td>create((set) =&gt; (…))</td>
            <td>createSlice(…)</td>
          </tr>
          <tr>
            <td>Add a dish</td>
            <td>set((s) =&gt; (…new array…))</td>
            <td>state.items.push(action.payload) (Immer)</td>
          </tr>
          <tr>
            <td>Reach a component</td>
            <td>import the store</td>
            <td>configureStore + &lt;Provider&gt;</td>
          </tr>
          <tr>
            <td>Read a value</td>
            <td>useCartStore((s) =&gt; s.items)</td>
            <td>useSelector((s) =&gt; s.cart.items)</td>
          </tr>
          <tr>
            <td>Change it</td>
            <td>addItem(dish)</td>
            <td>dispatch(addItem(dish))</td>
          </tr>
        </tbody>
      </table>
      <p>
        Test the slice without React: <code>npm run test:slice</code>.
      </p>
    </div>
  );
}
