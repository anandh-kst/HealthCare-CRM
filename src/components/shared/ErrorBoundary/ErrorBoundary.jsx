import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-center flex-col gap-4 min-h-[400px] text-center p-8">
          <div className="w-16 h-16 rounded-full bg-danger/10 flex-center text-danger text-2xl">!</div>
          <h2 className="text-heading-lg text-text-primary">Something went wrong</h2>
          <p className="text-body-sm text-text-muted max-w-sm">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-primary text-white rounded-lg text-body-sm hover:bg-primary-dark transition-base"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
