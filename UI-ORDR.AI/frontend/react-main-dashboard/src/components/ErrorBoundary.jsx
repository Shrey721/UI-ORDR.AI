import React from 'react'
import Icon from './Icon'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-error/20 p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="error" size={32} className="text-error" />
            </div>
            <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">Something went wrong</h1>
            <p className="text-on-surface-variant font-body text-sm mb-6">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="bg-error/10 rounded-lg p-3 mb-6 text-left">
              <p className="text-error font-body text-xs font-mono break-words">{this.state.error?.message}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-body font-medium text-sm hover:shadow-lg transition-all"
              >
                Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="flex-1 px-4 py-2 bg-surface-container text-on-surface rounded-lg font-body font-medium text-sm hover:bg-surface-container-high transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
