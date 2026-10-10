import { Component } from "react";

// Catches the error a guarded hook throws, so Exercise 1 can show the message
// instead of crashing the whole page.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <p>💥 Caught: {this.state.error.message}</p>;
    }
    return this.props.children;
  }
}
