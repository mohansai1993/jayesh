function Custom404() {
    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <p className="error-message">Oops! Page not found.</p>
            <a href="/" className="home-link">Go back to Home</a>
        </div>
    );
}

export default Custom404;