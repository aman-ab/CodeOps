
## Review questions — short answers
1. **Context** removes prop drilling. Cost: every consumer re-renders when the value changes.
2. The state lives in the component that owns it (`useState`/`useReducer` in the provider). Context only carries it — so the provider decides when things change.
3. A reducer is pure: same state + action → same result, no mutation, no fetching, no side effects. So you can test it with plain objects and no React.
4. (a) Several values that change together. (b) The next value depends on the previous one (or logic is scattered across handlers).
5. React compares props by reference. A new function each render makes `React.memo` see a changed prop, so it never skips. `useCallback` keeps the reference stable — but with no `memo` on the child, there is nothing to skip.
6. No. A custom hook shares logic, not data: each call has its own `useState`. To share data, call the hook once in a provider and distribute it with context.
