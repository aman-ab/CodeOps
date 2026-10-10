import { Component } from "react";
import { logError } from "./logError";

// The one class you still write (there is no hook for this).
//   fallback   an element, OR a function ({ error, reset }) => element, so the fallback can offer "Try again"
//   resetKeys  when any of these change while we are showing the fallback, try the children again
//              (e.g. [location.pathname]: leaving a broken page clears the boundary)
//   onReset    undo whatever caused the error before the children are tried again
//   name       says which seam caught it, in the log
// Remember: boundaries catch RENDER errors only — not event handlers, promises or timers.
// Those need try/catch and the Day 29 error state.
export default class ErrorBoundary extends Component {
  state = { failed: false, error: null };

  static getDerivedStateFromError(error) {
    return { failed: true, error }; // renders the fallback
  }

  componentDidCatch(error, info) {
    logError(error, info, this.props.name); // the side-effect half: report it
  }

  componentDidUpdate(prevProps) {
    const { resetKeys = [] } = this.props;
    const before = prevProps.resetKeys ?? [];
    const changed =
      before.length !== resetKeys.length || before.some((key, i) => !Object.is(key, resetKeys[i]));
    if (this.state.failed && changed) this.reset();
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ failed: false, error: null });
  };

  render() {
    if (!this.state.failed) return this.props.children;
    const { fallback } = this.props;
    return typeof fallback === "function"
      ? fallback({ error: this.state.error, reset: this.reset })
      : fallback;
  }
}
