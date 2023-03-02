



export const ErrorPage = () => {
    return (<>
        <main className="d-flex justify-content-center text-center h-75 right-to-left">
            <div className="align-self-center">
                <h2>404</h2>
                <h1>Page not found</h1>
                <p>Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="d-flex justify-content-around">
                    <a href="/" className="text-decoration-none">
                        Go back home
                    </a>
                </div>
            </div>
        </main>
    </>)
}