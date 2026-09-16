import { Component } from "react";

/**
 * Error boundaries can only be class components (there's no hook
 * equivalent) -- this is one of the few places React still needs one.
 * It catches render errors anywhere below it in the tree and shows a
 * fallback UI instead of a blank crashed page.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>That page hit an unexpected error.</p>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
