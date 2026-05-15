import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Parcel manager UI error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[320px] items-center justify-center p-6">
          <div className="max-w-md rounded-3xl border border-surface-container-highest bg-white p-6 text-center shadow-sm">
            <p className="font-headline text-xl font-black text-on-surface">Something went wrong</p>
            <p className="mt-2 text-sm text-on-surface-variant">The page could not render. Try switching tabs or refreshing the app.</p>
            <button
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-on-primary"
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
