import NavigationBar from "../components/NavigationBar";

const ErrorPage = () => {
    return (
        <>
            <NavigationBar />
            <div className="container-fluid d-flex flex-column align-items-center">
                <h1>404</h1>
                <h2>Page Not Found</h2>
            </div>
        </>
    );
};

export default ErrorPage;