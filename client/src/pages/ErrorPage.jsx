import NavigationBar from "../components/NavigationBar";

const ErrorPage = () => {
    return (
        <>
            <NavigationBar />
            <div className="container-fluid d-flex justify-content-center">
                <h1>Error 404 Page not Found</h1>
            </div>
        </>
    );
};

export default ErrorPage;