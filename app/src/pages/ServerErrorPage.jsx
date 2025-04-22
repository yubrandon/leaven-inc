import NavigationBar from "../components/NavigationBar";

const ServerErrorPage = () => {
    return (
        <>
            <NavigationBar />
            <div className="container-fluid d-flex flex-column align-items-center">
                <h1>500</h1>
                <h2>Internal Server Error</h2>
            </div>
        </>
    )
}

export default ServerErrorPage;