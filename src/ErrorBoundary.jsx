import React, { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can log the error to an error reporting service
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div>
					<h6>Oops, something went wrong.</h6>
					<link href="#" onClick={() => window.location.reload()}>
						Please refresh and try again
					</link>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
