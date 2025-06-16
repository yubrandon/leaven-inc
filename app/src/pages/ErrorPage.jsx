import NavigationBar from "../components/NavigationBar";

const ErrorPage = () => {
    return (
        <>
            <NavigationBar />
            <div className="container-fluid d-flex flex-column align-items-center">
                <h1>500</h1>
                <h2>Server Error! Try again later.</h2>
            </div>
        </>
    );
};

export default ErrorPage;